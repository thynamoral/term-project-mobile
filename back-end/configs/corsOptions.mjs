import dotenv from "dotenv";
dotenv.config();

const corsOptions = {
  origin: ["http://localhost:8800"],
  method: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
