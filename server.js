require("express-async-errors");
require("dotenv").config();

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ConnectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");
const auth = require("./routes/api/authRoutes");

const app = express();

ConnectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", auth);
app.use(errorHandler);
app.all("*", (req, res) => {
  res.status(404).json({
    message: `Impossible de trouver le route ${req.originalUrl} `,
  });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`server listening at port ${PORT} `)
);
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
