import Script from "next/script";
import React from "react";
import ReservationSummary from "./_components/ReservationSummary/reservation-summary";
import PaymentForm from "./_components/PaymentForm/payment-form";

const Page = () => {
  return (
    <main>
      <ReservationSummary />
      <PaymentForm />
    </main>
  );
};

export default Page;
