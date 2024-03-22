import jwt from "jsonwebtoken";

import { JWTSecret } from "..";

// @ts-ignore
export const verifyAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Format: "Bearer TOKEN"

  if (token == null) {
    return res.sendStatus(401);
  }

  // @ts-ignore
  jwt.verify(token, JWTSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;

    next();
  });
};
