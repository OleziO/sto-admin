import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { supabase } from "../../api";

interface CustomerId {
  params: {
    id: string;
  };
}

interface Customer {
  id: string;
  name: string;
  phone: string;
}

const fetchCustomeData = async (id: string) => {
  const { data } = await supabase.from("customers").select().eq("id", id);

  return data;
};

export async function loadCustomerData({ params }: any) {
  const customer = await fetchCustomeData(params.id);
  return { customer };
}

export const CustomerPage = () => {
  const customerFetchData: any = useLoaderData();
  const customer = customerFetchData.customer[0];

  return <div>{customer.name}</div>;
};
