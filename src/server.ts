import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";

const app: Application = express();
const port = 5000;

const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_UxCBc5bLGg3A@ep-dry-recipe-az991atz.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
})

// console.log(pool)

app.use(express.json());
// app.use(express.text());
app.use(express.urlencoded({extended: true}));


app.get("/", (req: Request, res: Response) => {
  // res.send("This is route route");
  res.status(200).json({
    success: true,
    message: "This is express server.",
    author: "Nabil",
  });
});

app.post("/", (req: Request, res: Response) => {
    const body = req.body;

    res.status(201).json({
    success: true,
    message: "New data created",
    author: "Nabil",
    data: body
  });

})



app.listen(port, () => {
  console.log(`The express server is rumming on the port ${port}`);
});
