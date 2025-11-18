import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import vacinasRouter from './routes/vacinas.js';
import pacientesRouter from './routes/pacientes.js';
import usersRouter from './routes/users.js';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// conectar ao banco
connectDB();

// rotas
app.use('/api/vacinas', vacinasRouter);
app.use('/api/pacientes', pacientesRouter);
app.use('/api/users', usersRouter);


app.get('/', (req, res) => res.send('API rodando'));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import pacientesRouter from "./routes/pacientes.js";
// import vacinasRouter from "./routes/vacinas.js";
// import usersRouter from "./routes/users.js";

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;

// // 🟢 Configuração correta do CORS
// app.use(cors({
//   origin: "http://localhost:5173", // URL do seu frontend Vite
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// }));

// app.use(express.json());

// // 🟢 Conecta ao banco
// connectDB();

// // 🟢 Rotas da API
// app.use("/api/pacientes", pacientesRouter);
// app.use("/api/vacinas", vacinasRouter);
// app.use("/api/users", usersRouter);

// app.get("/", (req, res) => res.send("API rodando 🚀"));

// // 🟢 Inicia o servidor
// app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
