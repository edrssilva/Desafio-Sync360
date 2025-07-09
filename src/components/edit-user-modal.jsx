"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

const estados = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS",
  "MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC",
  "SP","SE","TO"
];

export default function EditUserModal({ user, onClose, onSaved }) {
  const [form, setForm] = useState(user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(user);
  }, [user]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await fetch(`/api/users?id=${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    onSaved();
  }

  return (
    <Dialog open={!!user} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar usuário</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label>Nome</Label>
            <Input name="first_name" value={form.first_name} onChange={handleChange} required />
          </div>

          <div>
            <Label>Sobrenome</Label>
            <Input name="last_name" value={form.last_name} onChange={handleChange} required />
          </div>

          <div>
            <Label>Data de Nascimento</Label>
            <Input type="date" name="birth_date" value={form.birth_date} onChange={handleChange} required />
          </div>

          <div>
            <Label>Imagem de Perfil (URL)</Label>
            <Input name="profile_image_url" value={form.profile_image_url} onChange={handleChange} />
          </div>

          <div>
            <Label>Rua</Label>
            <Input name="street" value={form.street} onChange={handleChange} required />
          </div>

          <div>
            <Label>Bairro</Label>
            <Input name="neighborhood" value={form.neighborhood} onChange={handleChange} required />
          </div>

          <div>
            <Label>Cidade</Label>
            <Input name="city" value={form.city} onChange={handleChange} required />
          </div>

          <div>
            <Label>Estado</Label>
            <Select value={form.state} onValueChange={(value) => setForm({ ...form, state: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um estado" />
              </SelectTrigger>
              <SelectContent>
                {estados.map((uf) => (
                  <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Biografia</Label>
            <Textarea name="biography" value={form.biography} onChange={handleChange} />
          </div>

          <div className="flex justify-between pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="ghost">Cancelar</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
