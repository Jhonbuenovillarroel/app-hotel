import { Room as RoomType } from "@/types/Room/room";
import React from "react";
import Room from "../Room/room";
import { BedDouble } from "lucide-react";
import { getAvailableRooms } from "@/db/rooms/get-available-rooms";

type SearchParams = {
  hcId: string;
  "check-in": Date;
  "check-out": Date;
  adults: string;
  children: string;
};

interface Props {
  searchParams: SearchParams;
}

const getData = async (searchParams: SearchParams): Promise<RoomType[]> => {
  const rooms = await getAvailableRooms({
    hotelCenterId: searchParams.hcId,
    checkIn: new Date(searchParams["check-in"]),
    checkOut: new Date(searchParams["check-out"]),
    adults: searchParams.adults,
    children: searchParams.children,
  });

  return rooms;
};

const AvailableRooms = async ({ searchParams }: Props) => {
  const data = await getData(searchParams);

  return (
    <>
      {!!data.length ? (
        <>
          <div className="w-full flex flex-col gap-16 px-6 sm:px-12 xl:px-16 order-2 md:order-1">
            {data.map((room) => (
              <Room
                key={room.id}
                room={room}
                checkIn={searchParams["check-in"]}
                checkOut={searchParams["check-out"]}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2 items-center w-full justify-start px-6 pt-12 order-2 md:order-1">
            <BedDouble className="w-8 h-8" strokeWidth={1.2} />
            <span>No se encontró ninguna habitacion</span>
          </div>
        </>
      )}
    </>
  );
};

export default AvailableRooms;
