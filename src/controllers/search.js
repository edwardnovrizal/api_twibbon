const ScrapeSearch = require("../utils/scrapeSearch");

const GET = async (req, res) => {
  const keyword = req.params.keyword;
  try {
    const DataSearch = await ScrapeSearch(keyword);

    return res.status(200).json({
      code: res.statusCode,
      message: "Success",
      data: DataSearch,
    });
  } catch (error) {
    return res.status(400).json({
      code: res.statusCode,
      message: error.message,
    });
  }
};

module.exports = { GET };
