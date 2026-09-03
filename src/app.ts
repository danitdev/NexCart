import express from "express";
import cors from "cors";
import categoryRouter from "./modules/categories/categoryRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/categories",categoryRouter);


export default app;