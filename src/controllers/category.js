const CategoryModel = require("../models/categoryModel");

const POST = async (req, res) => {
  try {
    const DataRequest = CategoryModel({
      nama: req.body.nama,
      color: req.body.color,
      thumb: req.body.thumb,
    });

    const Respone = await DataRequest.save();

    return res.status(200).json({
      code: res.statusCode,
      message: "Success",
      data: Respone,
    });
  } catch (error) {
    return res.status(400).json({
      code: res.statusCode,
      message: error.message,
    });
  }
};

const GET = async (req, res) => {
  try {
    const Respone = await CategoryModel.find()
      .sort({
        createdAt: -1,
      })
      .select("-images");

    if (Respone.length === 0) {
      return res.status(404).json({
        code: res.statusCode,
        message: "Data Not Found",
      });
    }

    return res.status(200).json({
      code: res.statusCode,
      message: "Success",
      data: Respone,
    });
  } catch (error) {
    return res.status(400).json({
      code: res.statusCode,
      message: error.message,
    });
  }
};

const DELETE = async (req, res) => {
  const CategoryId = req.body.id;
  try {
    const Respone = await CategoryModel.deleteOne({
      _id: CategoryId,
    });

    return res.status(200).send({
      code: res.statusCode,
      message: "Successfully Delete Data!",
      data: Respone,
    });
  } catch (error) {
    return res.status(400).json({
      code: res.statusCode,
      message: error.message,
    });
  }
};

module.exports = {
  POST,
  GET,
  DELETE,
};
