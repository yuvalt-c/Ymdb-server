import jwt from "jsonwebtoken";

export function authenticateToken(req, res) {
  console.log("req", req);
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  const token = authHeader;
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    return res.json({ authorization: true });
  });
}

export const getToken = (userName) => {
  const user = { name: userName };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  return accessToken;
};
