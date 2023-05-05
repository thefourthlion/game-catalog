const express = require("express");
const router = express.Router();
const {
  createGames,
  readGames,
  readGamesFromID,
  readGamesFromGameID,
  readGamesFromConsole,
  updateGames,
  deleteGames,
} = require("../controllers/Games");
router.route("/create").post(createGames);
router.route("/read").get(readGames);
router.route("/read/:id").get(readGamesFromID);
// router.route("/read/gameId/:console").get(readGamesFromConsole);
router.route("/read/game/:id").get(readGamesFromGameID);
router.route("/update/:id").post(updateGames);
router.route("/delete/:id").delete(deleteGames);
module.exports = router;
