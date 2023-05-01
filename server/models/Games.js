const mongoose = require("mongoose");
const GamesSchema = new mongoose.Schema(
  {
    gameId: { type: String, required: [true, "Please provide gameId"] },
    mediaId: { type: String, required: [true, "Please provide mediaId"] },
    title: { type: String, required: [true, "Please provide title"] },
    console: { type: String, required: [true, "Please provide console"] },
    downloadSize: {
      type: String,
      required: [true, "Please provide downloadSize"],
    },
    screenImg: { type: String, required: [true, "Please provide screenImg"] },
    boxImg: { type: String, required: [true, "Please provide boxImg"] },
    cartImg: { type: String, required: [true, "Please provide cartImg"] },
    oldScreenImg: {
      type: String,
      required: [true, "Please provide oldScreenImg"],
    },
    oldBoxImg: { type: String, required: [true, "Please provide oldBoxImg"] },
    oldCartImg: { type: String, required: [true, "Please provide oldCartImg"] },
    cheatCode: [{ type: String, required: [true, "Please provide cheatCode"] }],
    cheatCodeDescription: [
      {
        type: String,
        required: [true, "Please provide cheatCodeDescription"],
      },
    ],
    reviewName: [
      { type: String, required: [true, "Please provide reviewName"] },
    ],
    reviewDate: [
      { type: String, required: [true, "Please provide reviewDate"] },
    ],
    reviewDescription: [
      {
        type: String,
        required: [true, "Please provide reviewDescription"],
      },
    ],
    gameFileName: {
      type: String,
      required: [true, "Please provide gameFileName"],
    },
    region: { type: String, required: [true, "Please provide region"] },
    serial: { type: String, required: [true, "Please provide serial"] },
    version: { type: String, required: [true, "Please provide version"] },
    verified: { type: String, required: [true, "Please provide verified"] },
    SHA1: { type: String, required: [true, "Please provide SHA1"] },
    MD5: { type: String, required: [true, "Please provide MD5"] },
    CRC: { type: String, required: [true, "Please provide CRC"] },
    overallReview: {
      type: String,
      required: [true, "Please provide overallReview"],
    },
    gameplayReview: {
      type: String,
      required: [true, "Please provide gameplayReview"],
    },
    soundReview: {
      type: String,
      required: [true, "Please provide soundReview"],
    },
    graphicsReview: {
      type: String,
      required: [true, "Please provide graphicsReview"],
    },
    publisher: { type: String, required: [true, "Please provide publisher"] },
    format: { type: String, required: [true, "Please provide format"] },
    cartSize: { type: String, required: [true, "Please provide cartSize"] },
    year: { type: String, required: [true, "Please provide year"] },
    players: { type: String, required: [true, "Please provide players"] },
    oldDownloadLink: {
      type: String,
      required: [true, "Please provide oldDownloadLink"],
    },
    downloadLink: {
      type: String,
      required: [true, "Please provide downloadLink"],
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
    },
    timestamp: { type: String, required: [true, "Please provide timestamp"] },
  },
  { timestamps: true }
);
const Games = mongoose.model("Games", GamesSchema);
module.exports = Games;
