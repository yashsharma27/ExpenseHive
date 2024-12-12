import { Router } from "express";
import bcrypt from "bcrypt";
import prisma from "../config/prisma";
import { generateToken } from "../utils/generateToken";

const router = Router();

// SignUp Route
router.post("/signup", async (req: any, res: any) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/signin", async (req: any, res: any) => {
  try {
    const {email,password} = req.body
  const user = await prisma.user.findUnique({
    where : {email},
  })

  if(!user){
    return res.status(400).json({message : "Invalid Credentials"})
  }

  const passwordMatch = await bcrypt.compare(password, user.password)
  if(!passwordMatch){
    res.status(404).json({message : "Invalid Credentials"})
  }

  const token = generateToken(email)
  res.cookie("token", token, {
    httpOnly: true, // Secure against client-side access
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
  });

  res.status(200).json({
    message: "Sign-in successful",
    user: { id: user.id, username: user.username, email: user.email },
  });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }

});

router.post("/logout", (req: any, res: any) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "strict" });
  res.status(200).json({ message: "Logged out successfully" });
});


export default router;
