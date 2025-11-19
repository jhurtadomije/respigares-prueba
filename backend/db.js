import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host:     process.env.DB_HOST || process.env.MYSQLHOST,
  user:     process.env.DB_USER || process.env.MYSQLUSER,
  password: process.env.DB_PASS || process.env.MYSQLPASSWORD,
  database: process.env.DB_NAME || process.env.MYSQLDATABASE,
  port:     process.env.DB_PORT || process.env.MYSQLPORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.query("SELECT 1").then(() => {
  console.log("MySQL conectado correctamente");
}).catch(err => {
  console.error("Error conectando a MySQL:", err.message);
  // NO hagas process.exit aquí, solo log para ver qué falla
});

export default pool;