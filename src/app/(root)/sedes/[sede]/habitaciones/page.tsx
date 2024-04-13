import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import axios from "axios";
import React from "react";
import Room from "./_components/Room/room";
import { getHotelCenterByUrlSegment } from "@/db/hotel-center/get-by-url-segment";

const getData = async (urlSegment: string) => {
  const hotelCenter = await getHotelCenterByUrlSegment(urlSegment);
  return hotelCenter as HotelCenter;
};

const Page = async ({ params }: { params: { sede: string } }) => {
  const data = await getData(params.sede);

  return (
    <main>
      <section className="flex flex-col gap-16 py-20 justify-center items-center">
        {data.rooms.length &&
          data.rooms.map((room, i) => (
            <Room
              key={room.id}
              hotelCenterId={data.id}
              room={room}
              orderChildren={i % 2 === 0 ? ["2", "1"] : ["1", "2"]}
            />
          ))}
      </section>
    </main>
  );
};

export default Page;
