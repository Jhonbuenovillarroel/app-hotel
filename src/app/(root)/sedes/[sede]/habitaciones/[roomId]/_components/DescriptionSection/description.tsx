"use client";

import { Room } from "@/types/Room/room";
import { Check, BedDouble, Users, Baby, Hotel, CloudSun } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import BookingForm from "../BookingForm/booking-form";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import { useShoppingCartStore } from "@/store/shoppingCartStore";

interface Props {
  room: Room;
}

const DescriptionSection = ({ room }: Props) => {
  const shoppingCartStore = useShoppingCartStore((state) => state);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selected, setSelected] = useState(false);

  const roomIsSelected = useCallback(
    (room: Room) => {
      for (let shoppingCartRoom of shoppingCartStore.rooms) {
        if (shoppingCartRoom.id === room.id) {
          return true;
        }
      }
      return false;
    },
    [shoppingCartStore.rooms]
  );

  useEffect(() => {
    if (roomIsSelected(room)) {
      setSelected(true);
      setShowBookingForm(false);
    } else {
      setSelected(false);
    }
  }, [shoppingCartStore.rooms, roomIsSelected, room]);

  return (
    <>
      <section className=" relative bottom-28">
        <div className="w-[85%] grid grid-cols-9 bg-zinc-900 mx-auto pt-20 pb-20">
          <div className="flex flex-col gap-8 px-12 col-span-6 border-r border-zinc-800">
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-medium">Descripción</h2>
              <p>{room.description}</p>
            </div>

            <div>
              <div className=" flex gap-8 items-start">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Comodidades</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full max-w-[300px]">
                    {room.amenities.map((amenitie) => (
                      <div
                        key={amenitie.id}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-3 h-3" />
                        <span className="text-sm">{amenitie.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full max-w-[280px]">
                  <h3 className="text-lg font-medium">Características</h3>
                  <div className="grid grid-cols-2 text-sm">
                    <div className="flex items-center gap-3">
                      <BedDouble className="w-4 h-4" />
                      <span className="font-semibold">Cama:</span>
                    </div>
                    <span>{room.bedType}</span>
                  </div>
                  <div className="grid grid-cols-2 text-sm">
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4" />
                      <span className="font-semibold">Adultos:</span>
                    </div>
                    <span>{room.adults}</span>
                  </div>
                  <div className="grid grid-cols-2 text-sm">
                    <div className="flex items-center gap-3">
                      <Baby className="w-4 h-4" />
                      <span className="font-semibold">Niños:</span>
                    </div>
                    <span>{room.children}</span>
                  </div>
                  <div className="grid grid-cols-2 text-sm">
                    <div className="flex items-center gap-3">
                      <Hotel className="w-4 h-4" />
                      <span className="font-semibold">Piso:</span>
                    </div>
                    <span>{room.floor}</span>
                  </div>
                  <div className="grid grid-cols-2 text-sm">
                    <div className="flex items-center gap-3">
                      <CloudSun className="w-4 h-4" />
                      <span className="font-semibold">Vista:</span>
                    </div>
                    <span>{room.view}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 flex w-full justify-center">
            <div className="w-[80%] flex flex-col gap-6">
              <div>
                <p className="uppercase text-xs font-semibold tracking-widest">
                  Desde
                </p>
                <p className="text-5xl font-semibold text-center">
                  S/ {room.price}
                </p>
              </div>
              {selected ? (
                <>
                  <Button
                    variant={"selectedButton"}
                    className="flex items-center gap-2 h-12"
                  >
                    <Check className="w-4 h-4" />
                    <span>Agregada a tus reservas</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant={"bookingFormButton"}
                    className="w-full py-3"
                    onClick={() => {
                      if (showBookingForm) {
                        setShowBookingForm(false);
                      } else {
                        setShowBookingForm(true);
                      }
                    }}
                  >
                    Reservar Ahora
                  </Button>
                </>
              )}

              {showBookingForm && (
                <BookingForm positioning="vertical" room={room} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DescriptionSection;
