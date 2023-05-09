const Games = require("../models/Games");
exports.createGames = async (req, res) => {
  try {
    let newGames = new Games({
      gameId: req.body.gameId,
      mediaId: req.body.mediaId,
      title: req.body.title,
      console: req.body.console,
      downloadSize: req.body.downloadSize,
      screenImg: req.body.screenImg,
      boxImg: req.body.boxImg,
      cartImg: req.body.cartImg,
      oldScreenImg: req.body.oldScreenImg,
      oldBoxImg: req.body.oldBoxImg,
      oldCartImg: req.body.oldCartImg,
      cheatCode: req.body.cheatCode,
      cheatCodeDescription: req.body.cheatCodeDescription,
      reviewName: req.body.reviewName,
      reviewDate: req.body.reviewDate,
      reviewDescription: req.body.reviewDescription,
      gameFileName: req.body.gameFileName,
      region: req.body.region,
      serial: req.body.serial,
      version: req.body.version,
      verified: req.body.verified,
      SHA1: req.body.SHA1,
      MD5: req.body.MD5,
      CRC: req.body.CRC,
      overallReview: req.body.overallReview,
      gameplayReview: req.body.gameplayReview,
      soundReview: req.body.soundReview,
      graphicsReview: req.body.graphicsReview,
      publisher: req.body.publisher,
      format: req.body.format,
      cartSize: req.body.cartSize,
      year: req.body.year,
      players: req.body.players,
      oldDownloadLink: req.body.oldDownloadLink,
      downloadLink: req.body.downloadLink,
      description: req.body.description,
      timestamp: req.body.timestamp,
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
    await Games.find({}, (err, result) => {
      if (err) {
        res.json({ app: err });
      }
      res.send(result);
    })
      .sort()
      .skip(page * limit)
      .limit(limit)
      .exec();
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

exports.readGamesFromGameID = async (req, res) => {
  try {
    await Games.findOne({ gameId: req.params.id }, {}, (err, result) => {
      if (err) {
        res.json({ app: err });
      }
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.readGamesStartingWithLetter = async (req, res) => {
  try {
    const query = { title: new RegExp(`^${req.params.id}`, "i") };
    await Games.find(query, {}, (err, result) => {
      if (err) {
        res.json({ app: err });
      }
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.readGamesFromConsole = async (req, res) => {
  const page = req.query.page || 0;
  const limit = req.query.limit || 25;
  try {
    await Games.find({ console: req.params.console }, (err, result) => {
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
        screenImg: req.body.screenImg,
        boxImg: req.body.boxImg,
        cartImg: req.body.cartImg,
        oldScreenImg: req.body.oldScreenImg,
        oldBoxImg: req.body.oldBoxImg,
        oldCartImg: req.body.oldCartImg,
        cheatCode: req.body.cheatCode,
        cheatCodeDescription: req.body.cheatCodeDescription,
        reviewName: req.body.reviewName,
        reviewDate: req.body.reviewDate,
        reviewDescription: req.body.reviewDescription,
        gameFileName: req.body.gameFileName,
        region: req.body.region,
        serial: req.body.serial,
        version: req.body.version,
        verified: req.body.verified,
        SHA1: req.body.SHA1,
        MD5: req.body.MD5,
        CRC: req.body.CRC,
        overallReview: req.body.overallReview,
        gameplayReview: req.body.gameplayReview,
        soundReview: req.body.soundReview,
        graphicsReview: req.body.graphicsReview,
        publisher: req.body.publisher,
        format: req.body.format,
        cartSize: req.body.cartSize,
        year: req.body.year,
        players: req.body.players,
        oldDownloadLink: req.body.oldDownloadLink,
        downloadLink: req.body.downloadLink,
        description: req.body.description,
        timestamp: req.body.timestamp,
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

exports.updateGamesByGameId = async (req, res) => {
  try {
    await Games.updateOne(
      { gameId: req.params.id },
      {
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

exports.updateImageByGameId = async (req, res) => {
  try {
    await Games.updateOne(
      { gameId: req.params.id },
      {
        // description: req.body.description,
        oldCartImg: req.body.oldCartImg,
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

exports.updateGameDownloadByGameId = async (req, res) => {
  try {
    await Games.updateOne(
      { gameId: req.params.id },
      {
        // description: req.body.description,
        oldCartImg: req.body.oldCartImg,
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
