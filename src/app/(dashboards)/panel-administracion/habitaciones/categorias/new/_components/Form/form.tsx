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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import ButtonLoading from "@/components/Loading/ButtonLoading/button-loading";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Campo Obligatorio",
  }),
});

const CreateCategoryForm = () => {
  const router = useRouter();

  const [formLoading, setFormLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setFormLoading(true);

    try {
      const response = await axios.post("/api/rooms/room-types/create", values);

      if (response.data.error) {
        toast.error(response.data.error);
      } else if (response.data.ok) {
        toast.success(response.data.message);
        router.refresh();
      }
    } catch (error) {
      toast.error("Error interno del servidor");
    }

    setTimeout(() => {
      form.reset();
      setFormLoading(false);
    }, 2100);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-[400px] space-y-3"
        >
          <h2 className="text-lg font-medium">Crea una nueva Categoría</h2>

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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            {formLoading ? (
              <>
                <ButtonLoading />
              </>
            ) : (
              <>
                <Button type="submit">Crear Categoría</Button>
              </>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateCategoryForm;
