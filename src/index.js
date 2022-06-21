import express from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from"dotenv";

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

const port = process.env.PORT;

app.listen(port, ()=> console.log(chalk.blue(`Servidor criado na porta ${port}`)));