import dotenv from "dotenv";
dotenv.config();

import express from "express";
import userRoutes from "./routes/users";
import connectDb from "./core/db";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/users", userRoutes);

const start = async (): Promise<void> => {
    try {
        await connectDb();
        app.listen(port, (): void => {
            console.log(`Server has been started at ${port} port`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();
