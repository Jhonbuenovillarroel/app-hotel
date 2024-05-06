import React from "react";
import PaymentFormContainer from "../_components/PaymentFormContainer/payment-form-container";
import { redirect } from "next/navigation";

const Page = ({
  searchParams,
}: {
  searchParams: {
    amount: string;
    currency: string;
    email: string;
    expiry_time: string;
  };
}) => {
  const { amount, currency, email, expiry_time } = searchParams;

  if (!searchParams.amount) {
    redirect("/reservar/verificar-disponibilidad");
  }

  return (
    <main>
      <section className="py-20">
        <PaymentFormContainer
          amount={parseInt(amount)}
          currency={currency}
          email={email}
          expiryTime={expiry_time}
        />
      </section>
    </main>
  );
};

export default Page;
