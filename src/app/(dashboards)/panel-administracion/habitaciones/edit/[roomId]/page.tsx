import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import { RoomType } from "@/types/Room/RoomType";
import { Amenitie } from "@/types/Room/amenitie";
import React from "react";
import EditRoomForm from "./_components/Form/form";
import { Room } from "@/types/Room/room";
import { getAllRoomTypes } from "@/db/room-types/getAllRoomTypes";
import { getAllAmenities } from "@/db/amenities/get-all";
import { getAllHotelCenters } from "@/db/hotel-center/getAllHotelCenters";
import { getRoomById as getRoomByIdFromDatabase } from "@/db/rooms/get-by-id";

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

const getRoomById = async (roomId: string): Promise<Room> => {
  const room = await getRoomByIdFromDatabase(roomId);
  return room as Room;
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
