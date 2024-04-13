"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Service } from "@/types/Room/service";
import { createColumnHelper } from "@tanstack/react-table";
import ActionsColumn from "./_components/ActionsColumn/actions-column";

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
    cell: ({ row }) => <ActionsColumn row={row} />,
  }),
];
