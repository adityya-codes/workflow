import express from "express";

const app = express();
app.use(express.json());

app.post("/", (req, res) => {
    console.log(req.body);
    res.send("Hello World!");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});