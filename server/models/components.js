const mongoose = require("mongoose");

var componentsSchema = new mongoose.Schema({
  
  idInt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "interfaces",
  },
  posX: {
    type: Number,
  },
  posY: {
    type: Number,
  },
  type: {
    type: String,
  },
  value:{
      type: String,
  }
});

const classes = mongoose.model("components", componentsSchema, "components");
module.exports = classes;
