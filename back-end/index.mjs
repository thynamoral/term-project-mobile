import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
// middlewares
import verifyToken from "./middlewares/verifyToken.mjs";
// configs
import connectDB from "./configs/connectDB.mjs";
import corsOptions from "./configs/corsOptions.mjs";
// routes
import registerRoute from "./routes/auth/registerRoute.mjs";
import loginRoute from "./routes/auth/loginRoute.mjs";
import refreshTokenRoute from "./routes/auth/refreshTokenRoute.mjs";
import userRoute from "./routes/user/index.mjs";
import blogPostRouter from "./routes/blogPost/index.mjs";
import topicRoute from "./routes/topic/index.mjs";
import searchRouter from "./routes/search/index.mjs";
import likeRouter from "./routes/like/index.mjs";
import bookmarkRouter from "./routes/bookmark/index.mjs";
import userInteractionRouter from "./routes/userInteractions/index.mjs";

const app = express();

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(bodyParser.json());

app.use(registerRoute);
app.use(loginRoute);
app.use(refreshTokenRoute);

// user route
app.use(userRoute);

// blogPost route
app.use(blogPostRouter);

// topic route
app.use(topicRoute);

// search route
app.use(searchRouter);

// like router
app.use(likeRouter);

// bookmark router
app.use(bookmarkRouter);

// user interaction router
app.use(userInteractionRouter);

app.listen(process.env.PORT, async () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  await connectDB();
});
