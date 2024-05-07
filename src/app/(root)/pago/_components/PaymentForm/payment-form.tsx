"use client";

import { generateSweetAlertPopup } from "@/lib/utils";
import { useShoppingCartStore } from "@/store/shoppingCartStore";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Script from "next/script";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  formToken: string;
  orderId: string;
  expiryTime: string;
}

const PaymentForm = ({ formToken, orderId, expiryTime }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const shoppingCartStore = useShoppingCartStore((state) => state);
  const [creatingBookings, setCreatingBookings] = useState(false);
  const [countdown, setCountdown] = useState<string | null>(null);
  const timerInterval = useRef<any>(null);

  const updateTimer = () => {
    const now = new Date().getTime();
    const distance = parseInt(expiryTime) - now;

    // Calcula días, horas, minutos y segundos restantes
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setCountdown(
      `${minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
      }`
    );

    // if (distance <= 0) {
    //   clearInterval(interval);
    //   router.push("/pago");
    //   router.refresh();
    // }
  };
  // const interval = setInterval(updateTimer, 1000);

  useEffect(() => {
    timerInterval.current = setInterval(updateTimer, 1000);
    const timeLeft = parseInt(expiryTime) - new Date().getTime();
    if (timeLeft <= 0) {
      clearInterval(timerInterval.current);
      router.push("/pago");
      router.refresh();
    }
  }, [countdown]);

  return (
    <>
      <Script
        src="https://static.micuentaweb.pe/static/js/krypton-client/V4.0/stable/kr-payment-form.min.js"
        kr-public-key={`${
          process.env.NODE_ENV === "development"
            ? process.env.NEXT_PUBLIC_IZIPAY_TEST_PUBLIC_KEY
            : process.env.NEXT_PUBLIC_IZIPAY_PROD_PUBLIC_KEY
        }`}
        kr-post-url-success="/api/izipay/api/process-payment"
        // kr-get-url-success="/pago/resultados-de-pago"
        kr-language="es-ES"
        onLoad={async () => {
          //@ts-ignore
          await KR.onError(async (event) => {
            console.log("ocurrió un error durante el proceso");
          });
          //@ts-ignore
          await KR.smartForm.onClick(async (event) => {
            if (session) {
              setCreatingBookings(true);
              try {
                const { data } = await axios.post("/api/bookings/api/create", {
                  rooms: shoppingCartStore.rooms,
                  userEmail: session?.user.email,
                  creationMode: "paid",
                  transactionId: orderId,
                  paymentStatus: "pending",
                });

                setCreatingBookings(false);

                if (data.ok) {
                  shoppingCartStore.setRooms([]);
                  return true;
                } else if (data.error) {
                  return false;
                }
              } catch (error) {
                setCreatingBookings(false);
                generateSweetAlertPopup({
                  icon: "error",
                  title: "Oeración fallida",
                  subtitle: "Ocurrió un error durante el proceso de pago",
                }).then((result) => {
                  router.push("/pago");
                  router.refresh();
                });
                return false;
              }
            }
          });
        }}
      />
      <Script src="https://static.micuentaweb.pe/static/js/krypton-client/V4.0/ext/neon.js" />
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-[320px] flex justify-end py-8">
          <p className="w-full text-end font-normal text-lg">
            {countdown && countdown}
          </p>
        </div>
        <div className="relative w-full max-w-[320px] flex flex-col gap-8 items-center justify-center bg-zinc-100 px-8 py-6 rounded-md">
          {creatingBookings && (
            <div className="absolute z-10 top-0 right-0 left-0 bottom-0 bg-[rgba(40,40,40,0.6)] rounded-md flex items-center justify-center">
              <Loader2 className="w-10 h-10 animate-spin" strokeWidth={1.5} />
            </div>
          )}
          <Image
            src={`/images/logo_hospedaje.png`}
            width={200}
            height={200}
            className="w-32"
            alt="Logo Hospedaje"
          />
          <div className="kr-embedded" kr-form-token={formToken}></div>
        </div>
      </div>
    </>
  );
};

export default PaymentForm;
