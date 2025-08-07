import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import loginRoute from "../../routes/login.js";
import signupRoute from "../../routes/signup.js";
import authenticateRoute from "../../routes/authenticate.js";

const app = express();

const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:5173", // your Vite dev server
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use("/login", loginRoute);

app.use("/signup", signupRoute);

app.use("/authenticate", authenticateRoute);
app.listen(PORT, () => {
  console.log("running on port 3000");
});
