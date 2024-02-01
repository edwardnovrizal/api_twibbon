const ScrapeTrending = require("../utils/scrapeTrending");

const GET = async (req, res) => {
  try {
    const DataTrending = await ScrapeTrending();

    return res.status(200).json({
      code: res.statusCode,
      message: "Success",
      data: DataTrending,
    });
  } catch (error) {
    return res.status(400).json({
      code: res.statusCode,
      message: error.message,
    });
  }
};

module.exports = { GET };
