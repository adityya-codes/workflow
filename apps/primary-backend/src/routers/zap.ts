import { Router } from "express";

const router = Router();

router.post("/create", (req, res) => {
    const { username, password, name } = req.body;
    
})

router.get("/zaps", (req, res) => {
    
})

router.get("/zap/:id", (req, res) => {
    
})

router.post("/zap/:id/trigger", (req, res) => {
    
})

export const zapRouter : Router = router;