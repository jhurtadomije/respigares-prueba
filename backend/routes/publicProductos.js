//backend\routes\publicProductos.js
import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// Listado público
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, sku, nombre, familia_principal, familia_d1,
              familia_d2, familia_d3, familia_d4,
              marca, proveedor, slug, imagen
       FROM productos
       WHERE activo = 1
       ORDER BY nombre`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// Detalle por slug
router.get("/slug/:slug", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM productos WHERE slug = ? AND activo = 1",
      [req.params.slug]
    );
    if (!rows.length) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener producto" });
  }
});

export default router;
