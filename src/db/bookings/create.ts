import prisma from "@/lib/prisma";
import { Room } from "@/types/Room/room";

export const createBooking = async ({
  userId,
  checkIn,
  checkOut,
  room,
  creationMode,
}: {
  userId: string;
  checkIn: Date;
  checkOut: Date;
  room: Room;
  creationMode: "paid" | "manual";
}) => {
  const booking = await prisma.booking.create({
    data: {
      userId,
      checkIn,
      checkOut,
      roomId: room.id,
      creationMode: creationMode ? creationMode : "manual",
    },
  });

  return booking;
};
