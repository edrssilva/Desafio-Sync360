"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import CreateUserModal from "@/components/create-user-modal";
import EditUserModal from "@/components/edit-user-modal";
import UsersTable from "@/components/users-table";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  let isFetching = false;
  const fetchUsers = useCallback(async () => {
    if (isFetching) return;
    isFetching = true;
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } finally {
      isFetching = false;
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEdit = useCallback((user) => setEditUser(user), []);
  const handleDelete = useCallback(async (id) => {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      await fetch(`/api/users?id=${id}`, { method: "DELETE" });
      fetchUsers();
    }
  }, [fetchUsers]);

  return (
    <main className="p-8">
      <Button onClick={() => setCreateOpen(true)}>Adicionar usuário</Button>

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

      <UsersTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </main>
  );
}
