"use client";

import Script from "next/script";
import React from "react";

const iziConfig = {
  config: {
    transactionId: "{TRANSACTION_ID}",
    action: "pay",
    merchantCode: "{MERCHANT_CODE}",
    order: {
      orderNumber: "{ORDER_NUMBER}",
      currency: "PEN",
      amount: "1.50",
      processType: "AT",
      merchantBuyerId: "{MERCHANT_CODE}",
      dateTimeTransaction: "1670258741603000",
    },
    billing: {
      firstName: "Juan",
      lastName: "Wick Quispe",
      email: "jwickq@izi.com",
      phoneNumber: "958745896",
      street: "Av. Jorge Chávez 275",
      city: "Lima",
      state: "Lima",
      country: "PE",
      postalCode: "15038",
      documentType: "DNI",
      document: "21458796",
    },
  },
};

const Page = () => {
  return (
    <div>
      Page
      <Script
        src="https://sandbox-checkout.izipay.pe/payments/v1/js/index.js"
        onLoad={() => {
          console.log("El script cargó");
        }}
      />
    </div>
  );
};

export default Page;
