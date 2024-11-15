const router = require("express").Router();
const mongodb = require("mongodb");
const db = require("../db");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const ObjectId = mongodb.ObjectId;

// Det her er ikke et rigtigt scenarie. Jeg har blot lavet et meget simpelt setup for at lave en MVP/demo
router.post(
  "/signup",
  [
    check("email", "Please input a valid email").isEmail(),
    check("password", "Passwords must be at least 9 characters").isLength({ min: 9 }),
    check("name", "Usernames must be at least 4 characters").isLength({ min: 4 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password, name } = req.body;

    const user = await db.getDb().db().collection("users").findOne({ email: email });

    if (user) {
      return res.status(400).json({
        errors: { msg: "This user already exists" },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db
      .getDb()
      .db()
      .collection("users")
      .findOneAndUpdate(
        { email },
        { $set: { email, password: hashedPassword, name } },
        { upsert: true, returnDocument: "after", projection: { email: 1, name: 1 } }
      );

    const token = await jwt.sign(newUser, process.env.JSON_WEB_TOKEN_SECRET, { expiresIn: 36000000 });

    return res.status(200).json({ user: newUser, token });
  }
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await db.getDb().db().collection("users").findOne({ email: email });
  console.log(user);

  if (!user) {
    return res.status(400).json({
      errors: { msg: "No user exists with this email" },
    });
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    return res.status(400).json({
      errors: { msg: "Invalid credentials!" },
    });
  }

  const token = await jwt.sign(user, process.env.JSON_WEB_TOKEN_SECRET, { expiresIn: 36000000 });

  return res.status(200).json({ user, token });
});

router.get("/me", async (req, res) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) return res.send(null);

  const reqJwt = bearerToken.split("Bearer ")[1];
  if (!reqJwt) return res.send(null);

  let payload;
  try {
    payload = await jwt.verify(reqJwt, process.env.JSON_WEB_TOKEN_SECRET);
  } catch (error) {
    res.send(null);
  }

  const user = await db.getDb().db().collection("users").findOne({ email: payload.email });

  return res.status(200).json(user);
});

module.exports = router;
