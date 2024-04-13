import React from "react";
import HeroSection from "./_components/HeroSection/hero-section";
import BookingSection from "./_components/BookingSection/booking-section";
import OfficeSection from "./_components/OfficeSection/office-section";

const Page = () => {
  return (
    <main>
      <HeroSection />
      <BookingSection />
      <OfficeSection />
    </main>
  );
};

export default Page;
