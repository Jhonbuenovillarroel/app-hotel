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
    "check-in": Date;
    "check-out": Date;
    adults: string;
    children: string;
  };
}

const SideBar = async ({ searchParams }: Props) => {
  const data = await getData();
  return (
    <div className="w-[400px] flex-none border-l border-zinc-800 px-12 sticky top-24 h-full">
      <BookingForm
        positioning="vertical"
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
