import express from "express";
import { connect } from "./service/data/connect.mjs";
import { read, set, update } from "./service/data/dataManager.mjs";
import cors from "cors";

const app = express();

const PORT = 3000;
const collection = "User-Data";

app.use(
  cors({
    origin: "http://localhost:5173", // your Vite dev server
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.get("/users", async (req, res, userName, password) => {
  const users = await read(collection);
  for (var user in users) {
    if (user["name"] === userName) {
      if (user["password"] == password) {
        res = true;
      } else {
        res = false;
      }
    } else {
      res = false;
    }
  }
  res = false;
});

app.post("/login", async (req, res) => {
  const users = await read(collection);
  const userName = req.body.userName;
  const password = req.body.password;
  console.log(userName);
  console.log(password);
  for (var user of users) {
    if (user.name === userName) {
      if (user.password == password) {
        return res.json({ userName: true, password: true, success: true });
      } else {
        null;
      }
    } else {
      null;
    }
  }
  return res.json({ userName: false, password: false, success: false });
});

app.listen(PORT, () => {
  console.log("running on port 3000");
});
