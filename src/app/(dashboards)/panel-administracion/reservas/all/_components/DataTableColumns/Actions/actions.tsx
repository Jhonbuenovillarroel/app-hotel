import { Booking } from "@/types/Booking/booking";
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
import { MoreHorizontal, Settings, Trash2 } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

interface Props {
  row: Row<Booking>;
}

const ColumnActions = ({ row }: Props) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-md py-1.5 px-2 hover:bg-zinc-300 dark:hover:bg-zinc-800">
        <MoreHorizontal className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex items-center gap-2">
          <Settings className="w-3 h-3" />
          <span>Acciones</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex items-center gap-2 text-red-400"
          onClick={() => {
            Swal.fire({
              html: `
              <div class="flex flex-col items-center gap-2 justify-center">
                <h2 class="font-bold text-lg text-zinc-900 dark:text-zinc-100">
                  Estás seguro de realizar esta acción?
                </h2>
                <p class="text-zinc-800 text-sm dark:text-zinc-200">
                  Esta acción eliminará la reserva de forma permanente y
                  puede que un usuario ya haya pagado por ella
                </p>
              </div>
              `,
              customClass: "text-sm bg-zinc-100 dark:bg-zinc-950",
              confirmButtonColor: "rgb(40, 40, 40)",
              confirmButtonText: "Estoy seguro, continuar",
              showDenyButton: true,
              denyButtonText: "No, cancelar",
            }).then(async (result) => {
              if (result.isConfirmed) {
                try {
                  const { data } = await axios.post(
                    "/api/bookings/api/delete",
                    { id: row.original.id }
                  );

                  if (data.ok) {
                    toast.success("Reserva eliminada correctamente");
                    router.refresh();
                  }
                } catch (error) {
                  console.log(error);
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

export default ColumnActions;
