"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ButtonLoading from "@/components/Loading/ButtonLoading/button-loading";
import { RoomType } from "@/types/Room/RoomType";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Campo Obligatorio",
  }),
});

interface Props {
  roomType: RoomType;
}

const EditRoomTypeForm = ({ roomType }: Props) => {
  const router = useRouter();
  const [formLoading, setFormLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: roomType.name || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setFormLoading(true);

    try {
      const { data } = await axios.post("/api/rooms/room-types/edit", {
        ...values,
        id: roomType.id,
      });

      if (data.ok) {
        toast.success(data.message);
        router.refresh();
      } else if (data.error) {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Algo salió mal, vuelve a intentarlo");
    }

    setTimeout(() => {
      form.reset();
      setFormLoading(false);
    }, 2100);
  };

  return (
    <div className="flex items-center justify-center h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-[400px] space-y-4"
        >
          <h2 className="text-xl font-medium">Edita el tipo de habitación</h2>

          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ej. Habitación Matrimonial"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div>
            {formLoading ? (
              <ButtonLoading />
            ) : (
              <>
                <Button>Guardar Cambios</Button>
              </>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditRoomTypeForm;
