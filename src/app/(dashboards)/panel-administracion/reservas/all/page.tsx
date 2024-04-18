import { getAllBookings } from "@/db/bookings/get-all";
import React from "react";
import BookingsDataTable from "./_components/BookingsDataTable/data-table";
import { columns } from "./_components/DataTableColumns/columns";
import { Booking } from "@/types/Booking/booking";
import { data } from "tailwindcss/defaultTheme";

const getData = async (): Promise<Booking[]> => {
  const bookings = await getAllBookings();
  return bookings as Booking[];
};

const Page = async () => {
  const data = await getData();

  return (
    <main>
      <section>
        <BookingsDataTable columns={columns} data={data} />
      </section>
    </main>
  );
};

export default Page;
