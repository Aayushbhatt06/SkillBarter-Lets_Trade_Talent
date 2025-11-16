const express = require("express");
const app = express();
const user = require("./Models/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const ApiRouter = require("./Routes/ApiRouter");
const cookieParser = require("cookie-parser");
const profileRouter = require("./Routes/profileRoutes");
const connectionRoute = require("./Routes/connectionRoute");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
require("dotenv").config();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT;

app.get("/ping", (req, res) => {
  res.send("PONG");
});
app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.use(bodyParser.json());

app.use(cookieParser());
app.use("/auth", AuthRouter);
app.use("/api", ApiRouter);
app.use("/profile", profileRouter);
app.use("/connection", connectionRoute);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
