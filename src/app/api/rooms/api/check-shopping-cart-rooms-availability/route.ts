import { getAllRooms } from "@/db/rooms/getAllRooms";
import { Room } from "@/types/Room/room";
import { roomIsAvailable } from "@/utils/functions";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const rooms = (await req.json()) as {
    room: Room;
    checkIn: string;
    checkOut: string;
  }[];

  for (let room of rooms) {
    if (
      !roomIsAvailable({
        room: room.room,
        checkIn: new Date(room.checkIn),
        checkOut: new Date(room.checkOut),
      })
    ) {
      return NextResponse.json({
        error: `La ${room.room.roomtype} ya no está disponible, puede que la hayas tenido mucho tiempo en el carrito, o simplemente alguien más ya la reservó`,
      });
    }
  }

  return NextResponse.json({ ok: true });
};
