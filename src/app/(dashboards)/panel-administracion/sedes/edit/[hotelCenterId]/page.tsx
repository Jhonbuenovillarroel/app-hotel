import React from "react";
import EditForm from "./_components/Form/form";
import axios from "axios";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";

const getData = async (hotelCenterId: string): Promise<HotelCenter> => {
  const { data } = await axios.post(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.DEV_URL
        : process.env.PROD_URL
    }/api/hotel-centers/api/get-hotel-center-by-id`,
    { id: hotelCenterId }
  );

  return data.hotelCenter;
};

const Page = async ({ params }: { params: { hotelCenterId: string } }) => {
  const { hotelCenterId } = params;

  const data = await getData(hotelCenterId);

  return (
    <main className="w-full min-h-screen">
      <section className="w-full">
        <EditForm hotelCenter={data} />
      </section>
    </main>
  );
};

export default Page;
