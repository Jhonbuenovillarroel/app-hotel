import React from "react";
import FormAddImages from "./_components/Form/form";

const Page = ({ params }: { params: { roomId: string } }) => {
  return (
    <main className="w-full min-h-screen">
      <section className="w-full h-full">
        <FormAddImages roomId={params.roomId} />
      </section>
    </main>
  );
};

export default Page;
