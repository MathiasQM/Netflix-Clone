const Router = require("express").Router;
const mongodb = require("mongodb");
const db = require("../db");

const ObjectId = mongodb.ObjectId;

const router = Router();

router.get("/list/popular", (req, res, next) => {
  const movies = [];
  db.getDb()
    .db()
    .collection("movies")
    .find({
      "imdb.rating": { $gt: 7.5 },
      "imdb.votes": { $gt: 500 },
      "tomatoes.viewer.rating": { $gt: 3 }, // Add additional condition
      year: { $gt: 2010 }, // Add additional condition
    })
    .limit(20)
    .forEach((movieDoc) => {
      console.log(movieDoc);
      movies.push(movieDoc);
    })
    .then(() => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "An error uccured" });
    });
  console.log(movies);
});

// Get single product
router.get("/:id", (req, res, next) => {
  db.getDb()
    .db()
    .collection("movies")
    .findOne({ _id: new ObjectId(req.params.id) })
    .then((movieDoc) => {
      res.status(200).json(movieDoc);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "An error uccured" });
    });
});

module.exports = router;
