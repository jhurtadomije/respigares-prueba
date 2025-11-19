import { Router} from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";   

dotenv.config();

const router = Router();

// Correo al que se envían las consultas
const CONTACT_TO = process.env.CONTACT_TO || "jhurtadomije@gmail.com";

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

transporter.verify((err) => {
    if (err) {
        console.error("Error configurando SMTP:", err.message);
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
        error: "Faltan campos obligatorios (nombre, email, mensaje)",
      });
    }

    const tipoFinal = tipo || "producto";
    // 1) Enviar email al responsable
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
      <p>${mensaje.replace(/\n/g, "<br>")}</p>

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

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: CONTACT_TO,
      replyTo: email, // para que puedan contestar directamente al cliente
      subject: asunto,
      text,
      html,
    });

    // 2) Respuesta OK al front
    res.json({ ok: true });
  } catch (err) {
    console.error("Error al guardar/enviar contacto", err);
    res.status(500).json({ error: "Error al procesar la consulta" });
  }
});

export default router;