"use client";

import { useShoppingCartStore } from "@/store/shoppingCartStore";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import ReservationSummaryRoomsContainer from "../ReservationSummaryRoomsContainer/rooms-container";
import { useRouter } from "next/navigation";
import PaymentButton from "../PaymentButton/button";
import { calculateBookingTotalAmount } from "@/lib/utils";

const ReservationSummary = () => {
  const router = useRouter();
  const shoppingCartStore = useShoppingCartStore((state) => state);

  return (
    <section className="w-full max-w-[500px] mx-auto p-8 flex flex-col gap-6 pb-20">
      <h3 className="text-lg font-medium">Resumen de reserva(s)</h3>

      <div className="w-full flex flex-col items-center justify-center gap-6">
        <ReservationSummaryRoomsContainer />
      </div>

      {!!shoppingCartStore.rooms.length ? (
        <>
          <hr className="bg-zinc-300 dark:bg-zinc-800 h-[1px] border-none" />

          <div>
            <div className="w-full flex justify-between">
              <span>Total:</span>
              <p>S/ {calculateBookingTotalAmount(shoppingCartStore.rooms)}</p>
            </div>
          </div>

          <PaymentButton />
        </>
      ) : (
        <></>
      )}
    </section>
  );
};

export default ReservationSummary;
