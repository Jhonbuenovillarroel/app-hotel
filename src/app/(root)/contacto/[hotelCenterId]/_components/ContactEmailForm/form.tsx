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
import { Loader2, SendHorizonal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import styles from "./form.module.css";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string({ required_error: "Campo Obligatorio" }).min(1, {
    message: "Debe tener por lo menos un caracter",
  }),
  email: z.string().min(1, {
    message: "Campo Obligatorio",
  }),
  cellPhone: z.string().min(1, {
    message: "Campo Obligatorio",
  }),
  message: z.string().min(10, {
    message: "Campo Obligatorio",
  }),
});

const ContactEmailForm = () => {
  const [loadingForm, setLoadingForm] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      cellPhone: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoadingForm(true);
    try {
      const { data } = await axios.post(
        "/api/emails/api/send-contact-email",
        values
      );

      if (data.ok) {
        toast.success(data.message);
        form.reset();
      }
    } catch (error) {
      toast.error("Algo salió mal, vuelve a intentarlo");
    }

    setTimeout(() => {
      setLoadingForm(false);
    }, 1500);
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-[600px] space-y-4"
        >
          <h2 className="text-2xl font-semibold">
            Tienes alguna duda o pregunta?
          </h2>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Electrónico</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="johndoe@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cellPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Celular</FormLabel>
                <FormControl>
                  <PhoneInput
                    className={`${styles["phone-input-container"]} focus-within:outline-2 focus-within:outline-zinc-800 dark:border-zinc-800 dark:focus-within:outline-2 dark:focus-within:outline-zinc-100`}
                    placeholder="ej. 064 (362866)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mensaje</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tu mensaje..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {loadingForm ? (
            <>
              <Button
                disabled
                variant={"bookingFormButton"}
                className="flex items-center gap-2"
              >
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Cargando...</span>
              </Button>
            </>
          ) : (
            <>
              <Button
                type="submit"
                variant={"bookingFormButton"}
                className="flex items-center gap-2"
              >
                <span>Enviar</span>
                <SendHorizonal className="w-4 h-4" />
              </Button>
            </>
          )}
        </form>
      </Form>
    </div>
  );
};

export default ContactEmailForm;
