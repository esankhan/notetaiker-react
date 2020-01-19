const express = require("express");
const auth = require("../middleware/auth");

const { check, validationResult } = require("express-validator");

const Contact = require("../models/Contact");
const User = require("../models/User");

const router = express.Router();

// @route  GET api/contacts
// @desc   Get all user's contacts
// @access Private

router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }

  res.send("Get Contacts");
});

// @route  POST api/contacts
// @desc   add contacts
// @access Private

router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is Required")
        .not()
        .isEmpty(),
      check("email", "Email is Required")
        .isEmail()
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
    }

    res.send("Add Contacts");
  }
);

// @route  PUT api/contacts
// @desc   update contacts
// @access Private

router.put("/:id", (req, res) => {
  res.send("Update Contacts");
});

// @route  DELETE api/contacts
// @desc   delete contacts
// @access Private

router.delete("/:id", (req, res) => {
  res.send("Delete COntatcs");
});

module.exports = router;
