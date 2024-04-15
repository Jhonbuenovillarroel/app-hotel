import React from "react";
import FormEditService from "./_components/Form/form";
import { Service } from "@/types/Room/service";
import { getServiceById as getServiceByIdDatabase } from "@/db/services/get-by-id";

const getServiceById = async (serviceId: string): Promise<Service> => {
  const service = await getServiceByIdDatabase(serviceId);
  return service as Service;
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
