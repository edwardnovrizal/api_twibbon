const express = require("express");
const router = require("./src/routes/router");
const Database = require("./src/config/database");
const app = express();
require("dotenv").config();
Database();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
