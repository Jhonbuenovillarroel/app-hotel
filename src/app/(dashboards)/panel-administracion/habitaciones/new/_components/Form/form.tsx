"use client";

import React, { ChangeEvent, useId, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RoomType } from "@/types/Room/RoomType";
import ReactSelect, { StylesConfig } from "react-select";
import { Amenitie } from "@/types/Room/amenitie";
import "./form.css";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import axios from "axios";
import toast from "react-hot-toast";
import ButtonLoading from "@/components/Loading/ButtonLoading/button-loading";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  roomType: z.object({
    id: z.string().min(1, {
      message: "Obligatorio",
    }),
    name: z.string().min(1, {
      message: "Obligatorio",
    }),
  }),
  floor: z.string().min(1, {
    message: "Campo Obligatorio",
  }),
  price: z.string().min(1, {
    message: "Campo Obligatorio",
  }),
  roomNumber: z.string().min(1, {
    message: "Campo Obligatorio",
  }),
  adults: z.string().min(1, {
    message: "Campo Obligatorio",
  }),
  children: z.string().min(1, {
    message: "Campo Obligatorio",
  }),
  view: z.string().min(1, {
    message: "Campo Obligatorio",
  }),
  bedType: z.string().min(1, {
    message: "Campo Obligatorio",
  }),

  amenities: z.array(
    z.object({
      name: z.string(),
      id: z.string(),
    })
  ),
  hotelCenterName: z.string().min(1, {
    message: "Campo Obligatorio",
  }),
  target: z.string().min(1, {
    message: "Campo Obligatorio",
  }),
  description: z.string().min(1, {
    message: "Campo Obligatorio",
  }),
});

interface Props {
  roomTypes: RoomType[];
  amenities: Amenitie[];
  hotelCenters: HotelCenter[];
}

const CreateRoomForm = ({ roomTypes, amenities, hotelCenters }: Props) => {
  const router = useRouter();
  const [formLoading, setFormLoading] = useState(false);
  const reactSelectId = useId();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomType: { id: "", name: "" },
      floor: "",
      price: "",
      roomNumber: "",
      adults: "",
      children: "",
      view: "",
      bedType: "",
      amenities: [],
      target: "",
      description: "",
      hotelCenterName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setFormLoading(true);

    try {
      const response = await axios.post("/api/rooms/api/create", values);

      if (response.data.ok) {
        toast.success(response.data.message);
        router.refresh();
      } else if (response.data.error) {
        toast.error(response.data.error);
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
    <section className="flex items-center justify-center w-full h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 w-full max-w-[360px] sm:max-w-[800px] py-8"
        >
          <h2 className="font-medium text-xl">Crear nueva habitación</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            <FormField
              control={form.control}
              name="roomType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Habitación</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      for (let roomType of roomTypes) {
                        if (roomType.name === value) {
                          field.onChange({
                            id: roomType.id,
                            name: roomType.name,
                          });
                        }
                      }
                    }}
                    defaultValue={field.value.name}
                    value={field.value.name}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tipo de habitación" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roomTypes.map((roomType) => (
                        <SelectItem key={roomType.id} value={roomType.name}>
                          {roomType.name}
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
              name="floor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Piso</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un piso" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 5 }, (_, i) => i + 2).map(
                        (floor) => (
                          <SelectItem key={floor} value={`${floor}`}>
                            {floor}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input placeholder="ej. 60" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roomNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Habitación</FormLabel>
                  <FormControl>
                    <Input placeholder="ej. 201" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="adults"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adultos</FormLabel>
                  <FormControl>
                    <Input placeholder="ej. 3" type="number" {...field} />
                  </FormControl>
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
                  <FormControl>
                    <Input placeholder="ej. 2" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="view"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vista</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ej. Vista a la calle"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bedType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Cama</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ej. Cama 2 plazas"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amenities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comodidades</FormLabel>
                  <FormControl>
                    <ReactSelect
                      instanceId={reactSelectId}
                      isMulti
                      value={field.value.map((item) => {
                        return { value: item.name, label: item.name };
                      })}
                      onChange={(data) => {
                        const values = data as {
                          value: string;
                          label: string;
                        }[];

                        field.onChange(
                          values.map((item) => {
                            for (let amenitie of amenities) {
                              if (amenitie.name === item.value) {
                                return { name: amenitie.name, id: amenitie.id };
                              }
                            }
                          })
                        );
                      }}
                      className="react-select-container"
                      classNamePrefix="react-select-child"
                      options={amenities.map((amenitie) => {
                        return { value: amenitie.name, label: amenitie.name };
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hotelCenterName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sede</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una sede" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {hotelCenters.map((hotelCenter) => (
                        <SelectItem
                          key={hotelCenter.id}
                          value={hotelCenter.name}
                        >
                          {hotelCenter.name}
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
              name="target"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Público Objetivo</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="ej. Ideal para parejas o personas solas"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="ej. Habitación matrimonial con cama Queen, ideal para parejas o personas solas, tiene vista a la ciudad"
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
              <ButtonLoading />
            ) : (
              <>
                <Button type="submit">Crear Habitación</Button>
              </>
            )}
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreateRoomForm;
