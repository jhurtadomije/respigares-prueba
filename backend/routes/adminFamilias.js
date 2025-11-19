// backend/routes/adminFamilias.js
import { Router } from "express";
import { pool } from "../db.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

// 👮 Todas las rutas de aquí requieren token
router.use(authMiddleware);

// GET /api/admin/familias
router.get("/", async (req, res) => {
  try {
    const [fp] = await pool.query(
      `SELECT DISTINCT familia_principal 
       FROM productos 
       WHERE familia_principal IS NOT NULL 
       ORDER BY familia_principal`
    );

    const [f1] = await pool.query(
      `SELECT DISTINCT familia_d1 
       FROM productos 
       WHERE familia_d1 IS NOT NULL 
       ORDER BY familia_d1`
    );

    const [f2] = await pool.query(
      `SELECT DISTINCT familia_d2 
       FROM productos 
       WHERE familia_d2 IS NOT NULL 
       ORDER BY familia_d2`
    );

    const [f3] = await pool.query(
      `SELECT DISTINCT familia_d3 
       FROM productos 
       WHERE familia_d3 IS NOT NULL 
       ORDER BY familia_d3`
    );

    const [f4] = await pool.query(
      `SELECT DISTINCT familia_d4 
       FROM productos 
       WHERE familia_d4 IS NOT NULL 
       ORDER BY familia_d4`
    );

    res.json({
      familia_principal: fp.map((r) => r.familia_principal),
      familia_d1: f1.map((r) => r.familia_d1),
      familia_d2: f2.map((r) => r.familia_d2),
      familia_d3: f3.map((r) => r.familia_d3),
      familia_d4: f4.map((r) => r.familia_d4),
    });
  } catch (err) {
    console.error("Error obteniendo familias:", err);
    res.status(500).json({ error: "Error al obtener familias" });
  }
});

export default router;
