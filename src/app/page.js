"use client";
import { useEffect } from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("/api/users");
        const response = await data.json();
        console.log(response);
        setUsers(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const [form, setForm] = useState({
    profile_image_url: "",
    first_name: "",
    last_name: "",
    birth_date: "",
    street: "",
    neighborhood: "",
    city: "",
    state: "",
    biography: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      let data;
      try {
        data = await res.json(); // ✅ lido uma única vez
      } catch {
        data = { error: "Resposta inválida do servidor." };
      }

      if (res.ok) {
        setSuccess(true);
        setForm({
          profile_image_url: "",
          first_name: "",
          last_name: "",
          birth_date: "",
          street: "",
          neighborhood: "",
          city: "",
          state: "",
          biography: "",
        });
      } else {
        alert("Erro ao cadastrar: " + (data?.error || "Erro inesperado."));
      }
    } catch (err) {
      console.error(err);
      alert("Erro inesperado ao enviar o formulário.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 p-4">
        <div>
          <Label htmlFor="first_name">Nome</Label>
          <Input
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="last_name">Sobrenome</Label>
          <Input
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="birth_date">Data de Nascimento</Label>
          <Input
            type="date"
            name="birth_date"
            value={form.birth_date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="profile_image_url">URL da Imagem de Perfil</Label>
          <Input
            name="profile_image_url"
            value={form.profile_image_url}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="street">Rua</Label>
          <Input
            name="street"
            value={form.street}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="neighborhood">Bairro</Label>
          <Input
            name="neighborhood"
            value={form.neighborhood}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="city">Cidade</Label>
          <Input
            name="city"
            value={form.city}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="state">Estado (UF)</Label>
          <Select
            value={form.state}
            onValueChange={(value) => setForm({ ...form, state: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AC">Acre</SelectItem>
              <SelectItem value="AL">Alagoas</SelectItem>
              <SelectItem value="AP">Amapá</SelectItem>
              <SelectItem value="AM">Amazonas</SelectItem>
              <SelectItem value="BA">Bahia</SelectItem>
              <SelectItem value="CE">Ceará</SelectItem>
              <SelectItem value="DF">Distrito Federal</SelectItem>
              <SelectItem value="ES">Espírito Santo</SelectItem>
              <SelectItem value="GO">Goiás</SelectItem>
              <SelectItem value="MA">Maranhão</SelectItem>
              <SelectItem value="MT">Mato Grosso</SelectItem>
              <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
              <SelectItem value="MG">Minas Gerais</SelectItem>
              <SelectItem value="PA">Pará</SelectItem>
              <SelectItem value="PB">Paraíba</SelectItem>
              <SelectItem value="PR">Paraná</SelectItem>
              <SelectItem value="PE">Pernambuco</SelectItem>
              <SelectItem value="PI">Piauí</SelectItem>
              <SelectItem value="RJ">Rio de Janeiro</SelectItem>
              <SelectItem value="RN">Rio Grande do Norte</SelectItem>
              <SelectItem value="RS">Rio Grande do Sul</SelectItem>
              <SelectItem value="RO">Rondônia</SelectItem>
              <SelectItem value="RR">Roraima</SelectItem>
              <SelectItem value="SC">Santa Catarina</SelectItem>
              <SelectItem value="SP">São Paulo</SelectItem>
              <SelectItem value="SE">Sergipe</SelectItem>
              <SelectItem value="TO">Tocantins</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="biography">Biografia</Label>
          <Textarea
            name="biography"
            value={form.biography}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Cadastrar"}
        </Button>

        {success && (
          <p className="text-green-600">Usuário cadastrado com sucesso!</p>
        )}
      </form>
    </div>
  );
}
