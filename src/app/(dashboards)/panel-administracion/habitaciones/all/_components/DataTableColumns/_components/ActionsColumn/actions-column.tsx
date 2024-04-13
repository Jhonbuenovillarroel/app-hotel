import { Room } from "@/types/Room/room";
import { room } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Row } from "@tanstack/react-table";
import axios from "axios";
import {
  MoreHorizontal,
  Settings,
  Link,
  Pencil,
  Trash2,
  Images,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

interface Props {
  row: Row<room>;
}

const ActionsColumn = ({ row }: Props) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-zinc-800 w-fit px-2 py-1.5 rounded-md transition-all duration-200">
        <MoreHorizontal className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex gap-2 items-center">
          <Settings className="w-3 h-3" />
          <span>Acciones</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2">
          <Link
            className="w-full flex gap-2 items-center h-full"
            href={`/panel-administracion/habitaciones/edit/${row.original.id}`}
          >
            <Pencil className="w-3 h-3" />
            <span>Editar</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={async () => {
            Swal.fire({
              html: `
              <div class="flex flex-col gap-3">
                <h2 class="text-white font-bold text-xl max-w-[288px] mx-auto">
                  Estás seguro de realizar esta acción?
                </h2>
                <p class="text-[15px] text-zinc-100">
                  Esta acción eliminará la habitación completamente
              
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
                  const response = await axios.post("/api/rooms/api/delete", {
                    id: row.original.id,
                  });

                  if (response.data.ok) {
                    toast.success(response.data.message);
                    router.refresh();
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
        <DropdownMenuItem className="flex items-center gap-2">
          <Link
            className="w-full flex gap-2 items-center h-full"
            href={`/panel-administracion/habitaciones/edit/${row.original.id}/images/all`}
          >
            <Images className="w-3 h-3" />
            <span>Ver Imagenes</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsColumn;
