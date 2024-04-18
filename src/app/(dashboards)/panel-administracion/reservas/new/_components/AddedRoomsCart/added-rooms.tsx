"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BedDouble } from "lucide-react";
import React from "react";
import { useSearchContext } from "../ContextProvider/context";

const AddedRoomsCart = () => {
  const { addedRooms } = useSearchContext();

  return (
    <Sheet>
      <SheetTrigger>
        <div className="fixed top-4 right-1/2 translate-x-1/2 w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center">
          {/* <div className="h-16 w-16 absolute top-2.5 right-2.5 left-2.5 bottom-2.5 rounded-full bg-zinc-800 animate-ping"></div> */}
          <div className="relative w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center">
            <BedDouble className="w-7 h-7" strokeWidth={1.5} />
          </div>
          <div className="absolute z-10 -top-1 -right-1 flex items-center justify-center bg-red-400 rounded-full w-6 h-6">
            <span>{addedRooms.length}</span>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="z-[100] border-none">
        <SheetHeader>
          <SheetTitle>Habitaciones Agregadas</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default AddedRoomsCart;
