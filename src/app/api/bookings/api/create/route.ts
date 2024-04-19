import { createBooking } from "@/db/bookings/create";
import { getAllRooms } from "@/db/rooms/getAllRooms";
import prisma from "@/lib/prisma";
import { Room } from "@/types/Room/room";
import { roomIsAvailable } from "@/utils/functions";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { rooms, userEmail, creationMode } = (await req.json()) as {
      rooms: {
        room: Room;
        checkIn: string;
        checkOut: string;
      }[];
      userEmail: string;
      creationMode: "paid" | "manual";
    };

    const user = await prisma.user.findUnique({ where: { email: userEmail } });

    if (user) {
      for (let room of rooms) {
        await createBooking({
          userId: user?.id,
          checkIn: new Date(room.checkIn),
          checkOut: new Date(room.checkOut),
          room: room.room,
          creationMode,
        });
      }
    } else {
      return NextResponse.json({ error: "El usuario no existe" });
    }

    return NextResponse.json(
      {
        ok: true,
        message:
          "Las reservan se crearon correctamente, gracias por reservar con nosotros, te esperamos",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
