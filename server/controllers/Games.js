const Games = require("../models/Games");
exports.createGames = async (req, res) => {
  try {
    let newGames = new Games({
      gameId: req.body.gameId,
      mediaId: req.body.mediaId,
      title: req.body.title,
      console: req.body.console,
      downloadSize: req.body.downloadSize,
      oldScreenImg: req.body.oldScreenImg,
      oldCartImg: req.body.oldCartImg,
      oldBoxImg: req.body.oldBoxImg,
      cheatCode: req.body.cheatCode,
      cheatCodeDescription: req.body.cheatCodeDescription,
      gameInfoTitle: req.body.gameInfoTitle,
      gameInfoDescription: req.body.gameInfoDescription,
      timestamp: req.body.timestamp,
      screenImg: req.body.screenImg,
      cartImg: req.body.cartImg,
      boxImg: req.body.boxImg,
      reviewName: req.body.reviewName,
      reviewDescription: req.body.reviewDescription,
      reviewDate: req.body.reviewDate,
      oldDownloadLink: req.body.oldDownloadLink,
      downloadLink: req.body.downloadLink,
    });
    await newGames.save();
    res.send(newGames);
  } catch (err) {
    console.log(err);
  }
};
exports.readGames = async (req, res) => {
    const page = req.query.page || 0;
    const limit = req.query.limit || 25;
  try {
    Games.find({}, (err, result) => {
      if (err) {
        res.json({ app: err });
      }
      res.send(result);
    })
      .sort()
      .skip(page * limit)
      .limit(limit);
  } catch (err) {
    console.log(err);
  }
};
exports.readGamesFromID = async (req, res) => {
  try {
    await Games.findById({ _id: req.params.id }, {}, (err, result) => {
      if (err) {
        res.json({ app: err });
      }
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
};
exports.updateGames = async (req, res) => {
  try {
    await Games.findByIdAndUpdate(
      req.params.id,
      {
        gameId: req.body.gameId,
        mediaId: req.body.mediaId,
        title: req.body.title,
        console: req.body.console,
        downloadSize: req.body.downloadSize,
        oldScreenImg: req.body.oldScreenImg,
        oldCartImg: req.body.oldCartImg,
        oldBoxImg: req.body.oldBoxImg,
        cheatCode: req.body.cheatCode,
        cheatCodeDescription: req.body.cheatCodeDescription,
        gameInfoTitle: req.body.gameInfoTitle,
        gameInfoDescription: req.body.gameInfoDescription,
        timestamp: req.body.timestamp,
        screenImg: req.body.screenImg,
        cartImg: req.body.cartImg,
        boxImg: req.body.boxImg,
        reviewName: req.body.reviewName,
        reviewDescription: req.body.reviewDescription,
        reviewDate: req.body.reviewDate,
        oldDownloadLink: req.body.oldDownloadLink,
        downloadLink: req.body.downloadLink,
      },
      (err, result) => {
        if (err) {
          res.json({ app: err });
        }
        res.send(result);
      }
    );
  } catch (err) {
    console.log(err);
  }
};
exports.deleteGames = async (req, res) => {
  try {
    if ((await Games.findById(req.params.id)) === null) {
      res.json({ app: "post not found" });
    } else {
      await Games.findByIdAndRemove(req.params.id).exec();
      res.json({ app: "post deleted" });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
