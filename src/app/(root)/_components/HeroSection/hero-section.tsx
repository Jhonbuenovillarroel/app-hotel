import axios from "axios";
import SliderCarousel from "./_components/SliderCarousel/SliderCarousel";
import React from "react";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import { getAllHotelCenters } from "@/db/hotel-center/getAllHotelCenters";

const getData = async () => {
  const hotelCenters = await getAllHotelCenters();
  return hotelCenters as HotelCenter[];
};

const HeroSection = async () => {
  const data = await getData();

  return (
    <section className="w-full h-[450px] relative">
      <SliderCarousel dataSlides={data} />
    </section>
  );
};

export default HeroSection;
