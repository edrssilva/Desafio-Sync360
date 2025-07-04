import mysql from "mysql2/promise";

// Informações de conexão com o banco não estão públicas no repositório
let connection;
export const createConnection = async () => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
    });
    return connection;
  }
};
