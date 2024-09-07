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

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
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
