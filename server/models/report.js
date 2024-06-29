const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  type:{
    type: String,
    required: true,
  },
  date:{
    type: Date, 
    required: true,
  },
  criminalId:{
    type: String,
    required: true
  },
  firKey:{
    type: String,
    required:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Report", reportSchema);
