import { createConnection } from "@/lib/database.js";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const db = await createConnection();
    const sql = "SELECT * FROM users";
    const [users] = await db.query(sql);
    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const connection = await createConnection();
  const {
    profile_image_url,
    first_name,
    last_name,
    birth_date,
    street,
    neighborhood,
    city,
    state,
    biography,
  } = await request.json();

  const [result] = await connection.query(
    `INSERT INTO users (
      profile_image_url, first_name, last_name, birth_date,
      street, neighborhood, city, state, biography
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      profile_image_url || null,
      first_name,
      last_name,
      birth_date,
      street,
      neighborhood,
      city,
      state,
      biography || null,
    ]
  );

  return new NextResponse(JSON.stringify({ id: result.insertId }), {
    status: 201,
  });
}

export async function PUT(request) {
  const connection = await createConnection();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const {
    profile_image_url,
    first_name,
    last_name,
    birth_date,
    street,
    neighborhood,
    city,
    state,
    biography,
  } = await request.json();

  const [result] = await connection.query(
    `UPDATE users SET 
      profile_image_url = ?, first_name = ?, last_name = ?, birth_date = ?,
      street = ?, neighborhood = ?, city = ?, state = ?, biography = ?
     WHERE id = ?`,
    [
      profile_image_url || null,
      first_name,
      last_name,
      birth_date,
      street,
      neighborhood,
      city,
      state,
      biography || null,
      id,
    ]
  );

  return new NextResponse(
    JSON.stringify({ affectedRows: result.affectedRows }),
    {
      status: 200,
    }
  );
}

export async function DELETE(request) {
  const connection = await createConnection();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const [result] = await connection.query(`DELETE FROM users WHERE id = ?`, [
    id,
  ]);

  return new NextResponse(
    JSON.stringify({ deleted: result.affectedRows > 0 }),
    {
      status: 200,
    }
  );
}