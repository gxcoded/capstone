const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

//sessions
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    store: new session.MemoryStore(),
    secret: "secret",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Running at PORT ${PORT}`));

//mongo connection
const URI = process.env.ATLAS_URI;
mongoose.connect(URI);
const connection = mongoose.connection;
connection.once("open", () => console.log("Mongo DB Connected!"));

// prototype
app.use("/api", require("./routers/router"));
app.use("/records", require("./routers/dataRouter"));
app.use("/static-data", require("./routers/staticRouter"));

//working version
app.use("/ct-api", require("./routes/main.route"));

app.use(express.static("uploads"));
app.use("/uploads", express.static("uploads"));

app.get("/api-test", (req, res) => {
  res.send("API deployed");
});

app.use((req, res) => {
  res.send("Nothing to show in this page!");
});
