import { createBooking } from "@/db/bookings/create";
import prisma from "@/lib/prisma";
import { Room } from "@/types/Room/room";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { rooms, userEmail, creationMode, transactionId, paymentStatus } =
      (await req.json()) as {
        rooms: {
          room: Room;
          checkIn: string;
          checkOut: string;
        }[];
        userEmail: string;
        creationMode: "paid" | "manual";
        transactionId: string;
        paymentStatus: "paid" | "pending";
      };

    const user = await prisma.user.findUnique({ where: { email: userEmail } });

    if (user) {
      for (let room of rooms) {
        const booking = await createBooking({
          userId: user?.id,
          checkIn: new Date(room.checkIn),
          checkOut: new Date(room.checkOut),
          room: room.room,
          creationMode,
          transactionId,
          paymentStatus,
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
