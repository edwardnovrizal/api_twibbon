const express = require("express");
const router = express.Router();
const Category = require("../controllers/category");
const Image = require("../controllers/image");
const Trending = require("../controllers/trending");
const Popular = require("../controllers/popular");
const Search = require("../controllers/search");
const Detail = require("../controllers/detail");

router.post("/category", Category.POST);
router.get("/category", Category.GET);
router.delete("/category", Category.DELETE);

router.post("/image", Image.POST);
router.get("/image/:categoryId", Image.GET);
router.delete("/image", Image.DELETE);

router.get("/trending", Trending.GET);
router.get("/popular", Popular.GET);
router.get("/search/:keyword", Search.GET);
router.get("/detail/:href", Detail.GET);

module.exports = router;
