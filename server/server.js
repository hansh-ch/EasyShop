const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoryRoutes");

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const port = 3000;
mongoose
  .connect(process.env.DB_LOCAL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(() => console.log("DB connection error"));
//==> CORS CONFIG
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Cache-Control",
      "Authorization",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello");
});

//==> ROUTES
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/category", categoryRouter);
app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    status: "fail",
    message,
  });
});
