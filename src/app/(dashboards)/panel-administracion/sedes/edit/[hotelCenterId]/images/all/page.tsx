import React from "react";
import DataTableImages from "./_components/DataTableImages/data-table";
import axios from "axios";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import { Image } from "@/types/Image/image";
import { columns } from "./_components/DataTableColumns/columns";

const getData = async (hotelCenterId: string): Promise<Image[]> => {
  const {
    data: { hotelCenter },
  } = await axios.post(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.DEV_URL
        : process.env.PROD_URL
    }/api/hotel-centers/api/get-hotel-center-by-id`,
    { id: hotelCenterId }
  );

  return hotelCenter.images;
};

const Page = async ({ params }: { params: { hotelCenterId: string } }) => {
  const { hotelCenterId } = params;
  const data = await getData(hotelCenterId);

  return (
    <main className="w-full min-h-screen">
      <section className="w-full flex items-center justify-center">
        <DataTableImages columns={columns} data={data} />
      </section>
    </main>
  );
};

export default Page;
