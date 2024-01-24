import cn from "classnames";
import React, { useEffect, useState } from "react";
import { supabase } from "../../api";
import styles from "./styles.module.scss";

export const MainTable = () => {
  const [customers, setCustomers] = useState<any[] | null>([]);
  const [cars, setcars] = useState<any[] | null>([]);

  const fetchCustomers = async () => {
    const { data } = await supabase.from("customers").select();

    setCustomers(data);
  };

  const fetchCars = async () => {
    const { data } = await supabase.from("cars").select();

    setcars(data);
  };

  useEffect(() => {
    fetchCustomers();
    fetchCars();
  }, []);

  return (
    <div className={cn("container")}>
      <table className={cn("table table-light table-hover", styles.mainTable)}>
        <thead>
          <tr>
            <th>Ім'я</th>
            <th>Номер</th>
            <th>Машини</th>
          </tr>
        </thead>

        <tbody>
          {customers?.map((item) => {
            const customerCars = cars
              ?.filter((car) => car.owner === item.id)
              .map((car) => `${car.name} ${car.model}`)
              .join(", ");
            return (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{customerCars}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
