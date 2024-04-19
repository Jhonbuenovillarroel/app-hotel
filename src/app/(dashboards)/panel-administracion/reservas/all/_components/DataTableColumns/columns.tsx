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
import axios from "axios";
import { format } from "date-fns";
import {
  CircleDollarSign,
  Hand,
  MoreHorizontal,
  Settings,
  Shield,
  Trash2,
  UserCog,
} from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import ColumnActions from "./Actions/actions";

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
    id: "Usuario",
    header: () => <span>Usuario</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor((row) => `${row.user.role}`, {
    id: "Rol",
    header: () => <span>Rol</span>,
    cell: (info) => (
      <p
        className={`${
          info.getValue() === "admin"
            ? "bg-gold-hr-dark text-zinc-100"
            : info.getValue() === "customer"
            ? "bg-green-700 text-green-400"
            : "bg-zinc-700 text-zinc-200"
        } px-4 py-1.5 rounded-full flex gap-2 items-center w-fit text-xs`}
      >
        {info.getValue() === "admin" ? (
          <Shield className="w-3 h-3" strokeWidth={1.2} />
        ) : info.getValue() === "customer" ? (
          <CircleDollarSign className="w-3 h-3" strokeWidth={1.2} />
        ) : (
          <UserCog className="w-3 h-3" strokeWidth={1.2} />
        )}

        {info.getValue() === "admin"
          ? "Administrador"
          : info.getValue() === "customer"
          ? "Cliente"
          : "Colaborador"}
      </p>
    ),
  }),
  columnHelper.accessor((row) => `${row.checkIn}`, {
    id: "Check-in",
    header: () => <span>Check-in</span>,
    cell: (info) => (
      <p className="min-w-[100px]">
        {format(new Date(info.getValue()), "dd 'de' MMMM 'del' yyyy")}
      </p>
    ),
    filterFn: "checkInFilter",
  }),
  columnHelper.accessor((row) => `${row.checkOut}`, {
    id: "Check-out",
    header: () => <span>Check-out</span>,
    cell: (info) => (
      <p className="min-w-[100px]">
        {format(new Date(info.getValue()), "dd 'de' MMMM 'del' yyyy")}
      </p>
    ),
    filterFn: "checkOutFilter",
  }),
  columnHelper.accessor((row) => `${row.creationMode}`, {
    id: "Modo de Creación",
    header: () => <span>Modo de Creación</span>,
    cell: (info) => (
      <p
        className={`${
          info.getValue() === "paid"
            ? "bg-green-700 text-green-400"
            : "bg-zinc-700 text-zinc-200"
        } w-fit rounded-full px-4 py-1.5 text-xs flex items-center gap-2`}
      >
        {info.getValue() === "paid" ? (
          <>
            <CircleDollarSign className="w-3 h-3" strokeWidth={1.2} />
            <span>Pagado</span>
          </>
        ) : (
          <>
            <Hand className="w-3 h-3" strokeWidth={1.2} />
            <span>Manual</span>
          </>
        )}
      </p>
    ),
  }),
  columnHelper.accessor((row) => `${row.room.roomtype.name}`, {
    id: "Habitación",
    header: () => <span>Habitación</span>,
    cell: (info) => <span>{info.getValue()}</span>,
    filterFn: "checkOutFilter",
  }),
  columnHelper.accessor((row) => `${row.room.roomNumber}`, {
    id: "Número",
    header: () => <span>Número</span>,
    cell: (info) => <span>{info.getValue()}</span>,
    filterFn: "checkOutFilter",
  }),
  columnHelper.accessor((row) => `${row.room.hotelcenter.name}`, {
    id: "Sede",
    header: () => <span>Sede</span>,
    cell: (info) => <span>{info.getValue()}</span>,
    filterFn: "checkOutFilter",
  }),

  columnHelper.display({
    id: "Acciones",
    cell: ({ row }) => <ColumnActions row={row} />,
  }),
];
