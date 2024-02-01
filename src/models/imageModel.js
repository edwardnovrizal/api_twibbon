const Mongoose = require("mongoose");

const ImageModel = Mongoose.Schema(
  {
    title: { type: String },
    url: { type: String },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
    versionKey: false,
  }
);
 

module.exports = ImageModel;
