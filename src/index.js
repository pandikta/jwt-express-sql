require("dotenv").config();
const PORT = process.env.PORT || 5000;
const express = require("express");
const cookieParser = require("cookie-parser");
const usersRoutes = require("./routes/users.js");
const middlewareLogReq = require("./middleware/logs");
const upload = require("./middleware/multer.js");
const db = require("./config/database.js");
const { Users } = require("./models/users.js");
const app = express();

app.use(cookieParser());

try {
  db.authenticate();
  console.log("database connected");
  Users.sync();
} catch (error) {
  console.log(error);
}

app.use(middlewareLogReq);
app.use(express.json());
app.use("/assets", express.static("public/img"));
app.use(usersRoutes);
app.post("/upload", upload.single("photo"), (req, res) => {
  res.json({
    msg: "Upload Success",
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    msg: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server berhasil run di port ${PORT}`);
});
