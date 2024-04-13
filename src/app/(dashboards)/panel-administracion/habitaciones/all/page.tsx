import React from "react";
import RoomsDataTable from "./_components/RoomsDataTable/data-table";
import { Room } from "@/types/Room/room";
import { columns } from "./_components/DataTableColumns/columns";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import { getAllRooms } from "@/db/rooms/getAllRooms";
import { getAllHotelCenters } from "@/db/hotel-center/getAllHotelCenters";

const getData = async (): Promise<{
  rooms: Room[];
  hotelCenters: HotelCenter[];
}> => {
  const rooms = await getAllRooms();
  const hotelCenters = await getAllHotelCenters();

  return {
    rooms: rooms as Room[],
    hotelCenters: hotelCenters as HotelCenter[],
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
