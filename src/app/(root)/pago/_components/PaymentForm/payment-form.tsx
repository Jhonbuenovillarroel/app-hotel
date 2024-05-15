"use client";

import { generateSweetAlertPopup } from "@/lib/utils";
import { useShoppingCartStore } from "@/store/shoppingCartStore";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Script from "next/script";
import React, { useEffect, useState } from "react";

interface Props {
  formToken: string;
  orderId: string;
  expiryTime: string;
  cellPhone: string;
}

const PaymentForm = ({ formToken, orderId, expiryTime, cellPhone }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const shoppingCartStore = useShoppingCartStore((state) => state);
  const [creatingBookings, setCreatingBookings] = useState(false);

  useEffect(() => {
    const timeLeft = parseInt(expiryTime) - new Date().getTime();
    if (timeLeft <= 0) {
      router.push("/pago");
      router.refresh();
    }
  }, []);

  return (
    <>
      <Script
        src="https://static.micuentaweb.pe/static/js/krypton-client/V4.0/stable/kr-payment-form.min.js"
        kr-public-key={`${
          process.env.NODE_ENV === "development"
            ? process.env.NEXT_PUBLIC_IZIPAY_TEST_PUBLIC_KEY
            : process.env.NEXT_PUBLIC_IZIPAY_PROD_PUBLIC_KEY
        }`}
        // kr-post-url-success="/api/izipay/api/process-payment"
        kr-get-url-success="/pago/resultados-de-pago"
        onLoad={async () => {
          //@ts-ignore
          KR.onError(async (event) => {
            console.log("ocurrió un error durante el proceso");
          });
          //@ts-ignore
          KR.smartForm.onClick(async (event) => {
            setCreatingBookings(true);
            try {
              const { data } = await axios.post(
                "/api/rooms/api/check-shopping-cart-rooms-availability",
                shoppingCartStore.rooms
              );

              if (data.ok) {
                const { data } = await axios.post("/api/bookings/api/create", {
                  rooms: shoppingCartStore.rooms,
                  creationMode: "paid",
                  transactionId: orderId,
                  paymentStatus: "pending",
                  cellPhone,
                });
                setCreatingBookings(false);
                if (data.ok) {
                  shoppingCartStore.setRooms([]);
                  return true;
                } else if (data.error) {
                  generateSweetAlertPopup({
                    icon: "error",
                    title: data.message,
                    subtitle:
                      "Parece que el usuario con el que quieres realizar la reserva, no existe",
                  });
                  return false;
                }
              } else if (data.error) {
                setCreatingBookings(false);
                generateSweetAlertPopup({
                  title: "Habitación no Disponible",
                  subtitle: data.error,
                  confirmButtonText: "Entiendo",
                }).then((result) => {
                  shoppingCartStore.removeRoom(data.room.id);
                  router.push("/pago");
                  router.refresh();
                });
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
          });
        }}
        kr-language="es-ES"
      />
      <Script src="https://static.micuentaweb.pe/static/js/krypton-client/V4.0/ext/classic.js" />
      <div className="w-full flex flex-col items-center justify-center">
        <div className="relative w-full max-w-[320px] flex flex-col items-center justify-center gap-8 bg-zinc-100 border border-zinc-200 px-8 py-6 rounded-md">
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
