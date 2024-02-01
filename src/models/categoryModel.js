const { default: mongoose } = require("mongoose");
const Mongoose = require("mongoose");
const UniqueValidator = require("mongoose-unique-validator");
const ImageModel = require("./imageModel");

const CategorySchema = Mongoose.Schema(
  {
    nama: { type: String, unique: true },
    color: { type: String },
    thumb: { type: String },
    images: [ImageModel],
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
    versionKey: false,
  }
);

CategorySchema.plugin(UniqueValidator, {
  message: "Data '{VALUE}' sudah tersedia !",
});

CategorySchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;
 