const mongoose = require("mongoose");

var interfacesSchema = new mongoose.Schema({
  idInt: {
    type: Number,
  },
  idPro: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "projects",
  },
  path: {
    type: String,
  },
  
});

const classes = mongoose.model("interfaces", interfacesSchema, "interfaces");
module.exports = classes;
