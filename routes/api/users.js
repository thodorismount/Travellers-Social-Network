const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const moment = require('moment');
const auth = require('../../middleware/auth');

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
        res.status(400).json({
          errors: [{ msg: 'Email is already used, try using another email.' }]
        });
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

// @ROUTE -- POST api/users/changePassword
// @DESC  -- Change a users password
// @ACCESS -- private

router.post(
  '/changePassword',
  [
    auth,
    [
      // CHECK IF ALL FIELDS WERE SENT CORRECTLY
      check(
        'oldPassword',
        'Old password must be filled in order to continue'
      ).isLength({ min: 6 }),
      check(
        'newPassword',
        'Please enter a 6 or more digit new password'
      ).isLength({ min: 6 }),
      check(
        'confirmNewPassword',
        'Please enter a 6 or more digit confirm password '
      )
        .isLength({ min: 6 })
        .custom((value, { req }) => {
          if (value !== req.body.newPassword) {
            throw new Error("Passwords don't match");
          } else {
            return value;
          }
        })
    ]
  ],
  async (req, res) => {
    // check if we have any errors from the field validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // we deconstruct the req.body
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    // steps
    // get user's old password from db
    // check if old password mathces hashed password
    // if it matches create hash  and hash the new password
    // update user's old  password with new hashed password
    try {
      // we get the old password from the user
      let user = await User.findById(req.user.id).select('password');
      // check if old password mathces hashed password
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        res
          .status(400)
          .json({ errors: [{ msg: 'Your request has been declined.' }] });
      }
      // if it matches create hash and hash the new password
      // create salt for new password
      const salt = await bcrypt.genSalt(10);
      // hashing the password
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      // update user's old  password with new hashed password
      user = await User.findByIdAndUpdate(
        req.user.id,
        { password: hashedPassword },
        { new: true }
      );

      res.json(user.firstName);
    } catch (err) {
      console.log(err);
      res.status(500).send('Server error');
    }
  }
);

// @ROUTE -- POST api/users/updateAccount
// @DESC  -- Change a users password
// @ACCESS -- private

router.post(
  '/updateAccount',
  [
    auth,
    [
      // CHECK IF ALL FIELDS WERE SENT CORRECTLY
      check('firstName', 'First name is required').trim().not().isEmpty(),
      check('lastName', 'Last name is required').trim().not().isEmpty(),
      check(
        'password',
        'Please enter a password with 6 or more characters'
      ).isLength({ min: 6 }),
      check('birthDate', 'Please select a birth date').not().isEmpty(),
      check('gender', 'Please select your gender').not().isEmpty()
    ]
  ],
  async (req, res) => {
    // check if we have any errors from the field validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // we deconstruct the req.body
    const { firstName, lastName, password, birthDate, gender } = req.body;

    // steps
    // check if user exists just for security issues
    // check if password mathces the db password
    // modify the date with moment
    //update account fields

    try {
      // check if user exists just for security issues
      let user = await User.findById(req.user.id);

      if (!user) {
        res.status(400).json({
          errors: [{ msg: 'An error has occured, please try again.' }]
        });
      }
      // check if password mathces the db password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(400).json({
          errors: [{ msg: 'An error has occured, please try again.' }]
        });
      }
      // modify the date with moment
      let newBirthDate = new Date(moment(birthDate, 'DD-MM-YYYY')).setHours(3);

      // create account fields  object,
      let accountFields = {
        firstName,
        lastName,
        birthDate,
        gender
      };

      // update user

      user = await User.findByIdAndUpdate(req.user.id, accountFields, {
        new: true
      }).select('-password');

      // update name to all posts
      let posts = await Post.updateMany(
        { user: req.user.id },
        { $set: { firstName: firstName, lastName: lastName } }
      );

      res.json(user);
    } catch (error) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
