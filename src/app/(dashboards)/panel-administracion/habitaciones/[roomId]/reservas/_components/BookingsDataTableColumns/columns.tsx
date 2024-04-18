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
import { Booking } from "@/types/Booking/booking";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal, Settings, Trash2 } from "lucide-react";

const columnHelper = createColumnHelper<Booking>();

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
          onCheckedChange={() => table.toggleAllPageRowsSelected()}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={() => row.toggleSelected()}
        />
      );
    },
  }),

  columnHelper.accessor((row) => `${row.user.username}`, {
    id: "Cliente",
    header: () => <span>Cliente</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor((row) => `${row.checkIn}`, {
    id: "Check-in",
    header: () => <span>Check-in</span>,
    cell: (info) => {
      return (
        <span>
          {format(new Date(info.getValue()), "dd 'de' MMMM 'del' yyyy")}
        </span>
      );
    },
  }),
  columnHelper.accessor((row) => `${row.checkOut}`, {
    id: "Check-out",
    header: () => <span>Check-out</span>,
    cell: (info) => (
      <span>
        {format(new Date(info.getValue()), "dd 'de' MMMM 'del' yyyy")}
      </span>
    ),
  }),

  columnHelper.display({
    id: "Acciones",
    cell: ({ row }) => {
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

            <DropdownMenuItem className="flex items-center gap-2">
              <Trash2 className="w-3 h-3" />
              <span>Eliminar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
];
