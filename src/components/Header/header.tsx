import React from "react";
import Image from "next/image";
import Navbar from "./_components/Navbar/navbar";

import Link from "next/link";
import UserProfile from "./_components/UserProfile/user-profile";
import ShoppingCart from "./_components/ShoppingCart/shopping-cart";
import ToggleTheme from "../ToggleTheme/toggle-theme";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import { getAllHotelCenters } from "@/db/hotel-center/getAllHotelCenters";

const getData = async () => {
  const hotelCenters = await getAllHotelCenters();
  return { hotelCenters: hotelCenters as HotelCenter[] };
};

const Header = async () => {
  const data = await getData();

  return (
    <header
      className={`sticky z-[70] top-0 bg-[rgba(250,250,250,1)] dark:bg-[rgba(0,0,0,0.85)] text-black dark:text-white right-0 left-0 w-full px-2 sm:px-6 py-2 flex justify-between items-center`}
    >
      <div className="flex items-center gap-4">
        <Link href={`/`}>
          <Image
            priority
            src={"/images/logo_hospedaje.png"}
            className="w-24"
            width={300}
            height={150}
            alt="Logo Hospedaje"
          />
        </Link>
        <Navbar hotelCentersData={data.hotelCenters} />
      </div>
      <div className="flex items-center gap-5">
        <Link
          href={"/"}
          className="h-10 hidden text-sm font-normal tracking-wide sm:flex sm:items-center sm:justify-center bg-[#bd9b57] hover:bg-[#cbab69] transition-all duration-300 text-white w-36"
        >
          Reservar
        </Link>
        <ShoppingCart />
        <ToggleTheme />
        <UserProfile />
      </div>
    </header>
  );
};

export default Header;
