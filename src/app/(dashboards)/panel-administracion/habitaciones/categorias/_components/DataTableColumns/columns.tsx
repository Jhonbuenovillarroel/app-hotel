"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { RoomType } from "@/types/Room/RoomType";
import { createColumnHelper } from "@tanstack/react-table";
import ActionsColumn from "./_components/ActionsColumn/actions-column";

const columnHelper = createColumnHelper<RoomType>();

export const columns = [
  columnHelper.display({
    id: "Acciones",
    header: ({ table }) => {
      return (
        <Checkbox
          className="rounded-[4px]"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected()}
          aria-label="Seleccionar todo"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          className="rounded-[4px]"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected()}
          aria-label="Seleccionar Fila"
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
    cell: ({ row }) => <ActionsColumn row={row} />,
  }),
];
