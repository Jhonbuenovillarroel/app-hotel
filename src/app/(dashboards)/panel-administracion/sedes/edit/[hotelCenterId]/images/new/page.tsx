import React from "react";
import FormAddImages from "./_components/Form/form";

const Page = ({ params }: { params: { hotelCenterId: string } }) => {
  return (
    <main className="w-full min-h-screen">
      <section className="w-full h-full">
        <FormAddImages hotelCenterId={params.hotelCenterId} />
      </section>
    </main>
  );
};

export default Page;
