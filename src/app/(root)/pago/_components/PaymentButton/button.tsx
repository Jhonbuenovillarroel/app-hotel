"use client";

import React, { MouseEvent, useState } from "react";
import {
  calculateBookingTotalAmount,
  generateSweetAlertPopup,
} from "@/lib/utils";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useShoppingCartStore } from "@/store/shoppingCartStore";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import styles from "./button.module.css";

const PaymentButton = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const shoppingCartStore = useShoppingCartStore((state) => state);
  const [loadingButton, setLoadingButton] = useState(false);
  const [cellPhone, setCellPhone] = useState<string>();

  return (
    <>
      {loadingButton ? (
        <>
          <Button
            disabled
            variant={"bookingFormButton"}
            className="mt-2 h-11 flex gap-2"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="font-semibold">Cargando...</span>
          </Button>
        </>
      ) : (
        <>
          <PhoneInput
            value={cellPhone}
            onChange={(value) => {
              setCellPhone(value);
            }}
            className={`${styles["phone-input-container"]} focus-within:outline-2 focus-within:outline-zinc-800 dark:border-zinc-800 dark:focus-within:outline-2 dark:focus-within:outline-zinc-100`}
            placeholder="ej. 997 706 692"
          />
          <Button
            onClick={async (e: MouseEvent<HTMLButtonElement>) => {
              setLoadingButton(true);

              if (!session) {
                generateSweetAlertPopup({
                  title: "Debes iniciar sesión",
                  subtitle:
                    "No puedes realizar una reserva si no has iniciado sesión",
                  confirmButtonText: "Entiendo",
                });

                setTimeout(() => {
                  setLoadingButton(false);
                }, 1000);
                return;
              }

              if (cellPhone) {
                //@ts-ignore
                window.location.href = `/pago/checkout?amount=${calculateBookingTotalAmount(
                  shoppingCartStore.rooms
                )}&currency=PEN&email=${session.user.email}&expiry_time=${
                  new Date().getTime() + 1000 * 60 * 14
                }&cellPhone=${cellPhone}`;
              } else {
                generateSweetAlertPopup({
                  title: "Campo Vacío",
                  subtitle: "Debes completar el campo con tu número de celular",
                });
              }

              setTimeout(() => {
                setLoadingButton(false);
              }, 1500);
            }}
            variant={"bookingFormButton"}
            className="mt-2 h-11 flex items-center gap-2 justify-center w-full"
          >
            <span>Pagar Ahora</span>
            <span className="font-semibold">
              S/ {calculateBookingTotalAmount(shoppingCartStore.rooms)}
            </span>
          </Button>
        </>
      )}
    </>
  );
};

export default PaymentButton;
