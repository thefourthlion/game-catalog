const PCGames = require("../models/PCGames");
exports.createPCGames = async (req, res) => {
  const page = req.query.page || 0;
  const limit = req.query.limit || 25;
  try {
    let newPCGames = new PCGames({
      title: req.body.title,
      link: req.body.link,
      image: req.body.image,
    });
    await newPCGames.save();
    res.send(newPCGames);
  } catch (err) {
    console.log(err);
  }
};
exports.readPCGames = async (req, res) => {
  try {
    PCGames.find({}, (err, result) => {
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
exports.readPCGamesFromID = async (req, res) => {
  try {
    await PCGames.findById({ _id: req.params.id }, {}, (err, result) => {
      if (err) {
        res.json({ app: err });
      }
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
};
exports.updatePCGames = async (req, res) => {
  try {
    await PCGames.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, link: req.body.link, image: req.body.image },
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
exports.deletePCGames = async (req, res) => {
  try {
    if ((await PCGames.findById(req.params.id)) === null) {
      res.json({ app: "post not found" });
    } else {
      await PCGames.findByIdAndRemove(req.params.id).exec();
      res.json({ app: "post deleted" });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
