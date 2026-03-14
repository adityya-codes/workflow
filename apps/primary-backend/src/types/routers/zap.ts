import { Router } from "express";

const router = Router();

router.post("/create", (req, res) => {
    const { username, password, name } = req.body;
    
})

export const zapRouter : Router = router;