import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(morgan("dev"));



app.use(express.json());

app.get("/api/test", (req, res) => {
    res.send({ message: "test" });
});