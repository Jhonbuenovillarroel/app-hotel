import BookingForm from "@/components/BookingForm/booking-form";
import { getAllHotelCenters } from "@/db/hotel-center/getAllHotelCenters";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import React from "react";

const getData = async (): Promise<HotelCenter[]> => {
  const hotelCenters = await getAllHotelCenters();
  return hotelCenters as HotelCenter[];
};

const BookingSection = async () => {
  const data = await getData();

  return (
    <section>
      <div className="relative bottom-14 z-[60] bg-white dark:bg-zinc-950 rounded-md h-full pt-4 w-fit mx-auto px-7">
        <BookingForm positioning="horizontal" hotelCenters={data} />
      </div>
    </section>
  );
};

export default BookingSection;
