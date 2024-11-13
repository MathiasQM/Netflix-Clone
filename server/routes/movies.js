const Router = require("express").Router;
const mongodb = require("mongodb");
const db = require("../db");

const ObjectId = mongodb.ObjectId;

const router = Router();

router.get("/list/popular", (req, res, next) => {
  const offset = parseInt(req.query.offset) || 1;
  const limit = 20;
  const skip = (offset - 1) * limit;
  const movies = [];
  db.getDb()
    .db()
    .collection("movies")
    .aggregate([
      {
        $match: {
          "imdb.rating": { $gt: 7.5 },
          "imdb.votes": { $gt: 500 },
          "tomatoes.viewer.rating": { $gt: 3 },
          year: { $gt: 2010 },
        },
      },
      {
        $project: {
          poster: 1,
          title: 1,
          plot: 1,
          genres: 1,
          runtime: 1,
        },
      },
      { $skip: skip },
      { $limit: limit + 1 }, // Henter et document ekstra for at tjekke om der er flere dokumenter
    ])
    .forEach((movieDoc) => {
      console.log(movieDoc);
      movies.push(movieDoc);
    })
    .then(() => {
      const hasMore = movies.length > limit;
      if (hasMore) movies.pop(); // Fjerner det ekstra dokument for design årsager (for ikke at få et ulige antal)

      res.status(200).json({
        movies,
        hasMore,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "An error uccured" });
    });
});

// Get single product
router.get("/watch/:id", (req, res, next) => {
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
