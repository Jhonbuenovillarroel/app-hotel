import React from "react";
import ContextProvider from "./_components/ContextProvider/context";
import AvailableRooms from "./_components/AvailableRooms/rooms";
import SideBar from "./_components/SideBar/side-bar";
import AddedRoomsCart from "./_components/AddedRoomsCart/added-rooms";

const Page = ({
  searchParams,
}: {
  searchParams: {
    hcId: string;
    "check-in": string;
    "check-out": string;
    adults: string;
    children: string;
  };
}) => {
  return (
    <ContextProvider>
      <main className="w-full">
        <section className="w-full flex justify-between pt-16">
          <AddedRoomsCart />
          <AvailableRooms searchParams={searchParams} />
          <SideBar searchParams={searchParams} />
        </section>
      </main>
    </ContextProvider>
  );
};

export default Page;
