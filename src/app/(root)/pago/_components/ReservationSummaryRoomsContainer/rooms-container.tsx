"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useShoppingCartStore } from "@/store/shoppingCartStore";
import { BedDouble, Loader2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import ReservationSummaryRoom from "../ReservationSummaryRoom/room";

const ReservationSummaryRoomsContainer = () => {
  const shoppingCartStore = useShoppingCartStore((state) => state);
  const [showRooms, setShowRooms] = useState(false);

  const getNonExistingIds = useCallback(async () => {
    try {
      const { data } = await axios.post(
        "/api/rooms/api/check-existing-rooms",
        shoppingCartStore.rooms
      );

      if (data.ok) {
        for (let id of data.ids) {
          shoppingCartStore.removeRoom(id);
        }
        setShowRooms(true);
      }
    } catch (error) {
      toast.error("Error interno del servidor");
    }
  }, [shoppingCartStore, setShowRooms]);

  useEffect(() => {
    getNonExistingIds();
  }, [getNonExistingIds]);

  if (showRooms) {
    return (
      <>
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
      </>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center gap-3 text-sm py-12">
        <Loader2 className="animate-spin" />
        <p>Cargando Productos...</p>
      </div>
    );
  }
};

export default ReservationSummaryRoomsContainer;
