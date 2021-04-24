require("./models/db");
const cors = require("cors");
const express = require("express");
const bodyparser = require("body-parser");
const classesController = require("./routes/classesController");
const seancesController = require("./routes/seancesController");
const classesGroupController = require("./routes/classesGroupController");
var app = express();

app.enable("trust proxy");

// Set body parser middleware
app.use(bodyparser.json());

const server = app.listen(5000, () => {
  console.log("Express server started at port  : 5000");
});

app.use(cors());

//app.use("/class", classesController);
//app.use("/seance", seancesController);
//app.use("/classesGroup", classesGroupController);
