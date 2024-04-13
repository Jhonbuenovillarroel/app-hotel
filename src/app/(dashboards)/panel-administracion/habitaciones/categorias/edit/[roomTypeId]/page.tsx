import React from "react";
import EditRoomTypeForm from "./_components/Form/form";
import { RoomType } from "@/types/Room/RoomType";

const getRoomTypeById = async (roomTypeId: string): Promise<RoomType> => {
  const roomType = await getRoomTypeById(roomTypeId);

  return roomType as RoomType;
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
