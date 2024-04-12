import BookingForm from "@/components/BookingForm/booking-form";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import axios from "axios";
import React from "react";

const getData = async (): Promise<HotelCenter[]> => {
  const {
    data: { hotelCenters },
  } = await axios.get(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.DEV_URL
        : process.env.PROD_URL
    }/api/hotel-centers/api/get-all-hotel-centers`
  );

  return hotelCenters;
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
