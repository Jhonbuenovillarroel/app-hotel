import axios from "axios";
import SliderCarousel from "./_components/SliderCarousel/SliderCarousel";
import React from "react";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";

const getData = async () => {
  const response = await axios.get(
    process.env.NODE_ENV === "development"
      ? `${process.env.DEV_URL}/api/hotel-centers/api/get-all-hotel-centers`
      : `${process.env.PROD_URL}/api/hotel-centers/api/get-all-hotel-centers`
  );

  const hotelCenters = response.data.hotelCenters as HotelCenter[];

  return hotelCenters;
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
