// backend/routes/adminPromociones.js
import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { pool } from "../db.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();
router.use(authMiddleware);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Asegurar carpeta uploads/promos (Multer NO crea carpetas)
const uploadDir = path.join(__dirname, "..", "uploads", "promos");
fs.mkdirSync(uploadDir, { recursive: true });

// Multer
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const safeTitle = (req.body.titulo || "promo")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const ext = path.extname(file.originalname);
    cb(null, `${safeTitle}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

/**
 * GET /api/admin/promociones
 */
router.get("/", async (_, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM promociones ORDER BY destacada DESC, created_at DESC`
    );
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error listando promociones" });
  }
});

/**
 * POST /api/admin/promociones/upload-banner
 * devuelve { path: "/uploads/promos/xxx.webp" }
 */
router.post("/upload-banner", upload.single("banner"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No se recibió archivo banner" });
    }

    // ✅ debug: ruta real donde se guardó
    console.log("✅ Banner guardado en:", req.file.path);

    const pathDb = `/uploads/promos/${req.file.filename}`;
    res.json({ path: pathDb });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: "Error subiendo banner" });
  }
});

/**
 * POST /api/admin/promociones
 */
router.post("/", async (req, res) => {
  try {
    const {
      titulo,
      imagen_banner, // <- único nombre
      fecha_inicio,
      fecha_fin,
      activa = 1,
      destacada = 0,
      cta_texto,
      cta_url,
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO promociones
       (titulo, imagen_banner, fecha_inicio, fecha_fin, activa, destacada, cta_texto, cta_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        titulo?.trim() || "",
        imagen_banner || null,
        fecha_inicio || null,
        fecha_fin || null,
        Number(activa) ? 1 : 0,
        Number(destacada) ? 1 : 0,
        cta_texto?.trim() || null,
        cta_url?.trim() || null,
      ]
    );

    const [[row]] = await pool.query(
      `SELECT * FROM promociones WHERE id=?`,
      [result.insertId]
    );
    res.status(201).json(row);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error creando promoción" });
  }
});

/**
 * PUT /api/admin/promociones/:id
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const fields = {
      titulo: req.body.titulo?.trim() || "",
      imagen_banner: req.body.imagen_banner || null,
      fecha_inicio: req.body.fecha_inicio || null,
      fecha_fin: req.body.fecha_fin || null,
      activa: Number(req.body.activa) ? 1 : 0,
      destacada: Number(req.body.destacada) ? 1 : 0,
      cta_texto: req.body.cta_texto?.trim() || null,
      cta_url: req.body.cta_url?.trim() || null,
    };

    await pool.query(`UPDATE promociones SET ? WHERE id = ?`, [fields, id]);
    const [[row]] = await pool.query(
      `SELECT * FROM promociones WHERE id=?`,
      [id]
    );
    res.json(row);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error actualizando promoción" });
  }
});

/**
 * DELETE /api/admin/promociones/:id
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(`DELETE FROM promociones WHERE id=?`, [id]);
    res.status(204).send();
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error borrando promoción" });
  }
});

export default router;
