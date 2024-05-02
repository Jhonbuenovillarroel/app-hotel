import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export const POST = async (req: NextRequest) => {
  const { orderNumber, transactionId, amount } = await req.json();

  // const options = {
  //   method: "POST",
  //   url: "https://sandbox-api-pw.izipay.pe/gateway/api/v1/proxy-cors/https://sandbox-api-pw.izipay.pe/security/v1/Token/Generate",
  //   headers: {
  //     transactionId: `${transactionId}`,
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //   },
  //   data: {
  //     requestSource: "ECOMMERCE",
  //     merchantCode: process.env.IZIPAY_MERCHANT_CODE,
  //     orderNumber,
  //     publicKey: process.env.IZIPAY_PUBLIC_KEY,
  //     amount,
  //   },
  // };

  const url =
    "https://sandbox-api-pw.izipay.pe/gateway/api/v1/proxy-cors/https://sandbox-api-pw.izipay.pe/security/v1/Token/Generate";
  const options = {
    method: "POST",
    headers: {
      transactionId: "23d3832893283",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      requestSource: "ECOMMERCE",
      merchantCode: "5652640",
      orderNumber: "202211101518",
      publicKey: "testpassword_3oIJsKGgU0giIswruEqJbO9iJoPVcWGVnpkRHNaMo9gkl",
      amount: "200.00",
    }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }

  return NextResponse.json({});
};
