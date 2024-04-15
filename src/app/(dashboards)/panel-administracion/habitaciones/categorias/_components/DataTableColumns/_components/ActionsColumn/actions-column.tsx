import { RoomType } from "@/types/Room/RoomType";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import axios from "axios";
import { MoreHorizontal, Settings, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Link from "next/link";

interface Props {
  row: Row<RoomType>;
}

const ActionsColumn = ({ row }: Props) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer hover:bg-zinc-300 dark:hover:bg-zinc-800 rounded-md w-8 py-1.5 flex items-center justify-center transition-all duration-200">
        <MoreHorizontal className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex items-center gap-2">
          <Settings className="w-3.5 h-3.5" />
          Acciones
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2">
          <Link
            href={`/panel-administracion/habitaciones/categorias/edit/${row.original.id}`}
            className="flex items-center gap-2 w-full"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>Editar</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2"
          onClick={() => {
            Swal.fire({
              html: `<div class="flex flex-col items-center justify-center gap-3">
                  <h2 class="text-xl text-white font-bold">
                    Estás seguro de realizar esta acción?
                  </h2>
                  <p class="text-sm text-zinc-200 ">
                    Se eliminará la categoría completamente
                  </p>
                </div>`,
              color: "#fff",
              background: "rgb(20, 20, 20)",
              confirmButtonText: "Confirmar",
              customClass: "text-sm",
              confirmButtonColor: "rgb(40, 40, 40)",
              showDenyButton: true,
              denyButtonColor: "#bd9b57",
              denyButtonText: "No, cancelar",
            }).then(async (result) => {
              if (result.isConfirmed) {
                try {
                  const response = await axios.post(
                    "/api/rooms/room-types/delete",
                    { id: row.original.id }
                  );

                  if (response.data.ok) {
                    toast.success(response.data.message);
                    router.refresh();
                  }
                } catch (error) {
                  toast.error("Algo salió mal, vuelve a intentarlo");
                }
              }
            });
          }}
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Eliminar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsColumn;
