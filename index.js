const sql = require("./src/config/db");
const express = require("express");
const router = require("./src/routes/studentRoutes");
const Router = require("./src/routes/userRoutes")
const app = express();
const port = 8080;
const multer = require("multer");
const path = require("path");
app.use(express.json());
app.use(router);
app.use("/", express.static(path.join(__dirname, "images")));

app.use(express.json());
app.use(Router);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
