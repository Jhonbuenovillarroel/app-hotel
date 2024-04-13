import React from "react";
import DataTable from "./_components/DataTableCategories/data-table";
import axios from "axios";
import { RoomType } from "@/types/Room/RoomType";
import { columns } from "./_components/DataTableColumns/columns";
import { getAllRoomTypes } from "@/db/room-types/getAllRoomTypes";

const getData = async (): Promise<RoomType[]> => {
  const roomTypes = await getAllRoomTypes();

  return roomTypes as RoomType[];
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
