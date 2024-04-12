import React from "react";
import AmenitiesDataTable from "./_components/AmenitiesDataTable/data-table";
import axios from "axios";
import { Amenitie } from "@/types/Room/amenitie";
import { columns } from "./_components/DataTableColumns/columns";

const getData = async (): Promise<Amenitie[]> => {
  const {
    data: { amenities },
  } = await axios.get(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.DEV_URL
        : process.env.PROD_URL
    }/api/rooms/amenities/get-all-amenities`
  );

  return amenities;
};

const Page = async () => {
  const amenities = await getData();

  return (
    <main className="w-full min-h-screen">
      <section className="flex items-center justify-center w-full">
        <AmenitiesDataTable columns={columns} data={amenities} />
      </section>
    </main>
  );
};

export default Page;
