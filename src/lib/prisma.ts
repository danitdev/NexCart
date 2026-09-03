import "dotenv/config";
import {PrismaClient} from "../generated/prisma/client.js";
import {PrismaMariaDb} from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

export const prisma = new PrismaClient({adapter});