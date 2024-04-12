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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "./form.css";
import ReactSelect from "react-select";
import { RoomType } from "@/types/Room/RoomType";
import { Amenitie } from "@/types/Room/amenitie";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import { Button } from "@/components/ui/button";
import form from "../../../../new/_components/Form/form";
import { Textarea } from "@/components/ui/textarea";
import { Room } from "@/types/Room/room";
import ButtonLoading from "@/components/Loading/ButtonLoading/button-loading";
import axios from "axios";
import toast from "react-hot-toast";
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
  room: Room;
}

const EditRoomForm = ({ roomTypes, amenities, hotelCenters, room }: Props) => {
  const router = useRouter();
  const [formLoading, setFormLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomType: { id: room.roomtype?.id, name: room.roomtype?.name } || {
        id: "",
        name: "",
      },
      floor: `${room.floor}` || "",
      price: `${room.price}` || "",
      roomNumber: `${room.roomNumber}` || "",
      adults: `${room.adults}` || "",
      children: `${room.children}` || "",
      view: room.view || "",
      bedType: room.bedType || "",
      amenities:
        room?.amenities.map((amenitie) => {
          return { name: amenitie.name, id: amenitie.id };
        }) || [],
      hotelCenterName:
        hotelCenters.filter(
          (hotelCenter) => room.hotelCenterId === hotelCenter.id
        )[0]?.name || "",
      target: room.target || "",
      description: room.description || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setFormLoading(true);

    try {
      const { data } = await axios.post("/api/rooms/api/edit", {
        ...values,
        id: room.id,
      });

      if (data.ok) {
        toast.success(data.message);
        router.refresh();
      } else if (data.error) {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Error interno del servidor");
    }

    setTimeout(() => {
      setFormLoading(false);
    }, 2100);
  };

  return (
    <div className="w-full flex items-center justify-center my-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-[800px] space-y-5"
        >
          <h2 className="text-2xl font-medium">Edita la habitación</h2>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <FormField
              control={form.control}
              name="roomType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
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
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo de habitación" />
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
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el piso" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 5 }, (_, i) => i + 2).map((i) => (
                        <SelectItem key={i} value={`${i}`}>
                          {i}
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="ej. 60" {...field} />
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
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="ej. 202" {...field} />
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
                    <Input type="number" placeholder="ej. 3" {...field} />
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
                    <Input type="number" placeholder="ej. 2" {...field} />
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
                      type="text"
                      placeholder="ej. Vista a la calle"
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
                      type="text"
                      placeholder="ej. Cama 2 plazas"
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
                      defaultValue={
                        field.value[0]
                          ? field.value.map((item) => {
                              return { value: item.name, label: item.name };
                            })
                          : undefined
                      }
                      onChange={(data) => {
                        const values = data as {
                          value: string;
                          label: string;
                        }[];

                        field.onChange(
                          values.map((item) => {
                            for (let amenitie of amenities) {
                              if (amenitie.name === item.value) {
                                return { name: item.value, id: amenitie.id };
                              }
                            }
                          })
                        );
                      }}
                      className="react-select-container"
                      classNamePrefix="react-select-child"
                      isMulti
                      placeholder="Seleccionar"
                      menuPlacement="auto"
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
                      placeholder="ej. Ideal para personas solas o parejas"
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
                      placeholder="ej. Habitación interior tranquila, ideal para pasar una noche a solas o con tu pareja"
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
                <Button type="submit">Guardar Cambios</Button>
              </>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditRoomForm;
