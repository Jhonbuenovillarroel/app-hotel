"use client";

import React from "react";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import { createColumnHelper } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Settings, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";
import toast from "react-hot-toast";

const columnHelper = createColumnHelper<HotelCenter>();

export const columns = [
  columnHelper.display({
    id: "Seleccionar",
    header: ({ table }) => (
      <Checkbox
        className="rounded-[4px]"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Seleccionar todo"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="rounded-[4px]"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
        }}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("name", {
    id: "Nombre",
    header: () => <span>Nombre</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("address", {
    id: "Dirección",
    header: () => <span>Dirección</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.display({
    id: "Acciones",
    cell: ({ row }) => {
      const router = useRouter();

      return (
        <DropdownMenu modal={true}>
          <DropdownMenuTrigger className="hover:bg-zinc-800 cursor-pointer flex items-center justify-center rounded-md p-2 w-fit transition-all duration-150">
            <MoreHorizontal className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="">
            <DropdownMenuLabel className="flex gap-2 items-center">
              <Settings className="w-3 h-3" strokeWidth={1.2} />
              <span>Acciones</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex gap-2"
              onClick={() => {
                router.push(
                  `/panel-administracion/sedes/edit/${row.original.id}`
                );
              }}
            >
              <Pencil className="w-3 h-3" />
              <span>Editar</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex gap-2"
              onClick={() => {
                Swal.fire({
                  html: `
                  <div class="flex flex-col gap-3">
                    <h2 class="text-white font-bold text-xl max-w-[288px] mx-auto">
                      Estás seguro de realizar esta acción?
                    </h2>
                    <p class="text-[15px] text-zinc-100">
                      Esta acción eliminará la sede completamente
                  
                    </p>
                  </div>`,
                  showDenyButton: true,
                  background: "rgb(20, 20, 20)",
                  confirmButtonColor: "rgb(40, 40, 40)",
                  confirmButtonText: "Confirmar",
                  denyButtonColor: "#bd9b57",
                  denyButtonText: "No, cancelar",
                  customClass: "text-sm",
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    try {
                      const response = await axios.post(
                        "/api/hotel-centers/api/delete",
                        { id: row.original.id }
                      );

                      if (response.data.ok) {
                        toast.success(response.data.message);
                        router.refresh();
                      } else if (response.data.error) {
                        Swal.fire({
                          html: `
                          <div class="flex flex-col gap-3">
                            <h2 class="text-white font-bold text-lg max-w-[288px] mx-auto">
                              No puedes realizar esta acción
                            </h2>
                            <p class="text-[15px] text-zinc-100">
                            ${response.data.error}
                            </p>
                          </div>`,
                          background: "rgb(20, 20, 20)",
                          confirmButtonColor: "#bd9b57",
                          confirmButtonText: "Entiendo",
                          customClass: "text-sm",
                        });
                      }
                    } catch (error) {
                      toast.error("Error interno del servidor");
                    }
                  }
                });
              }}
            >
              <Trash2 className="w-3 h-3" />
              <span>Eliminar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
    enableSorting: false,
  }),
];
