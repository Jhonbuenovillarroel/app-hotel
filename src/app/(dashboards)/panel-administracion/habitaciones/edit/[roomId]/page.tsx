import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import { RoomType } from "@/types/Room/RoomType";
import { Amenitie } from "@/types/Room/amenitie";
import axios from "axios";
import React from "react";
import EditRoomForm from "./_components/Form/form";
import { Room } from "@/types/Room/room";

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

const getRoomById = async (roomId: string): Promise<Room> => {
  const {
    data: { room },
  } = await axios.post(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.DEV_URL
        : process.env.PROD_URL
    }/api/rooms/api/get-room-by-id`,
    { id: roomId }
  );

  return room;
};

const Page = async ({ params }: { params: { roomId: string } }) => {
  const { roomId } = params;
  const data = await getData();
  const room = await getRoomById(roomId);

  return (
    <main className="w-full">
      <section className="w-full flex items-center justify-center">
        <EditRoomForm
          roomTypes={data.roomTypes}
          amenities={data.amenities}
          hotelCenters={data.hotelCenters}
          room={room}
        />
      </section>
    </main>
  );
};

export default Page;
