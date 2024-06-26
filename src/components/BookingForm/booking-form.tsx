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
import CalendarFormField from "./_components/CalendarFormField/calendar-form-field";
import { Loader2 } from "lucide-react";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import { useRouter } from "next/navigation";
import { addDays, format } from "date-fns";
import { useCheckAvailabilityPageContext } from "@/app/(root)/_components/CheckAvailabilityPageProvider/context-provider";
import { formatLocaleDate } from "@/utils/functions";
import Swal from "sweetalert2";

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
  const checkAvailabilityPageContext = useCheckAvailabilityPageContext();

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
        ? {
            from: new Date(defaultValues.date.from),
            to: new Date(defaultValues.date.to),
          }
        : {
            from: new Date(),
            to: new Date(format(addDays(new Date(), 3), "MM-dd-yyyy")),
          },
      adults: defaultValues?.adults ? defaultValues.adults : "1",
      children: defaultValues?.children ? defaultValues.children : "0",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (
      values.date.from.toLocaleDateString() ===
      values.date.to.toLocaleDateString()
    ) {
      console.log({
        from: formatLocaleDate(values.date.from),
        to: formatLocaleDate(values.date.to),
      });
      Swal.fire({
        html: `
        <div class="flex flex-col gap-2 items-center justify-center">
          <h2 class="text-lg font-bold text-zinc-900 dark:text-zinc-100">Fecha inválida</h2>
          <p class="text-sm text-zinc-800 dark:text-zinc-200">Debes haber al menos un día de diferencia entre las fechas seleccionadas</p>
        </div>
        `,
        customClass: "text-sm bg-zinc-100 dark:bg-zinc-950",
        confirmButtonColor: "#bd9b57",
      });
      return;
    }

    checkAvailabilityPageContext.setSearchButtonLoading(true);
    router.push(
      `/reservar/verificar-disponibilidad?hcId=${values.hotelCenter.id}&check-in=${values.date.from}&check-out=${values.date.to}&adults=${values.adults}&children=${values.children}`
    );
    router.refresh();
  };

  return (
    <div className="h-full flex items-start justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`${
            positioning === "horizontal"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
              : "flex flex-col"
          } max-w-[1200px] w-full ${
            positioning === "horizontal"
              ? "max-w-[1200px] gap-3 md:gap-4 md:gap-y-6"
              : "max-w-[280px] gap-2"
          } items-start justify-center ${className}`}
        >
          <FormField
            control={form.control}
            name="hotelCenter"
            render={({ field }) => (
              <FormItem className="w-full">
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
                  <SelectContent className="relative z-[60]">
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
          <CalendarFormField
            defaultDate={defaultValues?.date && defaultValues.date}
            form={form}
            label="Check-in - Check-out"
            name="date"
          />
          <FormField
            control={form.control}
            name="adults"
            render={({ field }) => (
              <FormItem className="w-full">
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
                  <SelectContent className="relative z-[60]">
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
              <FormItem className="w-full">
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
                  <SelectContent className="relative z-[60]">
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

          <div className="w-full flex flex-col gap-2 items-center justify-center xl:items-start md:col-span-2 lg:col-span-4 xl:col-span-1">
            <div className="w-full flex flex-col xl:gap-2">
              <p className="opacity-0 pointer-events-none select-none hidden xl:flex">
                a
              </p>
              {checkAvailabilityPageContext.searchButtonLoading ? (
                <Button
                  disabled
                  variant={"bookingFormButton"}
                  className="rounded-none w-full flex items-center justify-center gap-2 mt-2 md:mt-1 xl:mt-0"
                >
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Buscando...</span>
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant={"bookingFormButton"}
                  className="rounded-none w-full mt-2 md:mt-1 xl:mt-0"
                >
                  <p className="select-none">Buscar</p>
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BookingForm;
