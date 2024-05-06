import axios from "axios";

export const getFormToken = async ({
  orderId,
  amount,
  currency,
  email,
}: {
  orderId: string;
  amount: number;
  currency: string;
  email: string;
}) => {
  const url = "https://api.micuentaweb.pe/api-payment/V4/Charge/CreatePayment";

  const { data } = await axios.post(
    url,
    {
      amount: parseInt(`${amount}`.padEnd(`${amount}`.length + 2, "0")),
      currency,
      orderId,
      customer: {
        email,
      },
    },
    {
      headers: {
        Authorization: `Basic ${btoa(
          `${process.env.IZIPAY_USER}:${
            process.env.NODE_ENV === "development"
              ? process.env.IZIPAY_TEST_PASSWORD
              : process.env.IZIPAY_PROD_PASSWORD
          }`
        )}`,
        "Content-Type": "application/json",
      },
    }
  );

  return data.answer.formToken;
};
