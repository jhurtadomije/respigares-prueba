//backend\routes\auth.js
import { Router } from "express";
import dotenv from "dotenv";
import { generateToken } from "../middleware/auth.js";

dotenv.config();

const router = Router();
const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASS = process.env.ADMIN_PASS || "admin123";

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== ADMIN_USER || password !== ADMIN_PASS) {
    return res.status(401).json({ error: "Credenciales incorrectas" });
  }

  const token = generateToken({ username });
  res.json({ token });
});

export default router;
