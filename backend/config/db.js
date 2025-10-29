import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

let db;

try {
  // First connect WITHOUT specifying a database
  const connection = await mysql.createConnection({
    host: DB_HOST || "localhost",
    user: DB_USER || "root",
    password: DB_PASS || "",
  });

  // Create database if it doesn't exist
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
  console.log(`Database "${DB_NAME}" checked/created.`);

  // Connect to the newly created database
  db = await mysql.createConnection({
    host: DB_HOST || "localhost",
    user: DB_USER || "root",
    password: DB_PASS || "",
    database: DB_NAME,
  });

  console.log("Connected to MariaDB (XAMPP) and database ready.");
} catch (err) {
  console.error("Database connection/creation failed:", err);
}

export default db;
  