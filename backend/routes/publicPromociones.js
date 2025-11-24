// backend/routes/publicPromociones.js
import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

/**
 * GET /api/promociones
 * Solo activas y en fecha
 */
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT *
      FROM promociones
      WHERE activa = 1
        AND (fecha_inicio IS NULL OR fecha_inicio <= CURDATE())
        AND (fecha_fin IS NULL OR fecha_fin >= CURDATE())
      ORDER BY destacada DESC, created_at DESC
    `);

    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error cargando promociones" });
  }
});

/**
 * ✅ GET /api/promociones/all
 * Historial completo (BLOG)
 */
router.get("/all", async (_req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT *
      FROM promociones
      ORDER BY destacada DESC, created_at DESC
    `);
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error cargando historial de promociones" });
  }
});

export default router;
