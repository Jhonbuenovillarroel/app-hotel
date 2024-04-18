import React from "react";
import AvailableRooms from "./_components/AvailableRooms/available-rooms";
import SideBar from "./_components/SideBar/side-bar";

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
    <main>
      <section className="flex flex-col md:flex-row gap-16 justify-start items-start xl:items-start xl:justify-between py-12">
        <AvailableRooms searchParams={searchParams} />
        <SideBar searchParams={searchParams} />
      </section>
    </main>
  );
};

export default Page;
