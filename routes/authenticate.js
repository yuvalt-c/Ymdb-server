import express from "express";
import { authenticateToken } from "../src/server/service/jwt/jwt.js";

const router = express.Router();
router.get("/", async (req, res) => {
  return await authenticateToken(req, res);
});

export default router;
