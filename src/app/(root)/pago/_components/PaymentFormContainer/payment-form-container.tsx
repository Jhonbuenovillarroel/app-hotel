import "./payment-form-container.css";
import { getFormToken } from "@/lib/izipay";
import PaymentForm from "../PaymentForm/payment-form";

interface Props {
  amount: number;
  currency: string;
  email: string;
  expiryTime: string;
  cellPhone: string;
}

const getData = async (data: {
  amount: number;
  currency: string;
  email: string;
}): Promise<{ formToken: string; orderId: string }> => {
  const orderId = `HR-${crypto.randomUUID()}`;
  const formToken = (await getFormToken({ ...data, orderId })) as string;
  return { formToken, orderId };
};

const PaymentFormContainer = async ({
  amount,
  currency,
  email,
  expiryTime,
  cellPhone,
}: Props) => {
  const data = await getData({ amount, currency, email });

  return (
    <>
      <PaymentForm
        formToken={data.formToken}
        orderId={data.orderId}
        expiryTime={expiryTime}
        cellPhone={cellPhone}
      />
    </>
  );
};

export default PaymentFormContainer;
