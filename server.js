const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config({ path: "./config/config.env" });
connectDB();

const transactionRouter = require("./routes/transactionRouter");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/transaction", transactionRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("sampleproj/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "sampleproj", "build", "index.html"))
  );
}

app.listen(PORT, () => {
  console.log(
    `server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
  );
});
