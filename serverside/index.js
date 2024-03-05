const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const authenticationRouter = require("./routes/AuthenticationRoutes");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 8000;
dotenv.config();

app.use("/api", authenticationRouter);

const __dirname1 = path.join(__dirname, "../");
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    return res.send("Server is running");
  });
}

// *************** DEPLOYMENT ***************

app.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log(`Example app listening on port `, PORT);
    })
    .catch((error) => {
      console.log("connection Failed :- ", error);
    });
});
