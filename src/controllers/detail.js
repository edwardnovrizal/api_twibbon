const ScrapeDetail = require("../utils/scrapeDetail");

const GET = async (req, res) => {
  const href = req.params.href;
  try { 
    const DataDetail = await ScrapeDetail(href);

    return res.status(200).json({
      code: res.statusCode,
      message: "Success",
      data: DataDetail,
    });
  } catch (error) {
    return res.status(400).json({
      code: res.statusCode,
      message: error.message,
    });
  }
};

module.exports = { GET };
