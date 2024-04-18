import prisma from "@/lib/prisma";
import { Room } from "@/types/Room/room";

export const createBooking = async ({
  userId,
  checkIn,
  checkOut,
  room,
}: {
  userId: string;
  checkIn: Date;
  checkOut: Date;
  room: Room;
}) => {
  const booking = await prisma.booking.create({
    data: {
      userId,
      checkIn,
      checkOut,
      roomId: room.id,
    },
  });

  return booking;
};
