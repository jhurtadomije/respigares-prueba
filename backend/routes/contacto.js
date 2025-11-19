import { Router } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

// Correo al que se envían las consultas
const CONTACT_TO = process.env.CONTACT_TO || "jhurtadomije@gmail.com";

// ------------- CONFIGURACIÓN SMTP -------------
let transporter = null;

// Solo montamos el transporter si hay config mínima
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true", // true normalmente solo con 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  transporter.verify((err) => {
    if (err) {
      console.error(
        "Error configurando SMTP, desactivamos envío real:",
        err.message
      );
      transporter = null; // 🔴 en caso de fallo, NO usaremos SMTP
    } else {
      console.log("SMTP listo para enviar correos");
    }
  });
} else {
  console.warn("SMTP no configurado: modo demo (sin envío real de email)");
}

// ------------- RUTA POST /api/contacto -------------
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

    // 🔹 MODO DEMO: sin transporter (o con error previo en verify)
    if (!transporter) {
      console.log("[CONTACTO DEMO] Datos recibidos:", {
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
        message:
          "Solicitud recibida correctamente (modo demo: el correo no se ha enviado porque el SMTP no está configurado en el servidor).",
      });
    }

    // 🔹 Envío real de correo (cuando SMTP funcione)
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: CONTACT_TO,
      replyTo: email,
      subject: `[Web Respigares] Nueva solicitud (${tipoFinal})`,
      text,
      html,
    });

    return res.json({ ok: true, message: "Mensaje enviado correctamente" });
  } catch (err) {
    console.error("Error al procesar contacto", err);

    // Incluso aquí podemos evitar el 500 “duro” y devolver info controlada:
    return res.status(500).json({
      ok: false,
      error: "Error al procesar la consulta de contacto en el servidor.",
    });
  }
});

export default router;
