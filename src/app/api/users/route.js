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
