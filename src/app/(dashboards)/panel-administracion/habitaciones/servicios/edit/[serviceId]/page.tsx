import React from "react";
import FormEditService from "./_components/Form/form";
import axios from "axios";
import { Service } from "@/types/Room/service";

const getServiceById = async (serviceId: string): Promise<Service> => {
  const {
    data: { service },
  } = await axios.post(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.DEV_URL
        : process.env.PROD_URL
    }/api/rooms/services/api/get-by-id`,
    { id: serviceId }
  );

  return service;
};

const Page = async ({ params }: { params: { serviceId: string } }) => {
  const { serviceId } = params;
  const service = await getServiceById(serviceId);

  return (
    <main className="w-full min-h-screen">
      <section className="w-full h-full">
        <FormEditService service={service} />
      </section>
    </main>
  );
};

export default Page;
