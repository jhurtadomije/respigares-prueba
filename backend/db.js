// backend/db.js
import mysql from "mysql2/promise";

// Normalizamos host y puerto por si DB_HOST viene como "host:puerto"
let host =
  process.env.DB_HOST ||
  process.env.MYSQLHOST ||
  "localhost";

let port =
  process.env.DB_PORT ||
  process.env.MYSQLPORT ||
  3306;

// Si alguien ha puesto "crossover.proxy.rlwy.net:59545" en DB_HOST, lo partimos
if (host && host.includes(":")) {
  const [h, p] = host.split(":");
  host = h;
  if (!process.env.DB_PORT && !process.env.MYSQLPORT && p) {
    port = p;
  }
}

console.log("Config MySQL:", { host, port });

export const pool = mysql.createPool({
  host,
  user:     process.env.DB_USER      || process.env.MYSQLUSER,
  password: process.env.DB_PASS      || process.env.MYSQLPASSWORD,
  database: process.env.DB_NAME      || process.env.MYSQLDATABASE,
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
