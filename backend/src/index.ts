import express, { Request, Response, Express, NextFunction } from 'express';
import dotenv from "dotenv";
import DbConnect from './config/Databse';
import { sendErrorResponse } from './utils/response';
import productRoute from "./routes/product.route";
import path from 'path';
import cors from "cors";
import morgan from "morgan";

dotenv.config();

//Connecting Db
DbConnect();

const app: Express = express();
const port = process.env.PORT;


app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.use('/api', productRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  return sendErrorResponse(
    res,
    500,
    `An error occurred: ${err.message}`,
    err.stack
  )
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
