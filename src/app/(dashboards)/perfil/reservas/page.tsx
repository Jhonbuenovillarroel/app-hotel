import { getBookingsByUserId } from "@/db/bookings/get-by-user-id";
import { Booking as BookingType } from "@/types/Booking/booking";
import { UserX } from "lucide-react";
import { getServerSession } from "next-auth";
import React from "react";
import Booking from "./_components/Booking/booking";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

const getData = async (userId: string): Promise<BookingType[]> => {
  const bookings = await getBookingsByUserId(userId);
  return bookings as BookingType[];
};

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    const data = await getData(session.user.id as string);
    return (
      <main className="w-full">
        <section className="w-full min-h-screen flex flex-col gap-4 items-center justify-center pt-10 pb-20 px-6">
          <div className="w-full max-w-[600px] flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-medium">Tus Reservas</h2>
            </div>
            <div className="flex flex-col gap-3">
              {data.map((booking) => (
                <Booking key={booking.id} booking={booking} />
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  } else {
    return (
      <main className="w-full">
        <section className="w-full min-h-screen flex flex-col gap-4 items-center justify-center px-6">
          <UserX strokeWidth={1.5} />
          <p>El usuario no existe</p>
        </section>
      </main>
    );
  }
};

export default Page;
