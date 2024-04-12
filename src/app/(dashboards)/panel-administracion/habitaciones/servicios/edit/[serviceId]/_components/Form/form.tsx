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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import ButtonLoading from "@/components/Loading/ButtonLoading/button-loading";
import toast from "react-hot-toast";
import axios from "axios";
import { Service } from "@/types/Room/service";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Campo Obligatorio",
  }),
});

interface Props {
  service: Service;
}

const FormEditService = ({ service }: Props) => {
  const router = useRouter();
  const [formLoading, setFormLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: service.name || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    setFormLoading(true);

    try {
      const { data } = await axios.post("/api/rooms/services/api/edit", {
        ...values,
        id: service.id,
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
      setFormLoading(false);
    }, 2100);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-[400px] space-y-3"
        >
          <h2 className="text-lg font-medium">Edita el Servicio</h2>

          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="ej. Tours" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            {formLoading ? (
              <ButtonLoading />
            ) : (
              <Button type="submit">Guardar Cambios</Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormEditService;
