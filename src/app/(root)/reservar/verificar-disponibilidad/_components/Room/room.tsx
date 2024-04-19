"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Check,
  BedDouble,
  Users,
  Baby,
  Hotel,
  CloudSun,
  ChevronRight,
  Loader2,
  Trash2,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { Room as RoomType } from "@/types/Room/room";
import { Button } from "@/components/ui/button";
import { useShoppingCartStore } from "@/store/shoppingCartStore";

interface Props {
  room: RoomType;
  checkIn: Date;
  checkOut: Date;
}

const Room = ({ room, checkIn, checkOut }: Props) => {
  const shoppingCartStore = useShoppingCartStore((state) => state);
  const [selected, setSelected] = useState(false);
  const [selectedWithADifferentDate, setSelectedWithADifferentDate] =
    useState(false);
  const [addingRoom, setAddingRoom] = useState(false);

  const roomIsSelected = useCallback(
    (room: RoomType) => {
      if (shoppingCartStore.rooms.length) {
        for (let shoppingCartRoom of shoppingCartStore.rooms) {
          if (shoppingCartRoom.room.id === room.id) {
            return true;
          }
        }
      }
      return false;
    },
    [shoppingCartStore.rooms]
  );

  const roomIsSelectedWithADifferentDate = useCallback(
    (room: RoomType) => {
      if (shoppingCartStore.rooms.length) {
        for (let shoppingCartRoom of shoppingCartStore.rooms) {
          if (shoppingCartRoom.room.id === room.id) {
            if (
              new Date(shoppingCartRoom.checkIn).toLocaleDateString() !==
                new Date(checkIn).toLocaleDateString() ||
              new Date(shoppingCartRoom.checkOut).toLocaleDateString() !==
                new Date(checkOut).toLocaleDateString()
            ) {
              return true;
            }
          }
        }
      }
      return false;
    },
    [shoppingCartStore.rooms, checkIn, checkOut]
  );

  useEffect(() => {
    if (roomIsSelected(room)) {
      setSelected(true);
    } else {
      setSelected(false);
    }

    if (roomIsSelectedWithADifferentDate(room)) {
      setSelectedWithADifferentDate(true);
    } else {
      setSelectedWithADifferentDate(false);
    }
  }, [
    shoppingCartStore.rooms,
    roomIsSelected,
    roomIsSelectedWithADifferentDate,
    room,
  ]);

  return (
    <div className="w-full flex flex-col justify-between gap-12 max-w-[900px]">
      <div
        className={`w-[260px]  md:w-[320px] lg:w-[400px] xl:w-[500px] order-1`}
      >
        <Carousel className="rounded-md overflow-hidden">
          <CarouselContent className="">
            {room.images.map((image) => (
              <CarouselItem key={image.id}>
                <Image
                  className=""
                  src={image.url}
                  width={800}
                  height={800}
                  alt="Foto de la habitación"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="" />
          <CarouselNext className="" />
        </Carousel>
      </div>
      <div className={`w-full order-2`}>
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold">{room.roomtype.name}</h2>
          <div className="">
            <p className="text-sm">Precio</p>
            <p className="text-3xl font-bold">S/ {room.price}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {room.amenities.map((amenitie) => (
              <div key={amenitie.id} className="flex items-center gap-2">
                <Check className="w-3 h-3" />
                <span className="text-sm">{amenitie.name}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 w-full max-w-[280px]">
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

          {selected ? (
            <div className="flex flex-wrap w-full items-center gap-4">
              <Button
                variant={"selectedButton"}
                className="flex items-center w-full max-w-[240px] gap-2 h-12"
              >
                <Check className="w-4 h-4" />
                <p className="w-full text-wrap">Agregada a tus reservas</p>
              </Button>
              <Button
                variant={"bookingFormButton"}
                className="h-12 font-medium w-full max-w-[130px] bg-zinc-800 hover:bg-zinc-700 px-8 flex items-center justify-center gap-2 text-sm rounded-md transition-all duration-300"
                onClick={() => {
                  shoppingCartStore.removeRoom(room.id);
                }}
              >
                <p className="text-wrap">Quitar</p>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <>
              {addingRoom ? (
                <>
                  <>
                    <Button
                      variant={"bookingFormButton"}
                      disabled
                      className="h-12 font-medium px-8 flex items-center justify-center gap-2 text-sm hover:scale-110 rounded-md transition-all duration-300"
                    >
                      <Loader2 className="animate-spin" />
                      <span>Agregando...</span>
                    </Button>
                  </>
                </>
              ) : (
                <>
                  <Button
                    variant={"bookingFormButton"}
                    className="h-12 font-medium px-6 flex items-center justify-center gap-2 text-sm hover:scale-110 rounded-md transition-all duration-300"
                    onClick={() => {
                      setAddingRoom(true);

                      setTimeout(() => {
                        shoppingCartStore.addRoom({ room, checkIn, checkOut });
                        setAddingRoom(false);
                        shoppingCartStore.openShoppingCart(true);
                      }, 1000);
                    }}
                  >
                    <span>Agregar a mis reservas</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </>
              )}
            </>
          )}

          {selectedWithADifferentDate ? (
            <>
              <p className="text-red-500 dark:text-red-400 max-w-[400px] text-sm leading-7">
                <AlertCircle
                  className="w-4 h-4 inline mr-1"
                  strokeWidth={2.4}
                />
                Importante: Parece que seleccionaste una fecha diferente de
                búsqueda, si quieres agregar esta habitación con la nueva fecha,
                quítala y vuélvela a agregar{" "}
              </p>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Room;
