import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
// middlewares
import verifyToken from "./middlewares/verifyToken.mjs";
// configs
import connectDB from "./configs/connectDB.mjs";
// routes
import registerRoute from "./routes/registerRoute.mjs";
import loginRoute from "./routes/loginRoute.mjs";
import refreshTokenRoute from "./routes/refreshTokenRoute.mjs";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8800");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:8800"],
    methods: "GET,HEAD,PUT,POST,DELETE",
    credentials: true,
  })
);

app.use(registerRoute);
app.use(loginRoute);
app.use(refreshTokenRoute);
app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "Protected route" });
});

app.listen(process.env.PORT, async () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  await connectDB();
});
