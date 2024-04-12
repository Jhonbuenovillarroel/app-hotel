import React from "react";
import FormEditUser from "./_components/Form/form";
import { User } from "@/types/User/user";
import axios from "axios";
import FormEditImage from "./_components/FormEditImage/form";

const getUserById = async (userId: string): Promise<User> => {
  const {
    data: { user },
  } = await axios.post(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.DEV_URL
        : process.env.PROD_URL
    }/api/users/api/get-by-id`,
    { id: userId }
  );

  return user;
};

const Page = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params;
  const user = await getUserById(userId);

  return (
    <main className="w-full min-h-screen">
      <section className="w-full h-full flex flex-col gap-10 items-center justify-center py-10">
        <FormEditImage user={user} />
        <FormEditUser user={user} />
      </section>
    </main>
  );
};

export default Page;
