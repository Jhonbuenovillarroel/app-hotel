import React from "react";
import RoomsDataTable from "./_components/RoomsDataTable/data-table";
import axios from "axios";
import { Room } from "@/types/Room/room";
import { columns } from "./_components/DataTableColumns/columns";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";

const getData = async (): Promise<{
  rooms: Room[];
  hotelCenters: HotelCenter[];
}> => {
  const {
    data: { rooms },
  } = await axios.get(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.DEV_URL
        : process.env.PROD_URL
    }/api/rooms/api/get-all`
  );
  const {
    data: { hotelCenters },
  } = await axios.get(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.DEV_URL
        : process.env.PROD_URL
    }/api/hotel-centers/api/get-all-hotel-centers`
  );

  return {
    rooms,
    hotelCenters,
  };
};

const Page = async () => {
  const data = await getData();

  return (
    <main className="w-full min-h-screen">
      <section className="w-full">
        <RoomsDataTable
          columns={columns}
          data={data.rooms}
          hotelCenters={data.hotelCenters}
        />
      </section>
    </main>
  );
};

export default Page;
