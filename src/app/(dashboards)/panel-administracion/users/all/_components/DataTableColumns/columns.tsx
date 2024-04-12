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
import { User } from "@/types/User/user";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import {
  CircleDollarSign,
  MoreHorizontal,
  Pencil,
  Settings,
  Shield,
  Trash2,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const columnHelper = createColumnHelper<User>();

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

  columnHelper.accessor("username", {
    id: "Nombre de Usuario",
    header: () => <span>Nombre de Usuario</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("email", {
    id: "Correo Electrónico",
    header: () => <span>Correo Electrónico</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("role", {
    id: "Permisos",
    header: () => <span>Permisos</span>,
    cell: (info) => (
      <p
        className={`px-4 py-1 rounded-full w-fit flex items-center gap-1 ${
          info.getValue() === "customer"
            ? "bg-green-600 text-green-300"
            : info.getValue() === "admin"
            ? "bg-gold-hr-dark text-[#faefcf]"
            : info.getValue() === "colaborator"
            ? "bg-teal-800 text-teal-300"
            : ""
        }`}
      >
        {info.getValue() === "customer" ? (
          <CircleDollarSign className="w-3 h-3" />
        ) : info.getValue() === "admin" ? (
          <Shield className="w-3 h-3" />
        ) : info.getValue() === "colaborator" ? (
          <UserPlus className="w-3 h-3" />
        ) : (
          <></>
        )}
        <span>{info.getValue()}</span>
      </p>
    ),
  }),
  columnHelper.display({
    id: "Acciones",
    cell: ({ row }) => {
      const router = useRouter();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="px-2 py-1.5 rounded-md hover:bg-zinc-800 transition-all duration-200">
            <MoreHorizontal className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="flex items-center gap-2">
              <Settings className="w-3 h-3" />
              <span>Acciones</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href={`/panel-administracion/users/edit/${row.original.id}`}
                className="flex items-center gap-2"
              >
                <Pencil className="w-3 h-3" />
                <span>Editar</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => {
                Swal.fire({
                  html: `
                  <div class="flex flex-col items-center gap-2">
                    <h2 class="text-lg text-zinc-100 font-bold">
                      Estás seguro de realizar esta acción?
                    </h2>
                    <p class="text-sm text-zinc-200">
                      Esta acción eliminará al usuario de forma permanente
                    </p>
                  </div>
                  `,
                  background: "rgb(20, 20, 20)",
                  customClass: "text-sm",
                  confirmButtonColor: "rgb(40, 40, 40)",
                  confirmButtonText: "Confirmar",
                  showDenyButton: true,
                  denyButtonColor: "#bd9b57",
                  denyButtonText: "No, cancelar",
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    try {
                      const { data } = await axios.post(
                        "/api/users/api/delete",
                        {
                          id: row.original.id,
                        }
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
