const express = require("express");
const router = express.Router();
const {
  createPCGames,
  readPCGames,
  readPCGamesFromID,
  updatePCGames,
  deletePCGames,
} = require("../controllers/PCGames");
router.route("/create").post(createPCGames);
router.route("/read").get(readPCGames);
router.route("/read/:id").get(readPCGamesFromID);
router.route("/update/:id").post(updatePCGames);
router.route("/delete/:id").delete(deletePCGames);
module.exports = router;
