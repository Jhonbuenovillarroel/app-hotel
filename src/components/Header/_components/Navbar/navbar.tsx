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
import { ChevronDown } from "lucide-react";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";

interface Props {
  hotelCentersData: HotelCenter[];
}

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export default function Navbar({ hotelCentersData }: Props) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <ChevronDown className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components that you can copy and
                      paste into your apps. Accessible. Customizable. Open
                      Source.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
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
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
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
            "flex flex-col rounded-md gap-1 px-3 py-2 hover:bg-zinc-900 transition-all duration-150",
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
