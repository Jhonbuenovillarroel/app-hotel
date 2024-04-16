"use client";

import React, { MouseEvent, useState } from "react";
import { useShoppingCartStore } from "@/store/shoppingCartStore";
import { BedDouble, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import ReservationSummaryRoomsContainer from "../ReservationSummaryRoomsContainer/rooms-container";

const ReservationSummary = () => {
  const shoppingCartStore = useShoppingCartStore((state) => state);
  const [loadingButton, setLoadingButton] = useState(false);

  return (
    <section className="w-full max-w-[500px] mx-auto p-8 flex flex-col gap-6 pb-20">
      <h3 className="text-lg font-medium">Resumen de reserva(s)</h3>

      <div className="w-full flex flex-col items-center justify-center gap-6">
        {!!shoppingCartStore.rooms.length ? (
          <>
            <ReservationSummaryRoomsContainer />
          </>
        ) : (
          <>
            <div className="w-full h-20 flex flex-col gap-1 items-center justify-center">
              <BedDouble strokeWidth={1.4} />
              <p className="text-sm">Agrega Alguna habitación</p>
            </div>
          </>
        )}
      </div>

      <hr className="bg-zinc-300 dark:bg-zinc-800 h-[1px] border-none" />

      <div>
        <div className="w-full flex justify-between">
          <span>Total:</span>
          <p>
            S/{" "}
            {shoppingCartStore.rooms.reduce(
              (suma, room) =>
                suma +
                room.room.price *
                  (parseInt(format(room.checkOut, "dd", { locale: es })) -
                    parseInt(format(room.checkIn, "dd", { locale: es }))),
              0
            )}
          </p>
        </div>
      </div>

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
        <Button
          onClick={async (e: MouseEvent<HTMLButtonElement>) => {
            setLoadingButton(true);
            try {
              const { data } = await axios.post(
                "/api/rooms/api/check-shopping-cart-rooms-availability",
                shoppingCartStore.rooms
              );

              if (data.ok) {
                toast.success(
                  "Las habitaciones estás disponibles, puedes continuar con el proceso de pago"
                );
              }
            } catch (error) {
              toast.error("Algo salió mal, vuelve a intentarlo");
            }
            setTimeout(() => {
              setLoadingButton(false);
            }, 2100);
          }}
          variant={"bookingFormButton"}
          className="mt-2 h-11 flex gap-2"
        >
          <span>Pagar Ahora</span>
          <span className="font-semibold">
            S/{" "}
            {shoppingCartStore.rooms.reduce(
              (suma, room) =>
                suma +
                room.room.price *
                  (parseInt(format(room.checkOut, "dd", { locale: es })) -
                    parseInt(format(room.checkIn, "dd", { locale: es }))),
              0
            )}
          </span>
        </Button>
      )}
    </section>
  );
};

export default ReservationSummary;
