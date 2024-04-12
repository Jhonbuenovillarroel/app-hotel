"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import ButtonLoading from "@/components/Loading/ButtonLoading/button-loading";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Debe tener 2 caracteres como mínimo",
  }),
  email: z.string().email(),
  password: z.string().min(10, {
    message: "Debe tener 10 caracteres como mínimo",
  }),
});

const LoginForm = () => {
  const [formLoading, setFormLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setFormLoading(true);
    try {
      const response = await axios.post("/api/auth/register-user", values);

      if (response.data.error) {
        setTimeout(() => {
          setFormLoading(false);
        }, 2100);
        toast.error(response.data.error);
      } else if (response.data.ok) {
        Swal.fire({
          html: `<div>
          <h3 style="font-weight: bold; font-size: 1.6rem; margin-bottom: 14px; color: rgb(220, 220, 220);">Activa tu cuenta</h3>
          <div>
            <p style="font-size: 1rem; line-height: 1.6rem; color: rgb(220, 220, 220);">
              Te acabamos de enviar un correo electrónico con un enlace para
              verificar tu email y activar tu cuenta por favor, revisa tu
              bandeja de entrada, si no encuentras en la sección principal,
              también puedes revisar en spam
            </p>
          </div>
        </div>`,
          confirmButtonColor: "#bd9b57",
          background: "#101010",
        }).then((result) => {
          router.push("/login");
        });
      }
    } catch (error) {
      setTimeout(() => {
        setFormLoading(false);
      }, 2100);
      toast.error("Error interno del servidor, vuelve a intentarlo");
    }
  };

  return (
    <div className="flex pt-10 pb-10 items-center justify-center min-h-screen">
      <Form {...form}>
        <div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3 w-[288px] border rounded-md border-zinc-800 px-7 py-10"
          >
            <Image
              priority
              src={`/images/logo_hospedaje.png`}
              alt="logo hospedaje"
              width={300}
              height={150}
              className="w-32 mx-auto"
            />
            <h2 className="font-medium text-xl text-center mb-3">Registrate</h2>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuario</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="ej. johndoe" {...field} />
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
                      placeholder="ej. johndoe@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="************"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col mt-2">
              {formLoading ? (
                <>
                  <ButtonLoading />
                </>
              ) : (
                <>
                  <Button type="submit">Registrarse</Button>
                </>
              )}
            </div>
          </form>

          <div className="mt-4 flex flex-col items-center gap-4">
            <p className="text-sm">
              <span className="mr-1">Ya tienes una cuenta?</span>{" "}
              <Link
                href={`/login`}
                className="text-gold-hr border-b border-transparent hover:border-gold-hr pb-0.5 transition-all duration-200"
              >
                Inicia Sesión
              </Link>
            </p>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
