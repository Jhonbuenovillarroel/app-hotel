import React from "react";
import FormEditAmenitie from "./_components/Form/form";
import { Amenitie } from "@/types/Room/amenitie";
import { getAmenitieById as getAmenitieByIdDatabase } from "@/db/amenities/get-by-id";

const getAmenitieById = async (amenitieId: string): Promise<Amenitie> => {
  const amenitie = await getAmenitieByIdDatabase(amenitieId);
  return amenitie as Amenitie;
};

const Page = async ({ params }: { params: { amenitieId: string } }) => {
  const { amenitieId } = params;
  const amenitie = await getAmenitieById(amenitieId);

  return (
    <main className="w-full min-h-screen">
      <section className="w-full h-full">
        <FormEditAmenitie amenitie={amenitie} />
      </section>
    </main>
  );
};

export default Page;
