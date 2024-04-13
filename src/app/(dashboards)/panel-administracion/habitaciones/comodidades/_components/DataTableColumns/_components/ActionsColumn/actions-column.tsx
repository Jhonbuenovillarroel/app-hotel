import { Amenitie } from "@/types/Room/amenitie";
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
import { MoreHorizontal, Settings, Link, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

interface Props {
  row: Row<Amenitie>;
}

const ActionsColumn = ({ row }: Props) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="px-2 py-1.5 hover:bg-zinc-800 rounded-md transition-all duration-200">
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
            href={`/panel-administracion/habitaciones/comodidades/edit/${row.original.id}`}
            className="w-full flex items-center gap-2"
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
              <div class="flex flex-col items-center justify-center gap-3">
                <h2 class="text-xl font-bold text-white">
                  Estás seguro de realizar esta acción?
                </h2>
                <p class="text-sm font-normal text-zinc-200">
                  Esta acción eliminará este comodidad permanentemente
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
                    "/api/rooms/amenities/delete",
                    { id: row.original.id }
                  );

                  if (data.ok) {
                    toast.success(data.message);
                    router.refresh();
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
};

export default ActionsColumn;