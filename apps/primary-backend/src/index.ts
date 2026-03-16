import express from "express";
import { userRouter } from "./routers/user";
import { zapRouter } from "./routers/zap";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/zap", zapRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})  