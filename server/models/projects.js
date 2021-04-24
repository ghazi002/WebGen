const mongoose = require("mongoose");

var projectsSchema = new mongoose.Schema({
  idPro: {
    type: Number,
  },
  name: {
    type: String,
  },
  path:{
    type: String,
  }
  
});

const classes = mongoose.model("projects", projectsSchema, "projects");
module.exports = classes;
