import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  url: {
    required: true,
    type: String,
  },
  id: {
    required: true,
    type: String,
    unique: true,
  },
  hits: {
    type: Number,
    default: 0,
  },
  target: {
    type: String,
    default: null,
  },
});

urlSchema.methods.incrementHits = function () {
  this.hits++;
  return this.save();
};

const URL = mongoose.model("URL", urlSchema);

export default URL;
