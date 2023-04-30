const mongoose = require("mongoose");
const GamesSchema = new mongoose.Schema(
  {
    gameId: {
      unique: true,
      type: String,
      required: [true, "Please provide gameId"],
    },
    mediaId: {
      unique: true,
      type: String,
      required: [true, "Please provide mediaId"],
    },
    title: { type: String, required: [true, "Please provide title"] },
    console: { type: String, required: [true, "Please provide console"] },
    downloadSize: {
      type: String,
      required: [true, "Please provide downloadSize"],
    },
    oldScreenImg: {
      type: String,
      required: [true, "Please provide oldScreenImg"],
    },
    oldCartImg: { type: String, required: [true, "Please provide oldCartImg"] },
    oldBoxImg: { type: String, required: [true, "Please provide oldBoxImg"] },
    cheatCode: [{ type: String, required: [true, "Please provide cheatCode"] }],
    cheatCodeDescription: [
      {
        type: String,
        required: [true, "Please provide cheatCodeDescription"],
      },
    ],
    gameInfoTitle: [
      {
        type: String,
        required: [true, "Please provide gameInfoTitle"],
      },
    ],
    gameInfoDescription: [
      {
        type: String,
      },
    ],
    timestamp: { type: String, required: [true, "Please provide timestamp"] },
    screenImg: { type: String, required: [true, "Please provide screenImg"] },
    cartImg: { type: String, required: [true, "Please provide cartImg"] },
    boxImg: { type: String, required: [true, "Please provide boxImg"] },
    reviewName: [{ type: String }],
    reviewDescription: [
      {
        type: String,
      },
    ],
    reviewDate: [{ type: String }],
    oldDownloadLink: {
      type: String,
      required: [true, "Please provide oldDownloadLink"],
    },
    downloadLink: {
      type: String,
      required: [true, "Please provide downloadLink"],
    },
  },
  { timestamps: true }
);
const Games = mongoose.model("Games", GamesSchema);
module.exports = Games;
