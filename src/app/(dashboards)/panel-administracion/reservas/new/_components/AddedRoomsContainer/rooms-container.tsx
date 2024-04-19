import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import AddedRoom from "../AddedRoomsCart/_components/Room/room";
import { useSearchContext } from "../ContextProvider/context";

const CartAddedRoomsContainer = () => {
  const searchContext = useSearchContext();
  const [showRooms, setShowRooms] = useState(false);

  const getNonExistingIds = useCallback(async () => {
    try {
      const { data } = await axios.post(
        "/api/rooms/api/check-existing-rooms",
        searchContext.addedRooms
      );

      if (data.ok) {
        for (let id of data.ids) {
          searchContext.removeRoom(id);
        }
        setShowRooms(true);
      }
    } catch (error) {
      toast.error("Error interno del servidor");
    }
  }, [searchContext, setShowRooms]);

  useEffect(() => {
    getNonExistingIds();
  }, [getNonExistingIds]);

  if (showRooms) {
    return (
      <div className="flex flex-col gap-3 py-2">
        {searchContext.addedRooms.map((room) => (
          <AddedRoom key={room.room.id} room={room} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center gap-3 text-sm py-12">
        <Loader2 className="animate-spin" />
        <p>Cargando Habitaciones...</p>
      </div>
    );
  }
};

export default CartAddedRoomsContainer;
