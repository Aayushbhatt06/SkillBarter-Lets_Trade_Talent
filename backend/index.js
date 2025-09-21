const express = require("express");
const app = express();
const user = require("./Models/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const ApiRouter = require("./Routes/ApiRouter");
const LoggedInOnly = require("./Middlewares/LoggedInOnly");
const fetchProfile = require("./Controllers/fetchProfile");
require("dotenv").config();

const PORT = process.env.PORT;

app.get("/ping", (req, res) => {
  res.send("PONG");
});
app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/auth", AuthRouter);
app.use("/api", ApiRouter);
app.get("/profile", LoggedInOnly, fetchProfile);
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
