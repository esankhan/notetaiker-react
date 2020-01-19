const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = express.Router();
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

// @route  POST /api/users
// @desc   Register an user
// @access Public

router.post(
  "/",
  [
    check("name", "Please Enter Name")
      .not()
      .isEmpty(),
    check("email", "Please Enter a valid email").isEmail(),
    check(
      "password",
      "Please Enter a password with 6 or more character"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User Already Exist." });
      }
      user = new User({
        name,
        email,
        password
      });
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 36000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
