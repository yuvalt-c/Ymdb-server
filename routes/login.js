import express from "express";
import { connect } from "../src/server/service/data/connect.mjs";
import { read, set, update } from "../src/server/service/data/dataManager.mjs";
import jwt from "jsonwebtoken";
import { getToken } from "../src/server/service/jwt/jwt.js";

const router = express.Router();
const collection = "User-Data";
router.post("/", async (req, res) => {
  const users = await read(collection);
  const userName = req.body.userName;
  const password = req.body.password;
  console.log(userName);
  console.log(password);
  for (var user of users) {
    if (user.name === userName) {
      if (user.password == password) {
        const accessToken = getToken(userName);
        return res.json({ success: true, accessToken: accessToken });
      } else {
        null;
      }
    } else {
      null;
    }
  }
  return res.json(false);
});

export default router;
