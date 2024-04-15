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
import { getHotelCenterByUrlSegment } from "@/db/hotel-center/get-by-url-segment";

const getData = async (urlSegment: string) => {
  const hotelCenter = await getHotelCenterByUrlSegment(urlSegment);
  return hotelCenter as HotelCenter;
};

const Page = async ({ params }: { params: { sede: string } }) => {
  const data = await getData(params.sede);

  return (
    <main>
      <section className="py-4">
        <div className="flex flex-col gap-7 md:flex-row md:justify-between md:gap-8 px-10 items-center pt-10">
          <div className=" max-w-[600px] flex flex-col gap-3">
            <p className="text-2xl lg:text-3xl xl:text-4xl font-semibold">
              {data.name}
            </p>
            <p className="text-sm lg:text-base">{data.description}</p>
            <p className="flex items-center gap-1">
              <MapPin strokeWidth={1.5} className="w-4 h-4" />
              <span>{data.address}</span>
            </p>
          </div>
          <div>
            <Link
              href={`/sedes/${params.sede}/habitaciones`}
              className="text-sm lg:text-base w-full min-w-[260px] h-12 flex items-center text-white justify-center rounded-md gap-2 bg-gold-hr-dark hover:gap-3 hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <BedDouble className="w-4 h-4" />
                <span>Ver Habitaciones</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-16 pb-10 w-full mx-auto max-w-[600px]">
          <div className="flex flex-col min-w-[180px] gap-3 justify-center items-center rounded-md py-4 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:scale-105 transition-all duration-300">
            <Wifi className="w-10 h-10 text-gold-hr" strokeWidth={1.5} />
            <p className="text-base">Wi-Fi</p>
          </div>

          <div className="flex flex-col min-w-[180px] gap-3 justify-center items-center rounded-md py-4 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:scale-105 transition-all duration-300">
            <CarFront className="w-10 h-10 text-gold-hr" strokeWidth={1.5} />
            <p className="text-base">
              {data.garage ? "Cochera (Gratis)" : "Sin Cochera"}
            </p>
          </div>
          <div className="flex flex-col min-w-[180px] gap-3 justify-center items-center rounded-md py-4 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:scale-105 transition-all duration-300">
            <Phone className="w-10 h-10 text-gold-hr" strokeWidth={1.5} />
            <Accordion type="single" collapsible className="">
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="hover:no-underline flex gap-2 py-1">
                  Contacto
                </AccordionTrigger>
                <AccordionContent className="border-none py-0">
                  <p className="text-sm text-zinc-800 dark:text-zinc-300">
                    {data.phone}
                  </p>
                  <p className="text-sm text-zinc-800 dark:text-zinc-300">
                    {data.cellPhone}
                  </p>
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
