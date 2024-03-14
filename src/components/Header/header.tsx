import React from "react";
import Image from "next/image";
import Navbar from "./_components/Navbar/navbar";

import Link from "next/link";
import UserProfile from "./_components/UserProfile/user-profile";
import ShoppingCart from "./_components/ShoppingCart/shopping-cart";
import ToggleTheme from "../ToggleTheme/toggle-theme";
import { workSans } from "@/fonts/fonts";

const Header = () => {
  return (
    <header
      className={`fixed z-40 text-white w-full px-6 py-2 flex justify-between items-center ${workSans.className}`}
    >
      <div className="flex items-center gap-4">
        <Image
          // priority
          src={"/images/logo_hospedaje.png"}
          className="w-24"
          width={300}
          height={150}
          alt="Logo Hospedaje"
        />
        <Navbar />
      </div>
      <div className="flex items-center gap-5">
        <Link
          href={"/"}
          className="h-10 text-sm font-normal tracking-wide flex items-center justify-center rounded-md bg-[#bd9b57] hover:bg-[#cbab69] transition-all duration-300 text-white px-6"
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
