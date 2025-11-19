//backend\server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import adminProductosRoutes from "./routes/adminProductos.js";
import publicProductosRoutes from "./routes/publicProductos.js";
import adminFamiliasRoutes from "./routes/adminFamilias.js";
import contactRoutes from "./routes/contacto.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS (solo necesitas esto mientras el front vaya con Vite en 5173)
if (process.env.CORS_ORIGIN) {
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN.split(","),
    })
  );
}

app.use(express.json());

// Servir imágenes subidas
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rutas API
app.use("/api/auth", authRoutes);
app.use("/api/admin/productos", adminProductosRoutes);
app.use("/api/admin/familias", adminFamiliasRoutes);
app.use("/api/productos", publicProductosRoutes);
app.use("/api/contacto", contactRoutes);

// Más adelante aquí añadiremos el build de Vue para producción

app.listen(PORT, () => {
  console.log(`Backend Respigares escuchando en http://localhost:${PORT}`);
});
