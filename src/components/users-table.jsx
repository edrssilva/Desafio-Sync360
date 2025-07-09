"use client";

import { useMemo, useState, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowUpDown,
} from "lucide-react";

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

// UsersTable now receives globalFilter and setGlobalFilter as props
export default function UsersTable({ users, onEdit, onDelete, globalFilter, setGlobalFilter }) {
  // State for sorting, managed internally by UsersTable
  const [sorting, setSorting] = useState([]);

  // Memoize data to avoid recalculations on every render
  const data = useMemo(() => {
    // Ensure 'users' is an array before calling map to prevent "Cannot read properties of undefined (reading 'map')"
    return (users || []).map((u) => ({
      ...u,
      age: u.birth_date ? getAge(u.birth_date) : null,
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
            <div className="flex items-center whitespace-nowrap"> {/* Added whitespace-nowrap to prevent header text wrap */}
              Nome
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
          </Button>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-2 whitespace-nowrap overflow-hidden"> {/* Added whitespace-nowrap and overflow-hidden */}
            {/* Display profile image if available, otherwise a placeholder */}
            <img
              src={row.original.profile_image_url || `https://placehold.co/40x40/cccccc/333333?text=${row.original.first_name[0]}`}
              alt={`${row.original.first_name} ${row.original.last_name}`}
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 flex-shrink-0" // Added flex-shrink-0
              onError={(e) => {
                // Fallback to a text placeholder if image fails to load
                e.target.onerror = null;
                e.target.src = `https://placehold.co/40x40/cccccc/333333?text=${row.original.first_name[0]}`;
              }}
            />
            <span className="truncate">{row.original.first_name}</span> {/* Added truncate */}
          </div>
        ),
        enableSorting: true,
        minSize: 180, // Set a minimum size for the column
      },
      {
        accessorKey: "last_name",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center"
          >
            <div className="flex items-center whitespace-nowrap"> {/* Added whitespace-nowrap to prevent header text wrap */}
              Sobrenome
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
          </Button>
        ),
        cell: ({ row }) => (
            <div className="whitespace-nowrap overflow-hidden truncate"> {/* Added whitespace-nowrap, overflow-hidden, truncate */}
                {row.original.last_name}
            </div>
        ),
        enableSorting: true,
        minSize: 180, // Set a minimum size for the column
      },
      {
        accessorKey: "age",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center"
          >
            <div className="flex items-center whitespace-nowrap">
              Idade
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
          </Button>
        ),
        enableSorting: true,
        minSize: 80, // Set a minimum size
      },
      {
        accessorKey: "city",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center"
          >
            <div className="flex items-center whitespace-nowrap">
              Cidade
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
          </Button>
        ),
        enableSorting: true,
        minSize: 150, // Set a minimum size
      },
      {
        accessorKey: "state",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center"
          >
            <div className="flex items-center whitespace-nowrap">
              Estado
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
          </Button>
        ),
        enableSorting: true,
        minSize: 100, // Set a minimum size
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <div className="flex gap-2 whitespace-nowrap"> {/* Added whitespace-nowrap */}
            <Button variant="outline" size="sm" onClick={() => onEdit(row.original)}>
              Editar
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(row.original.id)}>
              Deletar
            </Button>
          </div>
        ),
        enableSorting: false,
        enableColumnFilter: false,
        minSize: 150, // Set a minimum size for actions
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
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      globalFilter,
    },
  });

  return (
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
  );
}
