import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken";
import type { IUser } from "../users/user.interface";
import config from "../../config";

const autherviceIntoDB = async (payload: IUser) => {
  const { name, email, password } = payload;

  const user = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [email],
  );

  if (!user) {
    throw new Error("Invalid creadentials!");
  }

  const matchPassword = await bcrypt.compare(password, user.rows[0].password);
  if (!matchPassword) {
    throw new Error("Invalid creadentials!");
  }

  if (!user.rows[0].is_active) {
    throw new Error("Access denied!");
  }

//   const jwtPayload = {
//     id: user.rows[0].id,
//     name: user.rows[0].name,
//     email: user.rows[0].email,
//   };

  const accessToken = jwt.sign(user.rows[0], config.jwt_secret, {
    expiresIn: "1d",
  });

  delete user.rows[0].password;

  return {accessToken, user: user.rows[0]};
};

export const authServices = {
  autherviceIntoDB,
};
