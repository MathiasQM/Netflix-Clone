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

router.get("/mylist/:id", async (req, res) => {
  let myList = [];
  await db
    .getDb()
    .db()
    .collection("mylist")
    .find({ userId: req.params.id }, { projection: { plot: 1, poster: 1, title: 1, runtime: 1, genres: 1 } })
    .forEach((savedMovieDoc) => {
      myList.push(savedMovieDoc);
    })
    .then(() => {
      res.status(200).json({
        myList,
        hasMore: false,
      });
    });
});

router.get("/mylist/add/:id", async (req, res) => {
  try {
    const userId = req.query.userId;
    const movieId = req.params.id;
    // Find the movie document by ID
    const movieDoc = await db
      .getDb()
      .db()
      .collection("movies")
      .findOne({ _id: new ObjectId(movieId) });

    if (!movieDoc) {
      return res.status(404).json({ message: "Movie not found" });
    }

    await db
      .getDb()
      .db()
      .collection("mylist")
      .updateOne(
        { _id: new ObjectId(movieId) },
        { $set: { ...movieDoc, userId, savedAt: new Date() } },
        { upsert: true }
      );

    return res.status(200).json({ message: "Movie added to My List successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred" });
  }
});

router.post("/mylist/remove/:id", async (req, res) => {
  try {
    console.log("helloooo");
    console.log(req.params.id);

    // Find the movie document by ID
    const deletedMovieDoc = await db
      .getDb()
      .db()
      .collection("mylist")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    console.log(deletedMovieDoc);

    if (!deletedMovieDoc) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.status(200).json({ message: "Movie Removed to My List successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
