import React from "react";
import AvailableRooms from "./_components/AvailableRooms/available-rooms";
import SideBar from "./_components/SideBar/side-bar";

const Page = async ({
  searchParams,
}: {
  searchParams: {
    hcId: string;
    "check-in": Date;
    "check-out": Date;
    adults: string;
    children: string;
  };
}) => {
  return (
    <main>
      <section className="flex justify-between py-12">
        <AvailableRooms searchParams={searchParams} />
        <SideBar searchParams={searchParams} />
      </section>
    </main>
  );
};

export default Page;
