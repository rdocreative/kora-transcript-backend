import express from "express";
import cors from "cors";
import transcribeRoute from "./routes/transcribe.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/transcribe", transcribeRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("🚀 Servidor rodando na porta " + PORT));
