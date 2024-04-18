import prisma from "@/lib/prisma";

export const getAllBookings = async () => {
  const bookings = await prisma.booking.findMany({ include: { user: true } });
  return bookings;
};
