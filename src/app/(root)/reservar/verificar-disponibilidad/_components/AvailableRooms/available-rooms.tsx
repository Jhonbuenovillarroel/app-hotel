"use client";

import { Room as RoomType } from "@/types/Room/room";
import React, { useCallback, useEffect, useState } from "react";
import Room from "../Room/room";
import { BedDouble, Loader2, Search } from "lucide-react";
import { useCheckAvailabilityPageContext } from "@/app/(root)/_components/CheckAvailabilityPageProvider/context-provider";
import axios from "axios";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type SearchParams = {
  hcId: string;
  "check-in": string;
  "check-out": string;
  adults: string;
  children: string;
};

interface Props {
  searchParams: SearchParams;
}

const AvailableRooms = ({ searchParams }: Props) => {
  const { searchButtonLoading, setSearchButtonLoading } =
    useCheckAvailabilityPageContext();
  const [rooms, setRooms] = useState<RoomType[]>([]);

  const getAvailableRooms = useCallback(
    async (searchParams: SearchParams) => {
      setSearchButtonLoading(true);
      try {
        const { data } = await axios.post(
          "/api/rooms/api/get-available-rooms",
          {
            hotelCenterId: searchParams.hcId,
            checkIn: new Date(searchParams["check-in"]),
            checkOut: new Date(searchParams["check-out"]),
            adults: searchParams.adults,
            children: searchParams.children,
          }
        );

        if (data.ok) {
          setRooms(data.rooms);
        }
      } catch (error) {
        toast.error("Algo salió mal, intentalo de nuevo");
      }

      setSearchButtonLoading(false);
    },
    [setSearchButtonLoading, setRooms]
  );

  useEffect(() => {
    if (searchParams.hcId) {
      getAvailableRooms(searchParams);
    }
  }, [getAvailableRooms, searchParams]);

  if (searchParams.hcId) {
    if (searchButtonLoading) {
      return (
        <div className="h-60 flex text-sm flex-col gap-3 w-full items-center justify-center order-2 md:order-1">
          <Loader2 className="animate-spin" />
          <p>Buscando Habitaciones...</p>
        </div>
      );
    } else {
      return (
        <>
          {rooms.length ? (
            <>
              <div className="w-full flex flex-col gap-16 px-6 sm:px-12 xl:px-16 order-2 md:order-1">
                <div>
                  <p className="font-medium max-w-[400px] text-center mx-auto lg:text-lg">
                    Se encontraron {rooms.length} habitaciones del{" "}
                    <span className="font-bold dark:font-semibold text-gold-hr-dark dark:text-gold-hr">
                      {format(
                        searchParams["check-in"],
                        "dd 'de' MMMM 'del' yyyy",
                        {
                          locale: es,
                        }
                      )}
                    </span>{" "}
                    al{" "}
                    <span className="font-bold dark:font-semibold text-gold-hr-dark dark:text-gold-hr">
                      {format(
                        searchParams["check-out"],
                        "dd 'de' MMMM 'del' yyyy",
                        { locale: es }
                      )}
                    </span>
                  </p>
                </div>
                {rooms.map((room) => (
                  <Room
                    key={room.id}
                    room={room}
                    checkIn={new Date(searchParams["check-in"])}
                    checkOut={new Date(searchParams["check-out"])}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col mx-auto gap-4 items-center max-w-[240px] text-center w-full justify-start px-6 pt-12 order-2 md:order-1">
                <BedDouble className="w-8 h-8" strokeWidth={1.2} />
                <span className="text-sm">
                  No hay habitaciones disponibles para estas fechas
                </span>
              </div>
            </>
          )}
        </>
      );
    }
  } else {
    return (
      <div className="flex flex-col gap-4 items-center w-full justify-start px-6 pt-12 order-2 md:order-1">
        <Search className="w-6 h-6 animate-pulse" strokeWidth={1.2} />
        <span className="text-sm">Realiza una búsqueda...</span>
      </div>
    );
  }
};

export default AvailableRooms;
