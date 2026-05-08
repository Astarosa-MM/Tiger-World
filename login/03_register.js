import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";

router.post("/register", async (req, res) => {
  const db = req.app.locals.db;
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    await db.execute(
      "INSERT INTO `users` (email, password_hash) VALUES (?, ?)",
      [email.trim(), hash]
    );

    res.status(201).json({ message: "Account created" });

  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "Email already exists" });
    }

    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}); 

export default router;