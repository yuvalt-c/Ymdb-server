import express from "express";
import { connect } from "../src/server/service/data/connect.mjs";
import { read, set, update } from "../src/server/service/data/dataManager.mjs";

const router = express.Router();
const collection = "User-Data";
router.post("/", async (req, res) => {
  const users = await read(collection);
  const userName = req.body.userName;
  const password = req.body.password;
  const doc = { name: userName, password: password };
  console.log(userName);
  console.log(password);
  for (var user of users) {
    if (user.name === userName) {
      return res.json(false);
    }
  }
  await set(collection, doc);
  console.log(`${userName} has been added to the database!`);
  return res.json(true);
});

export default router;
