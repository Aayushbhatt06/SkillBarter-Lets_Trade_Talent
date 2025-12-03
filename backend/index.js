const express = require("express");
const app = express();
const user = require("./Models/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const ApiRouter = require("./Routes/ApiRouter");
const http = require("http");
const initializeSocket = require("./Controllers/Socket/socket");
const cookieParser = require("cookie-parser");
const profileRouter = require("./Routes/profileRoutes");
const connectionRoute = require("./Routes/connectionRoute");

const server = http.createServer(app);
initializeSocket(server);
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

server.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
