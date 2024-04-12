import React from "react";
import DataTableUsers from "./_components/DataTableUsers/data-table";
import axios from "axios";
import { User } from "@/types/User/user";
import { columns } from "./_components/DataTableColumns/columns";

const getData = async (): Promise<User[]> => {
  const {
    data: { users },
  } = await axios.get(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.DEV_URL
        : process.env.PROD_URL
    }/api/users/api/get-all`
  );

  return users;
};

const Page = async () => {
  const data = await getData();

  return (
    <main className="w-full min-h-screen">
      <section className="w-full flex items-center justify-center">
        <DataTableUsers columns={columns} data={data} />
      </section>
    </main>
  );
};

export default Page;
