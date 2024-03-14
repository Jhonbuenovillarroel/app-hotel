import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="text-white">
      <ul className="flex items-center gap-5">
        <li className="">
          <Link href={"/"} className="text-sm font-medium">
            Home
          </Link>
        </li>
        <li className="">
          <Link href={"/habitaciones"} className="text-sm font-medium">
            Habitaciones
          </Link>
        </li>
        <li className="">
          <Link href={"/contacto"} className="text-sm font-medium">
            Contacto
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
