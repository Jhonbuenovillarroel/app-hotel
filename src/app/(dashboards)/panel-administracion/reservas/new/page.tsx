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
      <main className="w-full min-h-screen">
        <section className="w-full h-full flex justify-between pb-20 pt-24">
          <AddedRoomsCart />
          <div className="w-full h-full flex flex-col gap-16 md:flex-row md:justify-between">
            <AvailableRooms searchParams={searchParams} />
            <SideBar searchParams={searchParams} />
          </div>
        </section>
      </main>
    </ContextProvider>
  );
};

export default Page;
