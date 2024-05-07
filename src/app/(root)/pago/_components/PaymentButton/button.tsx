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

const PaymentButton = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const shoppingCartStore = useShoppingCartStore((state) => state);
  const [loadingButton, setLoadingButton] = useState(false);

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

              try {
                const { data } = await axios.post(
                  "/api/rooms/api/check-shopping-cart-rooms-availability",
                  shoppingCartStore.rooms
                );

                if (data.ok) {
                  //@ts-ignore
                  window.location.href = `/pago/checkout?amount=${calculateBookingTotalAmount(
                    shoppingCartStore.rooms
                  )}&currency=PEN&email=${session.user.email}&expiry_time=${
                    new Date().getTime() + 1000 * 60 * 10
                  }`;
                } else if (data.error) {
                  generateSweetAlertPopup({
                    title: "Habitación no Disponible",
                    subtitle: data.error,
                    confirmButtonText: "Entiendo",
                  }).then((result) => {
                    shoppingCartStore.removeRoom(data.room.id);
                  });
                }
              } catch (error) {
                toast.error("Algo salió mal, vuelve a intentarlo");
              }

              setTimeout(() => {
                setLoadingButton(false);
              }, 2100);
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
