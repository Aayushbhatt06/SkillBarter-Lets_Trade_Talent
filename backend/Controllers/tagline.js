const tagModel = require("../Models/tagline");

const getTagLines = async (req, res) => {
  try {
    let limit = 20;

    const docs = await tagModel.find({}, { tagLines: 1, _id: 0 }).lean();
    const tagLines = docs.map((d) => d.tagLines).filter(Boolean);
    console.log(tagLines);
    res.json({ success: true, tagLines });
  } catch (err) {
    res.status(500).json({
      message: "server not responding",
      success: false,
      error: err.message,
    });
  }
};

module.exports = getTagLines;
