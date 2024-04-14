const mongoose = require("mongoose");
const PCGamesSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Please provide title"] },
    link: { type: String, required: [true, "Please provide link"] },
    image: { type: String, required: [true, "Please provide image"] },
  },
  { timestamps: true }
);
const PCGames = mongoose.model("PCGames", PCGamesSchema);
module.exports = PCGames;
