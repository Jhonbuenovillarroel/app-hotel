"use client";

import React from "react";
import { useShoppingCartStore } from "@/store/shoppingCartStore";
import ReservationSummaryRoom from "../ReservationSummaryRoom/room";
import { BedDouble } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";

const ReservationSummary = () => {
  const shoppingCartStore = useShoppingCartStore((state) => state);

  return (
    <section className="w-full max-w-[500px] mx-auto p-8 flex flex-col gap-6 pb-20">
      <h3 className="text-lg font-medium">Resumen de reserva(s)</h3>

      <div className="w-full flex flex-col items-center justify-center gap-6">
        {!!shoppingCartStore.rooms.length ? (
          <>
            {shoppingCartStore.rooms.map((room) => (
              <ReservationSummaryRoom
                key={room.room.id}
                room={room.room}
                checkIn={room.checkIn}
                checkOut={room.checkOut}
              />
            ))}
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

      <hr className="bg-zinc-800 h-[1px] border-none" />

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

      <Button variant={"bookingFormButton"} className="mt-2 h-11 flex gap-2">
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
    </section>
  );
};

export default ReservationSummary;
