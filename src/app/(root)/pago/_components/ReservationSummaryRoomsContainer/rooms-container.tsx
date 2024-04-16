import React, { useEffect, useState } from "react";
import ReservationSummaryRoom from "../ReservationSummaryRoom/room";
import { useShoppingCartStore } from "@/store/shoppingCartStore";
import { Loader2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const ReservationSummaryRoomsContainer = () => {
  const shoppingCartStore = useShoppingCartStore((state) => state);
  const [showRooms, setShowRooms] = useState(false);

  const getNonExistingIds = async () => {
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
  };

  useEffect(() => {
    getNonExistingIds();
  }, [getNonExistingIds]);

  if (showRooms) {
    return (
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
