import { Room } from "@/types/Room/room";
import axios from "axios";
import React from "react";
import HeroSection from "./_components/HeroSection/hero";
import DescriptionSection from "./_components/DescriptionSection/description";
import ImagesSection from "./_components/ImagesSection/section";
import OtherRoomsSection from "./_components/OtherRoomsSection/section";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";

const getData = async (roomId: string): Promise<{ room: Room }> => {
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

  return { room };
};

const Page = async ({ params }: { params: { roomId: string } }) => {
  const data = await getData(params.roomId);

  return (
    <main>
      <HeroSection data={data.room} />
      <DescriptionSection room={data.room} />
      <ImagesSection room={data.room} />
      <OtherRoomsSection room={data.room} />
    </main>
  );
};

export default Page;
