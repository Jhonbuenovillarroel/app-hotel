"use client";

import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Room from "../Room/room";
import { Room as RoomType } from "@/types/Room/room";
import { Loader2, Search } from "lucide-react";
import { useSearchContext } from "../ContextProvider/context";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface SearchParams {
  hcId: string;
  "check-in": string;
  "check-out": string;
  adults: string;
  children: string;
}

interface Props {
  searchParams: SearchParams;
}

const AvailableRooms = ({ searchParams }: Props) => {
  const { searching, setSearching } = useSearchContext();
  const [rooms, setRooms] = useState<RoomType[]>([]);

  const getAvailableRooms = useCallback(
    async (searchParams: SearchParams) => {
      setSearching(true);
      if (searchParams.hcId) {
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
            setSearching(false);
            setRooms(data.rooms);
          }
        } catch (error) {
          toast.error("Algo salió mal, vuelve a intentarlo");
        }
      } else {
        setSearching(false);
      }
    },
    [setRooms, setSearching]
  );

  useEffect(() => {
    getAvailableRooms(searchParams);
  }, [getAvailableRooms, searchParams]);

  if (searchParams.hcId) {
    if (searching) {
      return (
        <div className="flex text-sm flex-col w-full justify-center items-center gap-5 order-2 md:order-1">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Buscando Habitaciones...</span>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center gap-5 w-full order-2 md:order-1">
          {rooms.length ? (
            <div className="flex flex-col gap-8 py-4">
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
          ) : (
            <>
              <div className="order-2 md:order-1">
                No se encontró ninguna habitación
              </div>
            </>
          )}
        </div>
      );
    }
  } else {
    return (
      <div className="flex text-sm flex-col w-full justify-center items-center gap-5 order-2 md:order-1">
        <Search className="w-6 h-6 animate-pulse" />
        <span>Realiza una búsqueda...</span>
      </div>
    );
  }
};

export default AvailableRooms;
