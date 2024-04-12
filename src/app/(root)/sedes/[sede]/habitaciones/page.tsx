import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import axios from "axios";
import React from "react";
import Room from "./_components/Room/room";

const getData = async (urlSegment: string) => {
  const response = await axios.post(
    process.env.NODE_ENV === "development"
      ? `${process.env.DEV_URL}/api/hotel-centers/api/get-hotel-center-by-url-segment`
      : `${process.env.PROD_URL}/api/hotel-centers/api/get-hotel-center-by-url-segment`,
    { urlSegment }
  );

  const hotelCenter = response.data.hotelCenter as HotelCenter;

  return hotelCenter;
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
