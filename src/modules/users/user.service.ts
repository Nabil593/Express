import { pool } from "../../db";
import type { IUser } from "./user.interface";
import bcrypt from "bcryptjs";

const createUserintoDB = async (payload: IUser) => {
  const { name, email, password, age, role } = payload;

  const hasPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
      INSERT INTO users (name, email, password, age, role) VALUES ($1, $2, $3, $4, COALESCE($5, 'user')) RETURNING *`,
    [name, email, hasPassword, age, role],
  );
  return result;
};

const getAllUserintoDB = async () => {
  const result = await pool.query(`
      SELECT * FROM users
      `);

  return result;
};

const getSingleUserService = async (id: number) => {
  const result = await pool.query(
    `
      SELECT * FROM users WHERE id=$1
      `,
    [id],
  );

  return result;
};

const updateUserService = async (id: number, payload: IUser) => {
  const { name, password, age, is_active } = payload;

  const result = await pool.query(
    `
          UPDATE users
          SET
          name = COALESCE($1, name),
          password = COALESCE($2, password),
          age = COALESCE($3, age),
          is_active = COALESCE($4, is_active)
          WHERE id=$5 RETURNING *
          `,
    [name ?? null, password ?? null, age ?? null, is_active ?? null, id],
  );

  return result;
};

const deleteUserService = async (id: number) => {
  const result = await pool.query(
    `
      DELETE FROM users WHERE id=$1
      `,
    [id],
  );

  return result;
};

export const userService = {
  createUserintoDB,
  getAllUserintoDB,
  getSingleUserService,
  updateUserService,
  deleteUserService,
};
