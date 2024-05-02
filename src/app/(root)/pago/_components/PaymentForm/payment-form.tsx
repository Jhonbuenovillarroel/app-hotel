"use client";

import axios from "axios";
import Script from "next/script";
import React from "react";

const PaymentForm = () => {
  return (
    <div>
      <Script
        onLoad={async () => {
          try {
            const transactionId = crypto.randomUUID();
            const orderNumber = `HR-000000001568`;
            const amount = "20.00";

            const { data } = await axios.post(
              "/api/izipay/api/get-session-token",
              { transactionId, orderNumber, amount }
            );
            console.log(data);
            // @ts-ignore
            // const checkout = new Izipay({ config: iziConfig });

            // const callbackResponsePayment = (response: any) =>
            //   console.log(response);
            // checkout &&
            //   checkout.LoadForm({
            //     authorization: "TU_TOKEN_SESSION",
            //     keyRSA: "KEY_RSA",
            //     callbackResponse: callbackResponsePayment,
            //   });
          } catch ({ Errors, message, date }: any) {
            console.log({ Errors, message, date });
          }
        }}
        src="https://sandbox-checkout.izipay.pe/payments/v1/js/index.js"
      />
    </div>
  );
};

export default PaymentForm;
