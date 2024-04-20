import BookingForm from "@/components/BookingForm/booking-form";
import { getAllHotelCenters } from "@/db/hotel-center/getAllHotelCenters";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import React from "react";

const getData = async (): Promise<HotelCenter[]> => {
  const hotelCenters = await getAllHotelCenters();
  return hotelCenters as HotelCenter[];
};

const Page = async () => {
  const data = await getData();

  return (
    <main className="">
      <section
        style={{
          backgroundImage: `url('/images/hero-images/plaza-jauja-noche.jpg')`,
        }}
        className="relative min-h-[500px] flex items-center justify-center py-12 before:content-[''] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-[rgba(0,0,0,0.75)] before:z-0"
      >
        <div className="relative z-0 bg-zinc-100 dark:bg-zinc-950 pt-7 pb-8 px-6 rounded-md shadow-xl">
          <BookingForm positioning="horizontal" hotelCenters={data} />
        </div>
      </section>
    </main>
  );
};

export default Page;
