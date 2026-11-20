import e from "express";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { pool } from "./db";
import { userRoute } from "./modules/users/user.route";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Express server is runnig!",
    author: "Shariea Reza Nabil",
  });
});

app.use("/api/v1/users", userRoute);

export default app;
