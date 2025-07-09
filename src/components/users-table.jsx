"use client";

import { useMemo, useState, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel, // Import for filtering
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Import Input for global filter
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowUpDown, // Icon for sorting
} from "lucide-react"; // Assuming lucide-react is available for icons

// Function to calculate age from birth date string
function getAge(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export default function UsersTable({ users, onEdit, onDelete }) {
  // State for sorting
  const [sorting, setSorting] = useState([]);
  // State for global filter
  const [globalFilter, setGlobalFilter] = useState("");

  // Memoize data to avoid recalculations on every render
  const data = useMemo(() => {
    return users.map((u) => ({
      ...u,
      age: u.birth_date ? getAge(u.birth_date) : null, // Handle cases where birth_date might be missing
    }));
  }, [users]);

  // Define columns for the table, memoized for performance
  const columns = useMemo(
    () => [
      {
        accessorKey: "first_name",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center"
          >
            <div className="flex items-center">
              Nome
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
          </Button>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            {/* Display profile image if available, otherwise a placeholder */}
            <img
              src={row.original.profile_image_url || `https://placehold.co/40x40/cccccc/333333?text=${row.original.first_name[0]}`}
              alt={`${row.original.first_name} ${row.original.last_name}`}
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
              onError={(e) => {
                // Fallback to a text placeholder if image fails to load
                e.target.onerror = null;
                e.target.src = `https://placehold.co/40x40/cccccc/333333?text=${row.original.first_name[0]}`;
              }}
            />
            {row.original.first_name}
          </div>
        ),
        enableSorting: true, // Enable sorting for this column
      },
      {
        accessorKey: "last_name",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center"
          >
            <div className="flex items-center">
              Sobrenome
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
          </Button>
        ),
        enableSorting: true, // Enable sorting for this column
      },
      {
        accessorKey: "age",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center"
          >
            <div className="flex items-center">
              Idade
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
          </Button>
        ),
        enableSorting: true, // Enable sorting for this column
      },
      {
        accessorKey: "city",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center"
          >
            <div className="flex items-center">
              Cidade
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
          </Button>
        ),
        enableSorting: true, // Enable sorting for this column
      },
      {
        accessorKey: "state",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center"
          >
            <div className="flex items-center">
              Estado
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
          </Button>
        ),
        enableSorting: true, // Enable sorting for this column
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(row.original)}>
              Editar
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(row.original.id)}>
              Deletar
            </Button>
          </div>
        ),
        enableSorting: false, // Actions column should not be sortable
        enableColumnFilter: false, // Actions column should not be filterable
      },
    ],
    [onEdit, onDelete]
  );

  // Initialize react-table instance
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // Enable client-side filtering
    onSortingChange: setSorting, // Update sorting state
    onGlobalFilterChange: setGlobalFilter, // Update global filter state
    state: {
      sorting,
      globalFilter,
    },
  });

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-lg"> {/* Container for distinction */}
      <div className="mb-4">
        <Input
          placeholder="Filtrar usuários..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nenhum resultado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
