import { Router } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

// Correo al que se envían las consultas
const CONTACT_TO = process.env.CONTACT_TO || "jhurtadomije@gmail.com";

// --- FLAG PARA SABER SI PODEMOS USAR SMTP ---
let SMTP_ENABLED = true;

// Configuramos el transporte de nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verificamos el transporte al arrancar
transporter.verify((err) => {
  if (err) {
    console.error("Error configurando SMTP:", err.message);
    // 🔴 Desactivamos SMTP para no volver a intentarlo en cada petición
    SMTP_ENABLED = false;
  } else {
    console.log("SMTP listo para enviar correos");
  }
});

// Ruta para enviar consulta de contacto
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
    const asunto = `[Web Respigares] Nueva solicitud (${tipoFinal})`;

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

    // 🔹 Si el SMTP está desactivado (Railway no puede conectar), solo logueamos y respondemos OK
    if (!SMTP_ENABLED) {
      console.log("[CONTACTO DEMO] Solicitud recibida (sin envío SMTP):", {
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
          "Solicitud recibida correctamente. En breve nos pondremos en contacto contigo.",
      });
    }

    // 🔹 Envío real de correo (cuando SMTP funciona, por ejemplo en local)
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: CONTACT_TO,
      replyTo: email, // para que puedan contestar directamente al cliente
      subject: asunto,
      text,
      html,
    });

    // Respuesta OK al front
    return res.json({ ok: true, message: "Mensaje enviado correctamente" });
  } catch (err) {
    console.error("Error al guardar/enviar contacto", err);

    // ❗ IMPORTANTE: aunque falle el envío, NO devolvemos 500 al usuario final
    return res.json({
      ok: true,
      message:
        "Solicitud recibida correctamente. Hemos tenido un problema al enviar el aviso interno, pero revisaremos tu mensaje.",
    });
  }
});

export default router;
