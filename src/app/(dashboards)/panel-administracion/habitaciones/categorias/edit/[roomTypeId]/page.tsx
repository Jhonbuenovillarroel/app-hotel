import React from "react";
import EditRoomTypeForm from "./_components/Form/form";
import axios from "axios";
import { RoomType } from "@/types/Room/RoomType";

const getRoomTypeById = async (roomTypeId: string): Promise<RoomType> => {
  const response = await axios.post(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.DEV_URL
        : process.env.PROD_URL
    }/api/rooms/room-types/get-by-id`,
    { id: roomTypeId }
  );

  return response.data.roomType;
};

const Page = async ({ params }: { params: { roomTypeId: string } }) => {
  const { roomTypeId } = params;
  const roomType = await getRoomTypeById(roomTypeId);

  return (
    <main className="w-full min-h-screen">
      <section className="w-full h-full">
        <EditRoomTypeForm roomType={roomType} />
      </section>
    </main>
  );
};

export default Page;
