const ScrapePopular = require("../utils/scrapePopular");

const GET = async (req, res) => {
  try {
    const DataPopular = await ScrapePopular();

    return res.status(200).json({
      code: res.statusCode,
      message: "Success",
      data: DataPopular,
    });
  } catch (error) {
    return res.status(400).json({
      code: res.statusCode,
      message: error.message,
    });
  }
};

module.exports = { GET };
