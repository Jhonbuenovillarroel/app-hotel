import React from "react";
import CreateRoomForm from "./_components/Form/form";
import axios from "axios";
import { RoomType } from "@/types/Room/RoomType";
import { Amenitie } from "@/types/Room/amenitie";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import { getAllRoomTypes } from "@/db/room-types/getAllRoomTypes";
import { getAllAmenities } from "@/db/amenities/get-all";
import { getAllHotelCenters } from "@/db/hotel-center/getAllHotelCenters";

const getData = async (): Promise<{
  roomTypes: RoomType[];
  amenities: Amenitie[];
  hotelCenters: HotelCenter[];
}> => {
  const roomTypes = await getAllRoomTypes();
  const amenities = await getAllAmenities();
  const hotelCenters = await getAllHotelCenters();

  return {
    roomTypes: roomTypes as RoomType[],
    amenities: amenities as Amenitie[],
    hotelCenters: hotelCenters as HotelCenter[],
  };
};

const Page = async () => {
  const data = await getData();

  return (
    <main className="w-full min-h-screen">
      <CreateRoomForm
        roomTypes={data.roomTypes}
        amenities={data.amenities}
        hotelCenters={data.hotelCenters}
      />
    </main>
  );
};

export default Page;
