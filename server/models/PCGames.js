const mongoose = require("mongoose");
const PCGamesSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please provide name"] },
    seeds: { type: String, required: [true, "Please provide seeds"] },
    date: { type: String, required: [true, "Please provide date"] },
    size: { type: String, required: [true, "Please provide size"] },
    torrentLink: {
      type: String,
      required: [true, "Please provide torrentLink"],
    },
    image: { type: String, },
  },
  { timestamps: true }
);
const PCGames = mongoose.model("PCGames", PCGamesSchema);
module.exports = PCGames;
