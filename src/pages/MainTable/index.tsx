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
      <table
        className={cn("table table-hover table-bordered", styles.mainTable)}
      >
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Ім'я</th>
            <th scope="col">Номер</th>
            <th scope="col">Машини</th>
          </tr>
        </thead>

        <tbody>
          {customers?.map((item, idx) => {
            const customerCars = cars
              ?.filter((car) => car.owner === item.id)
              .map((car) => (
                <p>
                  {car.name} {car.model}
                </p>
              ));
            return (
              <tr key={item.id}>
                <th scope="row">{idx + 1}</th>
                <td>{item.name}</td>
                <td>
                  <a href={`tel:${item.phone}`}>{item.phone} </a>
                </td>
                <td>{customerCars}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
