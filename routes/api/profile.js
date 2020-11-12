const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @ROUTE -- GET api/profiles/me
// @DESC  -- Gets the user's profile
// @ACCESS -- Private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['firstName']);

    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'There is no profile for this user.' });
    }

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @ROUTE -- POST api/profiles/
// @DESC  -- Creates or update a profile
// @ACCESS -- Private
//  location bio interests visitedCountries travelExperience
router.post(
  '/',
  [
    auth,
    [
      check('location', 'Location is Required').not().isEmpty(),
      check('bio', 'Bio is required').not().isEmpty(),
      check('interests', 'Interests is required').not().isEmpty(),
      check('visitedCountries', 'Please select one country you have visited ')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const { location, bio, interests, visitedCountries } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (interests) profileFields.interests = interests;
    if (visitedCountries) {
      console.log(visitedCountries);

      if (Array.isArray(visitedCountries)) {
        profileFields.visitedCountries = visitedCountries.map(country =>
          country.trim()
        );
      } else {
        profileFields.visitedCountries = visitedCountries
          .split(',')
          .map(country => country.trim());
      }

      console.log(profileFields.visitedCountries);
    }
    if (profileFields.visitedCountries) {
      if (profileFields.visitedCountries.length >= 30)
        profileFields.travelExperience = 10;
      else if (profileFields.visitedCountries.length >= 25)
        profileFields.travelExperience = 9;
      else if (profileFields.visitedCountries.length >= 20)
        profileFields.travelExperience = 8;
      else if (profileFields.visitedCountries.length >= 17)
        profileFields.travelExperience = 7;
      else if (profileFields.visitedCountries.length >= 15)
        profileFields.travelExperience = 6;
      else if (profileFields.visitedCountries.length >= 12)
        profileFields.travelExperience = 5;
      else if (profileFields.visitedCountries.length >= 9)
        profileFields.travelExperience = 4;
      else if (profileFields.visitedCountries.length >= 6)
        profileFields.travelExperience = 3;
      else if (profileFields.visitedCountries.length >= 3)
        profileFields.travelExperience = 2;
      else profileFields.travelExperience = 1;
    }

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        // update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json({ profile });
      }
      // create
      profile = new Profile(profileFields);
      await profile.save();
      res.json({ profile });
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @ROUTE -- /api/profiles
// @DESC  -- Get all profiles
// @ACCESS -- Public

router.get('/', async (req, res) => {
  try {
    // get all profiles and the user's first name and last name
    const profiles = await Profile.find().populate('user', [
      'firstName',
      'lastName'
    ]);
    //return all profiles
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @ROUTE -- GET /api/profiles/:user_id
// @DESC  -- Get a user's profiles
// @ACCESS -- Public

router.get('/:user_id', async (req, res) => {
  try {
    const profile = await await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['firstName', 'lastName', 'birthDate']);

    if (!profile) {
      res.status(400).json({ msg: 'Profile does not exist !' });
    }

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    if ((err.kind = 'ObjectId'))
      res.status(400).json({ msg: 'Profile does not exist !' });
    res.status(500).send('Server Error');
  }
});

// @ROUTE -- DELETE /api/profiles
// @DESC  -- Delete a user's profiles and the user
// @ACCESS -- Public

router.delete('/', auth, async (req, res) => {
  try {
    await Post.deleteMany({ user: req.user.id });
    // delete user's profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'Account deleted.' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
