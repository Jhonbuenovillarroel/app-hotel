import { getBookingsByRoomId } from "@/db/bookings/get-by-room-id";
import { Booking } from "@/types/Booking/booking";
import React from "react";
import BookingsDataTable from "./_components/BookingsDataTable/data-table";
import { columns } from "./_components/BookingsDataTableColumns/columns";

const getData = async (roomId: string): Promise<Booking[]> => {
  const bookings = await getBookingsByRoomId(roomId);
  return bookings as Booking[];
};

const Page = async ({ params }: { params: { roomId: string } }) => {
  const data = await getData(params.roomId);

  return (
    <main>
      <section>
        <BookingsDataTable columns={columns} data={data} />
      </section>
    </main>
  );
};

export default Page;
