"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Room } from "@/types/Room/room";
import { createColumnHelper } from "@tanstack/react-table";
import ActionsColumn from "./_components/ActionsColumn/actions-column";

const columnHelper = createColumnHelper<Room>();

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
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected();
          }}
          aria-label="Seleccionar"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected();
          }}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: false,
  }),
  columnHelper.accessor(
    (row) => {
      return `${row.roomtype?.name}`;
    },
    {
      id: "Tipo",
      header: () => <span>Tipo</span>,
      cell: (info) => <span>{info.getValue()}</span>,
    }
  ),
  columnHelper.accessor((row) => `${row.roomNumber}`, {
    id: "Número",
    header: () => <span>Número</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor((row) => `${row.floor}`, {
    id: "Piso",
    header: () => <span>Piso</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor((row) => `${row.price}`, {
    id: "Precio",
    header: () => <span>Precio</span>,
    cell: (info) => <span>{`S/${info.getValue()}`}</span>,
  }),
  columnHelper.accessor(
    (row) => {
      return `${row.hotelcenter?.name}`;
    },
    {
      id: "Sede",
      header: () => <span>Sede</span>,
      cell: (info) => <span>{`${info.getValue()}`}</span>,
    }
  ),
  columnHelper.display({
    id: "Acciones",
    cell: ({ row }) => (
      <>
        <ActionsColumn row={row} />
      </>
    ),
  }),
];
