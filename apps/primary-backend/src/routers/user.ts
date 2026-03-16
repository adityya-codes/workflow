import { Router } from "express";
import { SigninSchema, SignupSchema } from "../types";
import prisma from "@repo/db";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware";

const router = Router();

router.post("/signup", async (req, res) => {
  const body = req.body;
  const parsedData = SignupSchema.safeParse(body);
  if (!parsedData.success) {
    return res.status(400).json({
      message: "Invalid data",
    });
  }

  const userExits = await prisma.user.findFirst({
    where: {
      email: parsedData.data.username,
    },
  });

  if (userExits) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  await prisma.user.create({
    data: {
      name: parsedData.data.name,
      email: parsedData.data.username,
      password: parsedData.data.password,
    },
  });

  return res.status(200).json({
    message: "User created successfully",
  });
});

router.post("/signin", async (req, res) => {
 const body = req.body;
  const parsedData = SigninSchema.safeParse(body);
  if (!parsedData.success){
    return res.status(400).json({
      message: "Invalid data",
    });
  }

  const user = await prisma.user.findFirst({
    where: {
      email: parsedData.data.username,
      password: parsedData.data.password,
    },
  });

  if (!user) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }
   

  const token = jwt.sign({
    id: user.id
  }, process.env.JWT_SECRET || "secret", {
    expiresIn: "1d"
  })

  return res.status(200).json({
    message: "User signed in successfully",
    token,
  })

})

router.get("/", authMiddleware, async (req, res) => { 
  const id = (req as any).userId;

  const user = await prisma.user.findFirst({
    where: {
      id: id
    },
    select: {
      name: true,
      email: true,
    }
  })

  return res.status(200).json({
    message: "User fetched successfully",
    user,
  })

});

export const userRouter: Router = router;
