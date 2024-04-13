import React from "react";
import AmenitiesDataTable from "./_components/AmenitiesDataTable/data-table";
import axios from "axios";
import { Amenitie } from "@/types/Room/amenitie";
import { columns } from "./_components/DataTableColumns/columns";
import { getAllAmenities } from "@/db/amenities/get-all";

const getData = async (): Promise<Amenitie[]> => {
  const amenities = await getAllAmenities();
  return amenities as Amenitie[];
};

const Page = async () => {
  const amenities = await getData();

  return (
    <main className="w-full min-h-screen">
      <section className="flex items-center justify-center w-full">
        <AmenitiesDataTable columns={columns} data={amenities} />
      </section>
    </main>
  );
};

export default Page;
