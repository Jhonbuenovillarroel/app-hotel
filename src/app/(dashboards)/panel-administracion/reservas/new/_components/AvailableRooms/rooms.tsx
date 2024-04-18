"use client";

import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Room from "../Room/room";
import { Room as RoomType } from "@/types/Room/room";
import { Loader2, Search } from "lucide-react";
import { useSearchContext } from "../ContextProvider/context";

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
        <div className="flex text-sm flex-col w-full justify-center items-center gap-5">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Buscando Habitaciones...</span>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center gap-5 w-full">
          {rooms.length ? (
            <>
              {rooms.map((room) => (
                <Room key={room.id} room={room} />
              ))}
            </>
          ) : (
            <>
              <div>No se encontró ninguna habitación</div>
            </>
          )}
        </div>
      );
    }
  } else {
    return (
      <div className="flex text-sm flex-col w-full justify-center items-center gap-5">
        <Search className="w-6 h-6 animate-pulse" />
        <span>Realiza una búsqueda...</span>
      </div>
    );
  }
};

export default AvailableRooms;
