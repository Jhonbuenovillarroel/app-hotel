import React from "react";
import DataTable from "./_components/DataTableCategories/data-table";
import axios from "axios";
import { RoomType } from "@/types/Room/RoomType";
import { columns } from "./_components/DataTableColumns/columns";

const getData = async (): Promise<RoomType[]> => {
  const response = await axios.get(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.DEV_URL
        : process.env.PROD_URL
    }/api/rooms/room-types/get-all-room-types`
  );

  return response.data.roomTypes;
};

const Page = async () => {
  const data = await getData();

  return (
    <main className="w-full">
      <section className="w-full max-w-[700px] mx-auto flex items-center justify-center my-10">
        <DataTable columns={columns} data={data} />
      </section>
    </main>
  );
};

export default Page;
