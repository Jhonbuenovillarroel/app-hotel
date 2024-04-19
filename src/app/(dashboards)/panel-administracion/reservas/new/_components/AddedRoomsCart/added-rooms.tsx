"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Ban, BedDouble, Loader2 } from "lucide-react";
import React from "react";
import { useSearchContext } from "../ContextProvider/context";
import Room from "../Room/room";
import AddedRoom from "./_components/Room/room";
import CartAddedRoomsContainer from "../AddedRoomsContainer/rooms-container";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AddedRoomsCart = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { addedRooms, setAddedRooms, showCart, setShowCart } =
    useSearchContext();

  return (
    <Sheet open={showCart} onOpenChange={setShowCart}>
      <SheetTrigger>
        <div className="fixed top-4 right-1/2 translate-x-1/2 w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center">
          <div className="relative text-white w-16 h-16 rounded-full bg-gold-hr-dark flex items-center justify-center">
            <BedDouble className="w-7 h-7" strokeWidth={1.5} />
          </div>
          <div className="absolute text-white z-10 -top-2 -right-2 flex items-center justify-center bg-red-500 rounded-full w-7 h-7">
            <span>{addedRooms.length}</span>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="z-[100] border-none flex flex-col overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Habitaciones Agregadas</SheetTitle>
          <SheetDescription>Resumen de habitaciones agregadas</SheetDescription>
        </SheetHeader>

        <div>
          <div>
            {!!addedRooms.length ? (
              <>
                <CartAddedRoomsContainer />
              </>
            ) : (
              <>
                <div className="text-sm flex flex-col w-full items-center justify-center px-6 gap-1 mt-4">
                  <div className="relative">
                    <div className="absolute -top-1 -right-1">
                      <Ban className="w-3 h-3" />
                    </div>
                    <BedDouble className="w-6 h-6" strokeWidth={1.2} />
                  </div>
                  <p className="text-center max-w-[240px]">
                    Aún no has seleccionado ninguna habitación
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {!!addedRooms.length ? (
          <>
            <SheetFooter>
              <Button
                variant={"bookingFormButton"}
                className="w-full"
                onClick={() => {
                  setShowCart(false);
                  Swal.fire({
                    html: `
                <div class="flex items-center justify-center gap-2 flex-col">
                  <h2 class="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    Quieres continuar?
                  </h2>
                  <p class="text-sm text-zinc-800 dark:text-zinc-200">
                    Las reservas se crearán y podrás verlas en la pestaña de
                    reservas en el menú de navegación a tu izquierda, o
                    ingresando a la sección "Habitaciones &gt; Ver Todas", y
                    en la opción Ver Reservas en las opciones de cada
                    habitación
                  </p>
                </div>
                `,
                    customClass: "text-sm bg-zinc-100 dark:bg-zinc-950 z-[200]",
                    confirmButtonColor: "#bd9b57",
                    showDenyButton: true,
                    denyButtonColor: "rgb(60, 60, 60)",
                    confirmButtonText: "Si, continuar",
                    denyButtonText: "No, cancelar",
                    showLoaderOnConfirm: true,
                    loaderHtml: `<img src="/icons/tail-spin.svg" class="relative z-[100] w-20 h-20 bg-zinc-100 dark:bg-zinc-950" />`,
                    timerProgressBar: true,
                    preConfirm: async () => {
                      try {
                        const { data } = await axios.post(
                          "/api/rooms/api/check-shopping-cart-rooms-availability",
                          addedRooms
                        );

                        if (data.ok) {
                          const { data } = await axios.post(
                            "/api/bookings/api/create",
                            {
                              rooms: addedRooms,
                              userEmail: session?.user.email,
                              creationMode: "manual",
                            }
                          );

                          if (data.ok) {
                            return Swal.fire({
                              icon: "success",
                              html: `
                              <div class="flex items-center justify-center gap-2 flex-col">
                                <h2 class="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                                  Reservas creadas exitosamente
                                </h2>
                                <p class="text-sm text-zinc-800 dark:text-zinc-200">Las reservas se crearon correctamente, ya puedes visualizarlas en la sección de reservas</p>
                              </div>`,
                              customClass:
                                "text-sm bg-zinc-100 dark:bg-zinc-950",
                              confirmButtonColor: "#bd9b57",
                            }).then((result) => {
                              setAddedRooms([]);
                              router.refresh();
                            });
                          } else if (data.error) {
                            Swal.fire({
                              html: `
                            <div class="flex items-center justify-center gap-2 flex-col">
                              <h2 class="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                                Operación fallida
                              </h2>
                              <p class="text-sm text-zinc-800 dark:text-zinc-200">${data.error} </p>
                            </div>`,
                              icon: "error",
                              customClass:
                                "text-sm bg-zinc-100 dark:bg-zinc-950",
                              confirmButtonColor: "#bd9b57",
                            });
                          }
                        } else if (data.error) {
                          Swal.fire({
                            html: `
                          <div class="flex items-center justify-center gap-2 flex-col">
                            <h2 class="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                              Habitación no disponible
                            </h2>
                            <p class="text-sm text-zinc-800 dark:text-zinc-200">${data.error} </p>
                          </div>`,
                            icon: "error",
                            customClass: "text-sm bg-zinc-100 dark:bg-zinc-950",
                            confirmButtonColor: "#bd9b57",
                          });
                        }
                      } catch (error) {
                        Swal.fire({
                          html: `
                        <div class="flex items-center justify-center gap-2 flex-col">
                          <h2 class="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                            Algo salió mal
                          </h2>
                          <p class="text-sm text-zinc-800 dark:text-zinc-200">Ocurrió un error durante el proceso, vuelve a intentarlo </p>
                        </div>`,
                          icon: "error",
                          customClass: "text-sm bg-zinc-100 dark:bg-zinc-950",
                          confirmButtonColor: "#bd9b57",
                        });
                      }
                    },
                  });
                }}
              >
                Crear Reservas
              </Button>
            </SheetFooter>
          </>
        ) : (
          <></>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default AddedRoomsCart;
