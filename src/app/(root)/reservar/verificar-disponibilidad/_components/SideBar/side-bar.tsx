import BookingForm from "@/components/BookingForm/booking-form";
import { getAllHotelCenters } from "@/db/hotel-center/getAllHotelCenters";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import React from "react";

const getData = async (): Promise<HotelCenter[]> => {
  const hotelCenters = await getAllHotelCenters();
  return hotelCenters as HotelCenter[];
};

interface Props {
  searchParams: {
    hcId: string;
    "check-in": string;
    "check-out": string;
    adults: string;
    children: string;
  };
}

const SideBar = async ({ searchParams }: Props) => {
  const data = await getData();
  return (
    <div className="w-full md:max-w-[280px] lg:max-w-[400px] md:shrink-0 md:border-l md:border-zinc-300 md:dark:border-zinc-800 px-12 flex justify-center  md:sticky md:top-24 h-auto order-1 md:order-2">
      <BookingForm
        positioning="vertical"
        className=""
        hotelCenters={data}
        defaultValues={{
          hotelCenterId: searchParams.hcId,
          date: {
            from: new Date(searchParams["check-in"]),
            to: new Date(searchParams["check-out"]),
          },
          adults: searchParams.adults,
          children: searchParams.children,
        }}
      />
    </div>
  );
};

export default SideBar;
