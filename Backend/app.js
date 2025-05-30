const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/auth");
const donorRoute = require("./routes/donors");
const prospectRoute = require("./routes/prospects");
const orderRoute = require("./routes/orders");

module.exports = app;

// CORS
app.use(cors());

// JSON
app.use(express.json());

//ROUTES
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/donors", donorRoute);
app.use("/api/v1/prospects", prospectRoute);
app.use("/api/v1/orders", orderRoute);
