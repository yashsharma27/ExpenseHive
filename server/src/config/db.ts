import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

// Initialize the connection using the DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

export default pool;
