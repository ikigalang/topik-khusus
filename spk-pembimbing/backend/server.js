const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

// middleware
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully.");
});

// router
const bimbinganRouter = require("./routes/bimbingan");
const kriteriaRouter = require("./routes/kriteria");
const pembimbingRouter = require("./routes/pembimbing");
const statikRouter = require("./routes/statik");
const usersRouter = require("./routes/users");

app.use("/bimbingan", bimbinganRouter);
app.use("/kriteria", kriteriaRouter);
app.use("/pembimbing", pembimbingRouter);
app.use("/statik", statikRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is runnning on port: ${port}`);
});
