import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "perntodo_db",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

export default pool;
