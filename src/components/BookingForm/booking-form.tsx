"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import CalendarFormField from "./_components/CalendarFormField/calendar-form-field";
import { Link } from "lucide-react";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import { useRouter } from "next/navigation";
import router from "next/router";

export type FormSchemaType = UseFormReturn<
  {
    hotelCenter: { id: string; name: string };
    date: { from: Date; to: Date };
    adults: string;
    children: string;
  },
  any,
  undefined
>;

const formSchema = z.object({
  hotelCenter: z.object({
    id: z.string().min(1, { message: "Campo Obligatorio" }),
    name: z.string().min(1, { message: "Campo Obligatorio" }),
  }),
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
  adults: z.string().min(1, {
    message: "El número de adultos es requerido",
  }),
  children: z.string().min(1, {
    message: "El número de niños es requerido",
  }),
});

interface Props {
  hotelCenters: HotelCenter[];
  positioning: "horizontal" | "vertical";
  defaultValues?: {
    hotelCenterId: string;
    date: { from: Date; to: Date };
    adults: string;
    children: string;
  };
  className?: string;
}

const BookingForm = ({
  hotelCenters,
  positioning,
  defaultValues,
  className,
}: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hotelCenter: defaultValues?.hotelCenterId
        ? {
            name: hotelCenters.filter(
              (hotelCenter) => hotelCenter.id === defaultValues?.hotelCenterId
            )[0].name,
            id: defaultValues?.hotelCenterId,
          }
        : { id: hotelCenters[0].id, name: hotelCenters[0].name },
      date: defaultValues?.date
        ? defaultValues.date
        : { from: new Date(), to: new Date() },
      adults: defaultValues?.adults ? defaultValues.adults : "1",
      children: defaultValues?.children ? defaultValues.children : "0",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);

    router.push(
      `/reservar/verificar-disponibilidad?hcId=${values.hotelCenter.id}&check-in=${values.date.from}&check-out=${values.date.to}&adults=${values.adults}&children=${values.children}`
    );
  };

  return (
    <div className="h-full flex items-start justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`grid ${
            positioning === "horizontal" ? "grid-cols-5" : "grid-cols-1"
          } max-w-[1200px] w-full ${
            positioning === "horizontal"
              ? "max-w-[1200px] gap-4"
              : "max-w-[320px] gap-2"
          } items-start justify-center ${className}`}
        >
          <FormField
            control={form.control}
            name="hotelCenter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sede</FormLabel>
                <Select
                  defaultValue={hotelCenters[0].name}
                  value={field.value.name}
                  onValueChange={(value) => {
                    for (let hotelCenter of hotelCenters) {
                      if (hotelCenter.name === value) {
                        field.onChange({
                          id: hotelCenter.id,
                          name: hotelCenter.name,
                        });
                      }
                    }
                  }}
                >
                  <FormControl className="">
                    <SelectTrigger className="rounded-none border-t-0 border-r-0 border-l-0 dark:bg-transparent">
                      <SelectValue
                        placeholder="Selecciona una sede"
                        className=""
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {hotelCenters.map((hotelCenter) => (
                      <SelectItem key={hotelCenter.id} value={hotelCenter.name}>
                        {hotelCenter.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <CalendarFormField form={form} label="Check-in" name="date" />
          <FormField
            control={form.control}
            name="adults"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adultos</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="rounded-none border-t-0 border-r-0 border-l-0 dark:bg-transparent">
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from(Array(5), (_, i) => i + 1).map((item, i) => (
                      <SelectItem key={i} value={`${item}`}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="children"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Niños</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={`${field.value}`}
                >
                  <FormControl>
                    <SelectTrigger className="rounded-none border-t-0 border-r-0 border-l-0 dark:bg-transparent">
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from(Array(5), (_, i) => i).map((item, i) => (
                      <SelectItem key={i} value={`${item}`}>
                        {`${item}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-2 items-start">
            <p className="opacity-0 pointer-events-none select-none">a</p>
            <Button
              type="submit"
              variant={"bookingFormButton"}
              className="rounded-none w-full"
            >
              <p className="select-none">Buscar</p>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BookingForm;
