// backend/db.js
import mysql from "mysql2/promise";

// Sacamos host y port a variables para poder loguearlas y reutilizarlas
const host =
  process.env.DB_HOST ||
  process.env.MYSQLHOST;

const port =
  Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306);

// (Opcional, pero muy útil para ver en Railway qué está usando)
console.log("Config MySQL:", {
  host,
  port,
  database: process.env.DB_NAME || process.env.MYSQLDATABASE,
  user: process.env.DB_USER || process.env.MYSQLUSER,
});

// Creamos el pool usando vars locales o de Railway
export const pool = mysql.createPool({
  host,
  user: process.env.DB_USER || process.env.MYSQLUSER,
  password: process.env.DB_PASS || process.env.MYSQLPASSWORD,
  database: process.env.DB_NAME || process.env.MYSQLDATABASE,
  port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Prueba rápida al arrancar (solo logs, sin tumbar el proceso)
pool
  .query("SELECT 1")
  .then(() => {
    console.log("MySQL conectado correctamente");
  })
  .catch((err) => {
    console.error("Error conectando a MySQL:", err.message);
  });
