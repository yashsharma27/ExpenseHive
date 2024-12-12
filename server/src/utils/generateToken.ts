import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); 
const JWT_SECRET = process.env.JWT_SECRET || "kfdcvyujnuytfvbnjkplkmnbvcx"

export const generateToken = (email: string): string => {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" }); // Replace with env variable in production
};
