import express from "express";
import cors from "cors";

import categoryRouter from "./modules/categories/categoryRoutes.js";
import productRouter from "./modules/products/productRoutes.js";
import { AppError } from "./errors/AppError.js";

const app = express();

app.use(cors());
app.use(express.json());



// Routes
app.use("/categories", categoryRouter);
app.use("/products", productRouter);

// Error handling — keep this LAST
app.use(
  (
    error: AppError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const errStatus = error.statusCode;
    const errMsg = error.message;

    console.log(error);

    res.status(errStatus).json({ errMsg });
  }
);

export default app;