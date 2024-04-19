"use client";

import React, { MouseEvent, useState } from "react";
import { useShoppingCartStore } from "@/store/shoppingCartStore";
import { AlertCircle, BedDouble, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import ReservationSummaryRoomsContainer from "../ReservationSummaryRoomsContainer/rooms-container";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ReservationSummary = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const shoppingCartStore = useShoppingCartStore((state) => state);
  const [loadingButton, setLoadingButton] = useState(false);

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

                if (!session) {
                  Swal.fire({
                    html: `
          <div class="flex flex-col gap-2 items-center justify-center">
            <h3 class="text-lg font-semibold text-zinc-950 dark:text-zinc-100">
              Debes iniciar sesión
            </h3>
            <p class="text-sm max-w-[280px] text-zinc-900 dark:text-zinc-200">No puedes realizar una reserva si no has iniciado sesión</p>
          </div>
          `,
                    customClass: `text-sm border-none bg-zinc-100 pt-3 dark:bg-red-950 outline-none`,
                    confirmButtonColor: "#bd9b57",
                    confirmButtonText: "Entiendo",
                    buttonsStyling: true,
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
                    const { data } = await axios.post(
                      "/api/bookings/api/create",
                      {
                        rooms: shoppingCartStore.rooms,
                        userEmail: session.user.email,
                        creationMode: "paid",
                      }
                    );

                    if (data.ok) {
                      Swal.fire({
                        icon: "success",
                        html: `
                        <div class="flex flex-col gap-2 items-center justify-center">
                          <h3 class="text-lg font-semibold text-zinc-950 dark:text-zinc-100">
                            Operación exitosa
                          </h3>
                          <p class="text-sm text-zinc-900 dark:text-zinc-200 max">${data.message}</p>
                        </div>
                        `,
                        customClass:
                          "text-sm border-none outline-none bg-zinc-100 dark:bg-zinc-950",
                        confirmButtonColor: "#bd9b57",
                        confirmButtonText: "Perfecto",
                        buttonsStyling: true,
                      }).then((result) => {
                        shoppingCartStore.setRooms([]);
                        router.refresh();
                      });
                    }
                  } else if (data.error) {
                    Swal.fire({
                      html: `
            <div class="flex flex-col gap-2 items-center justify-center">
              <h3 class="text-lg font-semibold text-zinc-100">
                Habitación no Disponible
              </h3>
              <p class="text-sm text-zinc-200">${data.error}</p>
            </div>
            `,
                      customClass:
                        "text-sm border-none outline-none bg-zinc-800",
                      background: "rgb(20, 20, 20)",
                      confirmButtonColor: "#bd9b57",
                      confirmButtonText: "Entiendo",
                      buttonsStyling: true,
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
        </>
      ) : (
        <></>
      )}
    </section>
  );
};

export default ReservationSummary;
