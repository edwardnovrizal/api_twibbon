const CategoryModel = require("../models/categoryModel");
const mongoose = require("mongoose");
const POST = async (req, res) => {
  const idCategory = req.body.id;
  const { url, title } = req.body.data;
  let dataBody = [];
  try {
    const filter = { _id: idCategory };
    const category = await CategoryModel.findOne(filter);

    if (category === null) {
      return res.status(404).send({
        code: res.statusCode,
        message: "Sorry, Category not found!",
      });
    }

    for (const key in req.body.data) {
      if (!req.body.data) {
        return res.status(400).send({
          code: res.statusCode,
          message: "Data Tidak Boleh Kosong!",
        });
      }
      const isImageExists = category.images.some((v) => v.url === req.body.data[key].url);
      if (!isImageExists) {
        dataBody.push(req.body.data[key]);
      }
    }

    const update = {
      $push: {
        images: dataBody,
      },
    };

    const Respone = await CategoryModel.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (Respone) {
      return res.status(200).send({
        code: res.statusCode,
        message: "Succesfully Save Data image!",
        data: Respone.images.map((e) => e),
      });
    }

    return res.status(404).send({
      code: res.statusCode,
      message: "Data not found!",
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
    const categoryId = req.params.categoryId;
    const valid = mongoose.Types.ObjectId.isValid(categoryId);
    if (!valid) {
      return res.status(404).send({
        code: res.statusCode,
        message: "Sorry, Category not found!",
      });
    }
    const filter = { _id: categoryId };
    const Respone = await CategoryModel.findOne(filter);
    if (Respone) {
      return res.status(200).send({
        code: res.statusCode,
        message: "Success",
        data: Respone.images,
      });
    }

    return res.status(404).send({
      code: res.statusCode,
      message: "Data not found!",
    });
  } catch (error) {
    return res.status(400).json({
      code: res.statusCode,
      message: error.message,
    });
  }
};

const DELETE = async (req, res) => {
  const { idCategory, idImage } = req.body;
  const filter = { _id: idCategory };

  try {
    const category = await CategoryModel.findOne(filter);
    if (category === null) {
      return res.status(404).send({
        code: res.statusCode,
        message: "Sorry, category not found!",
      });
    }

    const isImageExists = category.images.some((v) => v._id.equals(idImage));
    if (!isImageExists) {
      return res.status(404).send({
        code: res.statusCode,
        message: "Sorry, data image not found!",
      });
    }

    await CategoryModel.updateOne(filter, {
      $pull: {
        images: { _id: idImage },
      },
    });

    const updateCategory = await CategoryModel.findOne(filter);

    return res.status(200).send({
      code: res.statusCode,
      message: "Successfully Delete Data Image!",
      data: updateCategory.images,
    });
  } catch (error) {
    return res.status(400).send({
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
