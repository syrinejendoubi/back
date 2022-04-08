require("express-async-errors");
require("dotenv").config();

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});
const express = require("express");
const cors = require("cors");
const YAML = require("yamljs");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const ConnectDB = require("./config/db");
const auth = require("./routes/api/authRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const users = require("./routes/api/usersRoutes");
const discipline = require("./routes/api/disciplinesRoutes");
const invitations = require("./routes/api/InvitationsRoutes");
const statistique = require("./routes/api/statisticRoutes");
const defis =  require("./routes/api/defiRoutes");
const competence = require("./routes/api/skillRoutes");
const defis = require("./routes/api/defiRoutes");
const trainingGround = require("./routes/api/trainingGroundRoutes");
const programme = require("./routes/api/programmeRoutes");
const assignChallenge = require("./routes/api/assignChallengeRoutes");
const swaggerDocument = YAML.load("./swagger.yaml");

const app = express();

ConnectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(
  "/api",
  auth,
  users,
  discipline,
  invitations,
  statistique,
  trainingGround,
  programme,
  competence,
  defis,
  assignChallenge
);

app.use(errorHandler);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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
