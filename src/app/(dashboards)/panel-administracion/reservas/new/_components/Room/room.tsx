import { Button } from "@/components/ui/button";
import { Room as RoomType } from "@/types/Room/room";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchContext } from "../ContextProvider/context";
import { Check, Trash2 } from "lucide-react";

interface Props {
  room: RoomType;
}

const Room = ({ room }: Props) => {
  const { addRoom, addedRooms, removeRoom } = useSearchContext();
  const [selected, setSelected] = useState(false);

  const roomIsSelected = useCallback(
    (room: RoomType) => {
      for (let addedRoom of addedRooms) {
        if (addedRoom.id === room.id) {
          return true;
        }
      }
      return false;
    },
    [addedRooms, setSelected]
  );

  useEffect(() => {
    if (roomIsSelected(room)) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [roomIsSelected, setSelected]);

  return (
    <div className="flex w-full  max-w-[360px] flex-col gap-4 items-start py-4 px-5 rounded-md border border-zinc-800">
      <div className="text-sm">
        <p className="text-base">{room.roomtype.name}</p>
        <p className="flex items-center gap-2">
          <span className="font-semibold">N°:</span>{" "}
          <span>{room.roomNumber}</span>
        </p>
        <p className="flex items-center gap-2">
          <span className="font-semibold">Sede:</span>{" "}
          <span>{room.hotelcenter.name}</span>
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {selected ? (
          <>
            <Button
              variant={"selectedButton"}
              className="flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Seleccionada</span>
            </Button>
            <Button
              variant={"bookingFormButton"}
              className="h-12 font-medium w-full max-w-[130px] bg-zinc-800 hover:bg-zinc-700 px-8 flex items-center justify-center gap-2 text-sm rounded-md transition-all duration-300"
              onClick={() => {
                removeRoom(room.id);
              }}
            >
              <p className="text-wrap">Quitar</p>
              <Trash2 className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant={"bookingFormButton"}
              onClick={() => {
                addRoom(room);
              }}
            >
              Seleccionar
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Room;
