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
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ButtonLoading from "@/components/Loading/ButtonLoading/button-loading";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(10, {
    message: "Debe tener 10 caracteres como mínimo",
  }),
});

const LoginForm = () => {
  const router = useRouter();
  const [formLoading, setFormLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setFormLoading(true);
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (response) {
        if (response.ok) {
          toast.success("Inicio de sesión exitoso");
          setTimeout(() => {
            setFormLoading(false);
            router.push("/");
          }, 2100);
        } else {
          toast.error(response.error);
          if (response.error === "Cuenta no verificada") {
            setTimeout(() => {
              router.push("/register/verify-email");
            }, 2100);
          }
          setTimeout(() => {
            setFormLoading(false);
          }, 2100);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Error interno del servidor");
      setTimeout(() => {
        setFormLoading(false);
      }, 2100);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
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
            <h2 className="font-medium text-xl text-center mb-3">
              Inicia Sesión
            </h2>
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
                  <Button type="submit">Iniciar Sesión</Button>
                </>
              )}
            </div>
          </form>

          <div className="mt-4 flex flex-col items-center gap-4">
            <Link
              href={`/recuperar-contrasena`}
              className="text-sm border-b border-transparent hover:border-white transition-all duration-200"
            >
              Olvidé mi contraseña
            </Link>
            <p className="text-sm">
              <span className="mr-1">Aún no tienes una cuenta?</span>{" "}
              <Link
                href={`/register`}
                className="text-gold-hr border-b border-transparent hover:border-gold-hr pb-0.5 transition-all duration-200"
              >
                Registrate
              </Link>
            </p>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
