const mongoose = require("mongoose");

const criminalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age:{
    type: Number,
    required: true,
  },
  nationality:{
    type: String, 
    required: true,
  },
  gender:{
    type: String,
    required: true
  },
  objectKey: {
    type: String, 
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Criminal", criminalSchema);
