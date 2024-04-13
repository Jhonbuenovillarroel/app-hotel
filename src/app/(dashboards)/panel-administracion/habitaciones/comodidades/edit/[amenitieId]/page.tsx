import React from "react";
import FormEditAmenitie from "./_components/Form/form";
import axios from "axios";
import { Amenitie } from "@/types/Room/amenitie";

const getAmenitieById = async (amenitieId: string): Promise<Amenitie> => {
  const amenitie = await getAmenitieById(amenitieId);
  return amenitie;
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
