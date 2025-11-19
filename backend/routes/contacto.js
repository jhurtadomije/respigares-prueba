// backend/routes/contacto.js
import { Router } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

// Correo destino
const CONTACT_TO = process.env.CONTACT_TO || "info@respigares.es";

// Detectar si estamos en Railway (para desactivar SMTP allí si quieres)
const isRailway = Boolean(
  process.env.RAILWAY_ENVIRONMENT ||
  process.env.RAILWAY_PROJECT_ID ||
  process.env.RAILWAY_STATIC_URL
);

// Flag manual para desactivar SMTP (útil en Railway)
const SMTP_DISABLED =
  process.env.SMTP_DISABLED === "true" || isRailway;

let transporter = null;

if (
  !SMTP_DISABLED &&
  process.env.SMTP_HOST &&
  process.env.SMTP_USER &&
  process.env.SMTP_PASS
) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,           // mail.respigares.es
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true", // false -> STARTTLS en 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  transporter.verify((err) => {
    if (err) {
      console.error("Error configurando SMTP, lo desactivamos:", err.message);
      transporter = null;
    } else {
      console.log("SMTP listo para enviar correos");
    }
  });
} else {
  console.log("SMTP desactivado (Railway o SMTP_DISABLED=true). Modo demo sin envío real.");
}

// ------------ POST /api/contacto -------------
router.post("/", async (req, res) => {
  try {
    const {
      tipo,
      producto_sku,
      producto_nombre,
      nombre,
      email,
      telefono,
      empresa,
      mensaje,
    } = req.body;

    if (!nombre || !email || !mensaje) {
      return res.status(400).json({
        ok: false,
        error: "Faltan campos obligatorios (nombre, email, mensaje)",
      });
    }

    const tipoFinal = tipo || "producto";

    const lineasProducto = producto_nombre
      ? `
        <p><strong>Producto:</strong> ${producto_nombre}</p>
        <p><strong>SKU:</strong> ${producto_sku || "N/D"}</p>
      `
      : "";

    const html = `
      <h2>Nueva solicitud de información desde la web</h2>

      ${lineasProducto}

      <h3>Datos de contacto</h3>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${empresa ? `<p><strong>Empresa:</strong> ${empresa}</p>` : ""}
      ${telefono ? `<p><strong>Teléfono:</strong> ${telefono}</p>` : ""}

      <h3>Mensaje</h3>
      <p>${String(mensaje).replace(/\n/g, "<br>")}</p>

      <hr>
      <p style="font-size: 12px; color: #777;">
        Mensaje generado automáticamente desde el formulario de contacto de la web de Respigares.
      </p>
    `;

    const text = `
Nueva solicitud de información desde la web

${producto_nombre ? `Producto: ${producto_nombre}\nSKU: ${producto_sku || "N/D"}\n` : ""}

Datos de contacto
-----------------
Nombre: ${nombre}
Email: ${email}
${empresa ? `Empresa: ${empresa}\n` : ""}
${telefono ? `Teléfono: ${telefono}\n` : ""}

Mensaje
-------
${mensaje}
    `.trim();

    // 👉 Si NO hay transporter (por ejemplo en Railway): MODO DEMO
    if (!transporter) {
      console.log("[CONTACTO DEMO] Solicitud recibida:", {
        tipoFinal,
        producto_sku,
        producto_nombre,
        nombre,
        email,
        telefono,
        empresa,
        mensaje,
      });

      return res.json({
        ok: true,
        demo: true,
        message:
          "Solicitud recibida correctamente (entorno de pruebas: el correo no se ha enviado realmente).",
      });
    }

    // 👉 Envío real de correo (local / servidor con SMTP abierto)
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: CONTACT_TO,
      replyTo: email,
      subject: `[Web Respigares] Nueva solicitud (${tipoFinal})`,
      text,
      html,
    });

    return res.json({ ok: true, demo: false, message: "Mensaje enviado correctamente" });
  } catch (err) {
    console.error("Error al guardar/enviar contacto", err);
    return res.status(500).json({
      ok: false,
      error: "Error al procesar la consulta",
    });
  }
});

export default router;
