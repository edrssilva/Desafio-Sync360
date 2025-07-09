"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Import Input for global filter
import CreateUserModal from "@/components/create-user-modal";
import EditUserModal from "@/components/edit-user-modal";
import UsersTable from "@/components/users-table";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(""); // State for global filter

  // Using a ref for isFetching to prevent stale closures in useCallback
  // and ensure it's always up-to-date across renders without being a dependency.
  const isFetchingRef = useState(false);

  const fetchUsers = useCallback(async () => {
    if (isFetchingRef.current) return; // Check the current value of the ref
    isFetchingRef.current = true; // Set ref to true to indicate fetching
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      // Ensure data is an array before setting state
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error("API did not return an array for users:", data);
        setUsers([]); // Fallback to an empty array
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setUsers([]); // Ensure users is an empty array on error
    } finally {
      isFetchingRef.current = false; // Reset ref after fetch completes
    }
  }, []); // No dependencies needed for isFetchingRef.current

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEdit = useCallback((user) => setEditUser(user), []);
  const handleDelete = useCallback(async (id) => {
    // Replace confirm with a custom modal for better UX and consistency
    // For this example, we'll use a simple console log, but in a real app,
    // you'd render a custom confirmation dialog component.
    console.log("Would normally show a custom confirmation modal here.");
    // Example of a simple confirmation (for demonstration, avoid in production)
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        const res = await fetch(`/api/users?id=${id}`, { method: "DELETE" });
        if (res.ok) {
          fetchUsers();
        } else {
          console.error("Failed to delete user:", await res.text());
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  }, [fetchUsers]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 p-8 font-sans antialiased">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-foreground leading-tight">
          Gerenciamento de Usuários
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Um sistema de gerenciamento simples para para administrar seus usuários.
        </p>
      </header>

      <main className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-8 lg:p-12">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <Button
            onClick={() => setCreateOpen(true)}
            className="w-full sm:w-auto"
          >
            Adicionar novo usuário
          </Button>
          <Input
            placeholder="Filtrar usuários..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="w-full sm:w-auto"
          />
        </div>

        <UsersTable
          users={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />

        <CreateUserModal
          open={createOpen}
          onClose={() => setCreateOpen(false)}
          onSaved={() => {
            fetchUsers();
            setCreateOpen(false);
          }}
        />

        {editUser && (
          <EditUserModal
            user={editUser}
            onClose={() => setEditUser(null)}
            onSaved={() => {
              fetchUsers();
              setEditUser(null);
            }}
          />
        )}
      </main>

      <footer className="text-center mt-12 text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Gerenciamento de Usuários. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
