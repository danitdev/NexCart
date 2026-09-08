import express from "express";
import cors from "cors";

import categoryRouter from "./modules/categories/categoryRoutes.js";
import productRouter from "./modules/products/productRoutes.js";
import authRouter from "./modules/auth/authRoutes.js";
import cartRouter from "./modules/carts/cartRoutes.js";
import { AppError } from "./errors/AppError.js";
import multer from "multer";
import __root_dir from "./utils/path.js";
import path from "node:path";


const fileStorage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"images");
  },
  filename:(req,file,cb)=>{
    cb(null,Date.now()+"-"+file.originalname);
  }
});
const fileFilter = (req:Express.Request,file:Express.Multer.File,cb:multer.FileFilterCallback)=>{
    if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
}

//the field name for the file is image
const upload = multer({storage:fileStorage,fileFilter}).single("image");

const app = express();

app.use(upload);
app.use("/images",express.static(path.join(__root_dir,"/images")));

app.use(cors({
  // origin:"the frontend address"
}));
app.use(express.json());



// Routes
app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/auth",authRouter);
app.use("/cart",cartRouter);

// Error handling — keep this LAST
app.use(
  (
    error: AppError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    let errStatus;
    if(error.statusCode){
      errStatus = error.statusCode;
    }
    else{
      errStatus = 500;
    }

    const errMsg = error.message;

    console.log(error);
    res.status(errStatus).json({ errMsg });
  }
);

export default app;