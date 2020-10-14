const express = require('express');
const firebase = require('firebase');
const router = express.Router();
const config = require('../../config/config');
const { check, validationResult } = require('express-validator');
const { db, admin } = require('../../config/db');

// @ROUTE -- /api/users/createUser
// @DESC  -- Create a user instance in firebase and return his auth token
// @ACCESS -- Public

router.post(
  '/signup',
  [
    // check if all fields are filled properly and check if passwors match
    check('name', 'Name field is required').trim().not().isEmpty(),
    check('surname', 'Surname field is required').trim().not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters')
      .isLength({ min: 6 })
      // check if passwords match
      .custom((value, { req }) => {
        if (value !== req.body.confirmPassword) {
          // trow error if passwords do not match
          throw new Error("Passwords don't match");
        } else {
          return value;
        }
      }),
    check(
      'confirmPassword',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('birthDate', 'Please select a birth date').trim().not().isEmpty(),
    check('gender', 'Please select a gender').not().isEmpty(),
    check('handle', 'Handle is required').trim().not().isEmpty()
  ],
  (req, res) => {
    //   get all errors from express validator
    const errors = validationResult(req);
    // check if there are any errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const noImg = 'no-image.png';

    // deconstruct req.body
    const {
      name,
      surname,
      email,
      password,
      confirmPassword,
      birthDate,
      gender,
      handle
    } = req.body;

    const newUser = {
      email,
      password,
      confirmPassword,
      handle
    };

    let token, userId;
    db.doc(`/users/${newUser.handle}`)
      .get()
      .then(doc => {
        // check if a user with the same handle exists
        if (doc.exists) {
          return res
            .status(400)
            .json({ handle: 'This handle is already taken' });
        }
        // if he doesnt exist  then we can continue to his creation
        else {
          // save
          return firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password);
        }
      })
      .then(data => {
        //  we store the user id from the auth
        userId = data.user.uid;
        return data.user.getIdToken();
      })
      .then(idToken => {
        token = idToken;
        const userCredentials = {
          handle,
          name,
          surname,
          email,
          birthDate,
          gender,
          createdAt: new Date().toISOString(),
          imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
          userId
        };
        return db.doc(`/users/${newUser.handle}`).set(userCredentials);
      })
      .then(() => {
        return res.status(201).json({ token });
      })
      .catch(err => {
        console.log(err);
        if (err.code === 'auth/email-already-in-use') {
          return res.status(400).json({ email: 'Email is already in user' });
        }
        return res.status(500).json({ error: err.code });
      });
  }
);

module.exports = router;
