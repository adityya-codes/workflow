import express from "express";
import { userRouter } from "./types/routers/user";  
import { zapRouter } from "./types/routers/zap";

const app = express();

app.use(express.json());

app.post("/api/v1/user/signup", userRouter);
app.post("/api/v1/zap/create", zapRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})