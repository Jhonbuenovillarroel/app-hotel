"use client";

import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  ColumnDef,
  FilterFn,
  Row,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format, setDate } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Booking } from "@/types/Booking/booking";
import { formatLocaleDate } from "@/utils/functions";
import { Label } from "@/components/ui/label";
import { tanstackTableFilterFunctions } from "@/utils/tanstack-table";

interface BookingsDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

declare module "@tanstack/react-table" {
  interface FilterFns {
    checkInFilter?: FilterFn<unknown>;
    checkOutFilter?: FilterFn<unknown>;
  }
}

const BookingsDataTable = <TData, TValue>({
  columns,
  data,
}: BookingsDataTableProps<TData, TValue>) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    filterFns: tanstackTableFilterFunctions,
  });

  return (
    <div className="max-w-[900px] mx-auto mt-16 flex flex-col items-center justify-center gap-5">
      <div className="flex flex-col min-[500px]:flex-row gap-4 w-full">
        <div className="flex flex-col gap-2 w-full max-w-[240px]">
          <Label>Filtrar por Check-In</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !table.getColumn("Check-in")?.getFilterValue() &&
                    "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {(table.getColumn("Check-in")?.getFilterValue() as Date) ? (
                  format(
                    table.getColumn("Check-in")?.getFilterValue() as Date,
                    "PPP"
                  )
                ) : (
                  <span>Elige una fecha</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={table.getColumn("Check-in")?.getFilterValue() as Date}
                onSelect={(value) => {
                  table.getColumn("Check-in")?.setFilterValue(value);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-2 w-full max-w-[240px]">
          <Label>Filtrar por Check-Out</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !table.getColumn("Check-out")?.getFilterValue() &&
                    "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {(table.getColumn("Check-out")?.getFilterValue() as Date) ? (
                  format(
                    table.getColumn("Check-out")?.getFilterValue() as Date,
                    "PPP"
                  )
                ) : (
                  <span>Elige una fecha</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={
                  table.getColumn("Check-out")?.getFilterValue() as Date
                }
                onSelect={(value) => {
                  table.getColumn("Check-out")?.setFilterValue(value);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="rounded-md border border-zinc-300 dark:border-zinc-800 w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              <>
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="border-t border-zinc-300 dark:border-zinc-800"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            ) : (
              <>
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="border-t border-zinc-300 dark:border-zinc-800 py-10 text-center"
                  >
                    No hay resultados
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BookingsDataTable;
