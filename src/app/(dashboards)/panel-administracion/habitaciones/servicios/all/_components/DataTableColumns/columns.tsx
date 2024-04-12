"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Service } from "@/types/Room/service";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { MoreHorizontal, Pencil, Settings, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const columnHelper = createColumnHelper<Service>();

export const columns = [
  columnHelper.display({
    id: "Seleccionar",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected()}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected()}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  }),

  columnHelper.accessor("name", {
    id: "Nombre",
    header: () => <span>Nombre</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),

  columnHelper.display({
    id: "Acciones",
    cell: ({ row }) => {
      const router = useRouter();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="px-2 py-1.5 hover:bg-zinc-800 transition-all duration-200 rounded-md">
            <MoreHorizontal className="w-4 h-4" />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel className="flex items-center gap-2">
              <Settings className="w-3 h-3" />
              <span>Acciones</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem className="w-full">
              <Link
                className="w-full flex items-center gap-2"
                href={`/panel-administracion/habitaciones/servicios/edit/${row.original.id}`}
              >
                <Pencil className="w-3 h-3" />
                <span>Editar</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => {
                Swal.fire({
                  html: `<div class="flex flex-col items-center gap-3">
                          <h2 class="text-lg text-zinc-100 font-bold">
                            Estás seguro de realizar esta acción?
                          </h2>
                          <p class="text-sm font-normal text-zinc-200">
                            Esta acción eliminará el servicio de forma permanente
                          </p>
                        </div>`,
                  background: "rgb(20, 20, 20)",
                  customClass: "text-sm",
                  confirmButtonText: "Confirmar",
                  confirmButtonColor: "rgb(40, 40, 40)",
                  denyButtonColor: "#bd9b57",
                  showDenyButton: true,
                  denyButtonText: "No, cancelar",
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    try {
                      const { data } = await axios.post(
                        "/api/rooms/services/api/delete",
                        { id: row.original.id }
                      );

                      if (data.ok) {
                        toast.success(data.message);
                        router.refresh();
                      } else if (data.error) {
                        toast.error(data.error);
                      }
                    } catch (error) {
                      toast.error("Algo salió mal, vuelve a intentarlo");
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
  }),
];
