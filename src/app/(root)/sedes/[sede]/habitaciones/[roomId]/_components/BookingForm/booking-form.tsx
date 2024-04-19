"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { date, z } from "zod";
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
import { Link, Loader2 } from "lucide-react";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import { useRouter } from "next/navigation";
import { Room } from "@/types/Room/room";
import toast from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";
import { useShoppingCartStore } from "@/store/shoppingCartStore";
import { useState } from "react";
import { addDays } from "date-fns";

export type FormSchemaType = UseFormReturn<
  {
    date: { from: Date; to: Date };
  },
  any,
  undefined
>;

const formSchema = z.object({
  date: z.object({
    from: z.date().default(new Date()),
    to: z.date().default(addDays(new Date(), 3)),
  }),
});

interface Props {
  room: Room;
  positioning: "horizontal" | "vertical";
  defaultValues?: {
    date: { from: Date; to: Date };
  };
  className?: string;
}

const BookingForm = ({
  positioning,
  defaultValues,
  className,
  room,
}: Props) => {
  const shoppingCartStore = useShoppingCartStore((state) => state);
  const router = useRouter();
  const [searching, setSearching] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: defaultValues?.date
        ? defaultValues.date
        : { from: new Date(), to: addDays(new Date(), 3) },
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setSearching(true);

    try {
      const { data } = await axios.post(
        "/api/rooms/api/check-room-availability",
        {
          roomId: room.id,
          checkIn: values.date.from,
          checkOut: values.date.to,
        }
      );

      if (data.ok) {
        Swal.fire({
          html: `
          <div class="flex flex-col gap-2 justify-center items-center">
            <h2 class="text-lg text-zinc-900 dark:text-zinc-100 font-semibold">
              Habitación disponible
            </h2>
            <p class="text-sm text-zinc-800 dark:text-zinc-200">${data.message}</p>
          </div>
          `,
          icon: "success",
          imageWidth: "100px",
          confirmButtonColor: "#bd9b57",
          confirmButtonText: "Si, reservar",
          showDenyButton: true,
          denyButtonColor: "rgb(40, 40, 40)",
          denyButtonText: "No, Cancelar",
          customClass: "text-sm bg-zinc-100 dark:bg-zinc-950",
        }).then((result) => {
          if (result.isConfirmed) {
            shoppingCartStore.addRoom({
              room,
              checkIn: values.date.from,
              checkOut: values.date.to,
            });
          }
        });
      } else if (data.error) {
        Swal.fire({
          html: `
          <div class="flex flex-col gap-2 justify-center items-center">
            <h2 class="text-lg text-zinc-900 dark:text-zinc-100 font-semibold">
              Habitación no disponible
            </h2>
            <p class="text-sm text-zinc-800 dark:text-zinc-200">${data.error}</p>
          </div>
          `,
          icon: "error",
          imageWidth: "100px",
          confirmButtonColor: "#bd9b57",
          confirmButtonText: "Entiendo",
          customClass: "text-sm bg-zinc-100 dark:bg-zinc-950",
        });
      }
    } catch (error) {
      toast.error("Algo salió mal, vuelve a intentarlo");
    }

    setTimeout(() => {
      setSearching(false);
    }, 1000);
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
          <CalendarFormField form={form} label="Check-in" name="date" />

          <div className="flex flex-col gap-2 items-start">
            <p className="opacity-0 pointer-events-none select-none">a</p>
            {searching ? (
              <>
                <Button
                  variant={"bookingFormButton"}
                  className="w-full rounded-none flex items-center gap-2"
                >
                  <Loader2 className="animate-spin w-4 h-4" />
                  <span className="text-sm">Verificando...</span>
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="submit"
                  variant={"bookingFormButton"}
                  className="rounded-none w-full"
                >
                  <p className="select-none">Verificar Disponibilidad</p>
                </Button>
              </>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BookingForm;
