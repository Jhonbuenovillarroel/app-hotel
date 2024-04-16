import React from "react";
import FormAddImages from "./_components/Form/form";
import { getRoomById } from "@/db/rooms/get-by-id";
import { Room } from "@/types/Room/room";

const getData = async (roomId: string): Promise<Room> => {
  const room = await getRoomById(roomId);
  return room as Room;
};

const Page = async ({ params }: { params: { roomId: string } }) => {
  const data = await getData(params.roomId);

  return (
    <main className="w-full min-h-screen">
      <section className="w-full h-full">
        <FormAddImages room={data} />
      </section>
    </main>
  );
};

export default Page;
