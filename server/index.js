import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import petitionRoute from "./routes/petition.js";

dotenv.config();

const {PORT, MONGODB_URI} = process.env;

const app = express();

app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));

app.use(cors());

app.use(express.Router());
app.use("/petition", petitionRoute);

app.get("/", (req, res) => {
  res.send("Welcome to UK Petitions API");
});

const SERVER_PORT = PORT || 5000;

app.listen(SERVER_PORT, () =>
  console.log(`Server running on port: ${SERVER_PORT}...`)
);
