const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const moment = require('moment');

// @ROUTE -- GET api/users/signup
// @DESC  -- Sign up a user and get back his token
// @ACCESS -- Public

router.post(
  '/signup',
  // check if all fields are filled properly
  [
    check('firstName', 'First name is required').trim().not().isEmpty(),

    check('lastName', 'Last name is required').trim().not().isEmpty(),
    check('password', 'Please enter a password with 6 or more characters')
      .isLength({ min: 6 })
      .custom((value, { req }) => {
        if (value !== req.body.confirmPassword) {
          // trow error if passwords do not match
          throw new Error("Passwords don't match");
        } else {
          return value;
        }
      }),
    check('email', 'Please enter a valid email address')
      .normalizeEmail()
      .isEmail(),
    check(
      'confirmPassword',
      'Please enter a password confirmation with 6 or more characters'
    ).isLength({ min: 6 }),
    check('birthDate', 'Please select a birth date').not().isEmpty(),
    check('gender', 'Please select your gender').not().isEmpty()
  ],
  async (req, res) => {
    // check if there was an error with the parsed data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // deconstruct the req.body so that we dont use req.body all the time
    const {
      firstName,
      lastName,
      email,
      password,
      birthDate,
      gender
    } = req.body;

    try {
      // check if a user with same email exists
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ errors: [{ message: 'User already exists' }] });
      }
      // create a user instance
      user = new User({
        firstName,
        lastName,
        email,
        password,
        birthDate,
        gender
      });

    

      // format the date so it will be compatible with mongoDB
      user.birthDate = new Date(moment(birthDate, 'DD-MM-YYYY')).setHours(3);

      // create "salt" in order to use it to hash the password
      const salt = await bcrypt.genSalt(10);
      // here we hash the password
      user.password = await bcrypt.hash(password, salt);
      // and try to save the user in our db
      await user.save();

      // create a payload for our jwt token witch will include the user id that we will need in order to get all user's fields in auth.js
      const payload = {
        user: {
          id: user.id
        }
      };

      // we create and sign out jwt token using our secret in config/default.json (we get the value using config packet)
      // assign a expiration value and return the token back so that we can get it from the front-end and assign  it to our headers
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
