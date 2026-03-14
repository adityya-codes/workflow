import { Router } from "express";

const router = Router();

router.post("/signup", (req, res) => {
    const { username, password, name } = req.body;
    
})

export const userRouter : Router = router;