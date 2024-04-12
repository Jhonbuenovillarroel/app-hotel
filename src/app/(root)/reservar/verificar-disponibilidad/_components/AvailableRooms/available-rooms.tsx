import { Room as RoomType } from "@/types/Room/room";
import axios from "axios";
import React from "react";
import Room from "../Room/room";
import { BedDouble } from "lucide-react";

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
  const {
    data: { rooms },
  } = await axios.post(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.DEV_URL
        : process.env.PROD_URL
    }/api/rooms/api/get-available-rooms`,
    {
      hotelCenterId: searchParams.hcId,
      checkIn: new Date(searchParams["check-in"]),
      checkOut: new Date(searchParams["check-out"]),
      adults: searchParams.adults,
      children: searchParams.children,
    }
  );

  return rooms;
};

const AvailableRooms = async ({ searchParams }: Props) => {
  const data = await getData(searchParams);

  return (
    <>
      {data.length ? (
        <>
          <div className="flex flex-col gap-16 px-16">
            {data.map((room) => (
              <Room key={room.id} room={room} />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2 items-center w-full justify-start pt-12">
            <BedDouble className="w-8 h-8" strokeWidth={1.2} />
            <span>No se encontró ninguna habitacion</span>
          </div>
        </>
      )}
    </>
  );
};

export default AvailableRooms;
