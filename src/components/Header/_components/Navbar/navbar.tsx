"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import styles from "./navbar.module.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

interface Props {
  hotelCentersData: HotelCenter[];
}

export default function Navbar({ hotelCentersData }: Props) {
  const [showMenuPopup, setShowMenuPopup] = React.useState(false);

  return (
    <>
      <div className="flex sm:hidden">
        <div className="cursor-pointer" onClick={() => setShowMenuPopup(true)}>
          <Menu className="w-6 h-6" />
        </div>
        <div
          className={`fixed top-0 right-0 left-0 cursor-pointer w-full bg-white dark:bg-zinc-950 z-[10] overflow-hidden ${
            showMenuPopup ? `h-full opacity-100` : "h-0 opacity-0"
          } flex flex-col items-center justify-center transition-all duration-500`}
        >
          <div className="w-full max-w-[150px]">
            <Image
              priority
              src={"/images/logo_hospedaje.png"}
              className="w-full max-w-[100px] mx-auto mb-4"
              width={300}
              height={150}
              alt="Logo Hospedaje"
            />
            <Link
              href={`/`}
              className="font-medium"
              onClick={() => setShowMenuPopup(false)}
            >
              Home
            </Link>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="w-full hover:no-underline">
                  Sedes
                </AccordionTrigger>
                <AccordionContent className="w-full ">
                  <ul className="grid lg:grid-cols-2 gap-2">
                    {hotelCentersData.map((hotelCenter) => (
                      <Link
                        onClick={() => setShowMenuPopup(false)}
                        key={hotelCenter.name}
                        href={`/sedes/${hotelCenter.urlSegment}`}
                      >
                        {hotelCenter.name}
                      </Link>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div
            className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center"
            onClick={() => {
              setShowMenuPopup(false);
            }}
          >
            <X className="w-5 h-5" />
          </div>
        </div>
      </div>

      <NavigationMenu className="hidden sm:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Sedes</NavigationMenuTrigger>
            <NavigationMenuContent className="">
              <ul className="grid lg:grid-cols-2 gap-2 w-[550px] p-4">
                {hotelCentersData.map((hotelCenter) => (
                  <ListItem
                    key={hotelCenter.name}
                    title={hotelCenter.name}
                    href={`/sedes/${hotelCenter.urlSegment}`}
                  >
                    {hotelCenter.address}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="">
      <Link legacyBehavior passHref ref={ref} {...props}>
        <NavigationMenuLink
          className={cn(
            "flex flex-col rounded-md gap-1 px-5 py-3 hover:bg-zinc-200 dark:hover:bg-zinc-900 transition-all duration-150",
            className
          )}
        >
          <div className="text-sm font-semibold">{title}</div>
          <p className=" text-sm">{children}</p>
        </NavigationMenuLink>
      </Link>
    </li>
  );
});
ListItem.displayName = "ListItem";

[
  {
    id: "clu3dfe0b00033dm6tczpklvr",
    name: "Hospedaje Rinconcito - Centro",
    reference:
      "A 3 cuadras de la plaza de Armas y a 1 cuadra de la Plaza Santa Isabel",
    address: "Jr. Salaverry 861",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3905.8768969085177!2d-75.49992809004995!3d-11.773717536827386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910ecdc493e31339%3A0x6c676d03ac1bd3d9!2sHospedaje%20El%20Rinconcito!5e0!3m2!1sen!2spe!4v1711154774653!5m2!1sen!2spe",
    description:
      "Lugar acogedor para familias y parejas que necesitan relajarse en habitaciones cómodas y a un precio justo",
  },
  {
    id: "clu3k16p000043dm61msk70m7",
    name: "Hospedaje Rinconcito Suburban",
    reference: "A 3 minutos del aeropuerto de Jauja",
    address: "Jr. Victor Balvin 107",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15623.168332654555!2d-75.50416031284182!3d-11.779685100000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910ecd7c331ae749%3A0x4d52f0e5cf8b44b9!2sHospedaje%20El%20Rinconcito%20II!5e0!3m2!1sen!2spe!4v1711165786598!5m2!1sen!2spe",
    description:
      "Lugar acogedor para familias y parejas que necesitan un lugar algo alejado del ruido de la ciudad, en habitaciones cómodas y a un precio justo",
  },
];
