// backend/routes/adminProductos.js
import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { authMiddleware } from "../middleware/auth.js";
import { pool } from "../db.js";
import fs from "fs";

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar subida de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    const sku = (req.body.sku || "sin-sku").replace(/[^\w-]+/g, "");
    const ext = path.extname(file.originalname);
    cb(null, `${sku}${ext}`);
  },
});

const upload = multer({ storage });

function slugify(text) {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// -----------------------------------
// Todas estas rutas requieren login
// -----------------------------------
router.use(authMiddleware);

/**
 * Opciones de familias para los selects del panel
 * GET /api/admin/productos/familias
 */
router.get("/familias", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT familia_principal, familia_d1, familia_d2, familia_d3, familia_d4
       FROM productos`
    );

    const sets = {
      familia_principal: new Set(),
      familia_d1: new Set(),
      familia_d2: new Set(),
      familia_d3: new Set(),
      familia_d4: new Set(),
    };

    for (const r of rows) {
      if (r.familia_principal) sets.familia_principal.add(r.familia_principal);
      if (r.familia_d1) sets.familia_d1.add(r.familia_d1);
      if (r.familia_d2) sets.familia_d2.add(r.familia_d2);
      if (r.familia_d3) sets.familia_d3.add(r.familia_d3);
      if (r.familia_d4) sets.familia_d4.add(r.familia_d4);
    }

    res.json({
      familia_principal: Array.from(sets.familia_principal).sort(),
      familia_d1: Array.from(sets.familia_d1).sort(),
      familia_d2: Array.from(sets.familia_d2).sort(),
      familia_d3: Array.from(sets.familia_d3).sort(),
      familia_d4: Array.from(sets.familia_d4).sort(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener opciones de familias" });
  }
});

// Listado admin
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM productos ORDER BY nombre");

    const uploadsBase = path.join(__dirname, ".."); // carpeta base del backend

    const rowsConFlag = rows.map((row) => {
      let tieneImagen = false;

      if (row.imagen) {
        // row.imagen suele ser del estilo "/uploads/sku.jpg"
        const relativePath = row.imagen.startsWith("/")
          ? row.imagen.slice(1) // "uploads/sku.jpg"
          : row.imagen;

        const absPath = path.join(uploadsBase, relativePath);

        try {
          tieneImagen = fs.existsSync(absPath);
        } catch {
          tieneImagen = false;
        }
      }

      return {
        ...row,
        tiene_imagen: !!tieneImagen, // 👈 boolean claro
      };
    });

    res.json(rowsConFlag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// Crear producto
router.post("/", upload.single("imagen"), async (req, res) => {
  try {
    const {
      sku,
      nombre,
      u_caja,
      nombre_familia,
      codigo_marca,
      marca,
      codigo_proveedor,
      proveedor,
      familia_principal,
      familia_d1,
      familia_d2,
      familia_d3,
      familia_d4,
      activo,
    } = req.body;

    const imagen = req.file ? `/uploads/${req.file.filename}` : null;
    const slug = slugify(nombre);

    const [result] = await pool.query(
      `INSERT INTO productos
       (sku, nombre, u_caja, nombre_familia, codigo_marca, marca,
        codigo_proveedor, proveedor, familia_principal, familia_d1,
        familia_d2, familia_d3, familia_d4, slug, imagen, activo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        sku,
        nombre,
        u_caja || null,
        nombre_familia || null,
        codigo_marca || null,
        marca || null,
        codigo_proveedor || null,
        proveedor || null,
        familia_principal || null,
        familia_d1 || null,
        familia_d2 || null,
        familia_d3 || null,
        familia_d4 || null,
        slug,
        imagen,
        activo ? 1 : 0,
      ]
    );

    const [rows] = await pool.query(
      "SELECT * FROM productos WHERE id = ?",
      [result.insertId]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear producto" });
  }
});

// Actualizar producto
router.put("/:id", upload.single("imagen"), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      sku,
      nombre,
      u_caja,
      nombre_familia,
      codigo_marca,
      marca,
      codigo_proveedor,
      proveedor,
      familia_principal,
      familia_d1,
      familia_d2,
      familia_d3,
      familia_d4,
      activo,
    } = req.body;

    const fields = {
      sku,
      nombre,
      u_caja: u_caja || null,
      nombre_familia: nombre_familia || null,
      codigo_marca: codigo_marca || null,
      marca: marca || null,
      codigo_proveedor: codigo_proveedor || null,
      proveedor: proveedor || null,
      familia_principal: familia_principal || null,
      familia_d1: familia_d1 || null,
      familia_d2: familia_d2 || null,
      familia_d3: familia_d3 || null,
      familia_d4: familia_d4 || null,
      activo: activo ? 1 : 0,
      slug: slugify(nombre),
    };

    if (req.file) {
      fields.imagen = `/uploads/${req.file.filename}`;
    }

    const [result] = await pool.query(
      "UPDATE productos SET ? WHERE id = ?",
      [fields, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const [rows] = await pool.query(
      "SELECT * FROM productos WHERE id = ?",
      [id]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar producto" });
  }
});

// Eliminar
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM productos WHERE id = ?",
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
});

export default router;
