import { Image } from "@/types/Image/image";
import axios from "axios";
import React from "react";
import DataTableImages from "./_components/DataTableImages/data-table";
import { columns } from "./_components/DataTableColumns/columns";
import Link from "next/link";
import { ImagePlus, Images } from "lucide-react";

const getData = async (roomId: string): Promise<Image[]> => {
  const {
    data: { room },
  } = await axios.post(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.DEV_URL
        : process.env.PROD_URL
    }/api/rooms/api/get-all-images`,
    { id: roomId }
  );

  return room.images;
};

const Page = async ({ params }: { params: { roomId: string } }) => {
  const { roomId } = params;
  const data = await getData(roomId);

  return (
    <main className="w-full min-h-screen">
      <section className="w-full flex flex-col gap-8 items-center justify-center my-10">
        <Link
          href={`/panel-administracion/habitaciones/edit/${roomId}/images/new`}
          className="flex gap-2 items-center border border-zinc-800 px-6 h-12 rounded-md hover:bg-zinc-800 transition-all duration-300"
        >
          <ImagePlus className="w-4 h-4" />
          <span className="text-sm">Agregar Imagenes</span>
        </Link>
        <DataTableImages columns={columns} data={data} />
      </section>
    </main>
  );
};

export default Page;
