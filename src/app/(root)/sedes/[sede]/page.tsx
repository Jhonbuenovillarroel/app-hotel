import axios from "axios";
import React, { Suspense } from "react";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import {
  BedDouble,
  CarFront,
  ChevronRight,
  MapPin,
  Phone,
  Wifi,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const getData = async (urlSegment: string) => {
  const response = await axios.post(
    process.env.NODE_ENV === "development"
      ? `${process.env.DEV_URL}/api/hotel-centers/api/get-hotel-center-by-url-segment`
      : `${process.env.PROD_URL}/api/hotel-centers/api/get-hotel-center-by-url-segment`,
    { urlSegment }
  );

  const hotelCenter = response.data.hotelCenter as HotelCenter;

  return hotelCenter;
};

const Page = async ({ params }: { params: { sede: string } }) => {
  const data = await getData(params.sede);

  return (
    <main>
      <section className="py-4">
        <div className="flex justify-between px-10 items-center pt-10">
          <div className="flex flex-col gap-3">
            <p className="text-4xl font-semibold">{data.name}</p>
            <p>{data.description}</p>
            <p className="flex items-center gap-1">
              <MapPin strokeWidth={1.5} className="w-4 h-4" />
              <span>{data.address}</span>
            </p>
          </div>
          <div>
            <Link
              href={`/sedes/${params.sede}/habitaciones`}
              className="w-[280px] h-12 flex items-center justify-center rounded-md gap-2 bg-gold-hr-dark hover:gap-3 hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <BedDouble className="w-4 h-4" />
                <span>Ver Habitaciones</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3 pt-16 pb-10 w-full mx-auto max-w-[600px]">
          <div className="flex flex-col gap-3 justify-center items-center rounded-md py-4 hover:bg-zinc-800 hover:scale-105 transition-all duration-300">
            <Wifi className="w-10 h-10 text-gold-hr" strokeWidth={1.5} />
            <p className="text-base">Wi-Fi</p>
          </div>

          <div className="flex flex-col gap-3 justify-center items-center rounded-md py-4 hover:bg-zinc-800 hover:scale-105 transition-all duration-300">
            <CarFront className="w-10 h-10 text-gold-hr" strokeWidth={1.5} />
            <p className="text-base">
              {data.garage ? "Cochera (Gratis)" : "Sin Cochera"}
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full justify-center items-center rounded-md py-4 hover:bg-zinc-800 hover:scale-105 transition-all duration-300">
            <Phone className="w-10 h-10 text-gold-hr" strokeWidth={1.5} />
            <Accordion type="single" collapsible className="">
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="hover:no-underline flex gap-2 py-1">
                  Contacto
                </AccordionTrigger>
                <AccordionContent className="border-none py-0">
                  <p className="text-sm text-zinc-300">{data.phone}</p>
                  <p className="text-sm text-zinc-300">{data.cellPhone}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <iframe
          src={`${data.mapUrl}`}
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className={`transition-all duration-500 overflow-hidden w-full h-[400px] mt-8`}
        ></iframe>
      </section>
    </main>
  );
};

export default Page;
