import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(404).json({
      success: false,
      message: "Unauthorized Access",
    });
  }

  const decode = jwt.verify(token as string, config.jwt_secret) as JwtPayload;

  const user = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [decode.email],
  );

  if (user.rowCount === 0) {
    res.status(404).json({
      success: false,
      message: "User not found!",
    });
  }

  if (!user.rows[0].is_active) {
    res.status(404).json({
      success: false,
      message: "Access denied!",
    });
  }

  next();
};

export default auth;
