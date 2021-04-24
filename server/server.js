require("./models/db");
const cors = require("cors");
const express = require("express");
const bodyparser = require("body-parser");
const componentsController = require("./routes/componentsController");
const interfacesController = require("./routes/interfacesController");
const projectsController = require("./routes/projectsController");
var app = express();

app.enable("trust proxy");

// Set body parser middleware
app.use(bodyparser.json());

const server = app.listen(5000, () => {
  console.log("Express server started at port  : 5000");
});

app.use(cors());

app.use("/project", projectsController);
app.use("/interface", interfacesController);
app.use("/component", componentsController);
