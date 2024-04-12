import React from "react";
import HotelCentersDataTable from "./_components/HotelCentersDataTable/hotel-centers-data-table";
import axios from "axios";
import { columns } from "./_components/DataTableColumns/data-table-columns";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";

const getData = async (): Promise<HotelCenter[]> => {
  const response = await axios.get(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.DEV_URL
        : process.env.PROD_URL
    }/api/hotel-centers/api/get-all-hotel-centers`
  );

  return response.data.hotelCenters;
};

const Page = async () => {
  const data = await getData();

  return (
    <main className="w-full">
      <section className="flex items-center justify-center w-full max-w-[700px] mx-auto my-10">
        <HotelCentersDataTable columns={columns} data={data} />
      </section>
    </main>
  );
};

export default Page;
