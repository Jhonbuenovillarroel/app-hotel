import React from "react";
import DataTableServices from "./_components/DataTableServices/data-table";
import axios from "axios";
import { Service } from "@/types/Room/service";
import { columns } from "./_components/DataTableColumns/columns";

const getData = async (): Promise<Service[]> => {
  const {
    data: { services },
  } = await axios.get(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.DEV_URL
        : process.env.PROD_URL
    }/api/rooms/services/api/get-all`
  );

  return services;
};

const Page = async () => {
  const data = await getData();

  return (
    <main className="w-full min-h-screen">
      <section className="w-full flex items-center justify-center">
        <DataTableServices columns={columns} data={data} />
      </section>
    </main>
  );
};

export default Page;
