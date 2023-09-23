const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const multer = require("multer");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");

dotenv.config();

app.use(express.json());
//database
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("api/upload", upload.single("file"), (req, res) => {
  res.status(200).json({ message: "File has been uploaded!" });
});

// //routes

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("api/posts", postRoute);
app.use("api/categories", categoryRoute);

app.listen(process.env.PORT || 9096, () => {
  console.log(`Server Started at ${process.env.PORT || 9096}`);
});
