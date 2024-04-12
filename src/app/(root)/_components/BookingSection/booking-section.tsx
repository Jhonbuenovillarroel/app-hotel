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

const BookingSection = async () => {
  const data = await getData();

  return (
    <section>
      <div className="relative bottom-14 z-20 bg-white dark:bg-zinc-950 rounded-md h-full pt-4 pb-6 w-fit mx-auto px-7">
        <BookingForm positioning="horizontal" hotelCenters={data} />
      </div>
    </section>
  );
};

export default BookingSection;
