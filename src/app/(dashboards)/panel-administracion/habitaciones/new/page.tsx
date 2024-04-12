import React from "react";
import CreateRoomForm from "./_components/Form/form";
import axios from "axios";
import { RoomType } from "@/types/Room/RoomType";
import { Amenitie } from "@/types/Room/amenitie";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";

const getData = async (): Promise<{
  roomTypes: RoomType[];
  amenities: Amenitie[];
  hotelCenters: HotelCenter[];
}> => {
  const {
    data: { roomTypes },
  } = await axios.get(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.DEV_URL
        : process.env.PROD_URL
    }/api/rooms/room-types/get-all-room-types`
  );
  const {
    data: { amenities },
  } = await axios.get(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.DEV_URL
        : process.env.PROD_URL
    }/api/rooms/amenities/get-all-amenities`
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

  return { roomTypes, amenities, hotelCenters };
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
