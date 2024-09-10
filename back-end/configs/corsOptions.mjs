import dotenv from "dotenv";
dotenv.config();

const corsOptions = {
  origin:
    process.env.NODE_ENV === "development" ? ["http://localhost:8800"] : "*",
  method: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

export default corsOptions;
