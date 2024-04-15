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
} from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { Room as RoomType } from "@/types/Room/room";
import { Button } from "@/components/ui/button";
import { useShoppingCartStore } from "@/store/shoppingCartStore";

interface Props {
  room: RoomType;
}

const Room = ({ room }: Props) => {
  const shoppingCartStore = useShoppingCartStore((state) => state);
  const [selected, setSelected] = useState(false);
  const [addingRoom, setAddingRoom] = useState(false);

  const roomIsSelected = useCallback(
    (room: RoomType) => {
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
    } else {
      setSelected(false);
    }
  }, [shoppingCartStore.rooms, roomIsSelected, room]);

  return (
    <div className="w-full flex flex-col justify-between gap-12 max-w-[900px]">
      <div
        className={`w-[260px] md:w-[320px] lg:w-[400px] xl:w-[500px] order-1`}
      >
        <Carousel className="rounded-md overflow-hidden">
          <CarouselContent>
            {room.images.map((image) => (
              <CarouselItem key={image.id}>
                <Image
                  className="w-full h-full"
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
                        shoppingCartStore.addRoom(room);
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
        </div>
      </div>
    </div>
  );
};

export default Room;
