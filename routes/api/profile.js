const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
//const Post = require('../../models/Post');

// @ROUTE -- GET api/profiles/me
// @DESC  -- Gets the user's profile
// @ACCESS -- Private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name']);

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

// @ROUTE -- POST api/profiles/createProfile
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
      check('interests', 'Interests is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const {
      location,
      bio,
      interests,
      visitedCountries,
      travelExperience
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (interests) profileFields.interests = interests.split(',');
    if (visitedCountries)
      profileFields.visitedCountries = visitedCountries
        .split(',')
        .map(country => country.trim());
    if (travelExperience) profileFields.travelExperience = travelExperience;

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

// @ROUTE -- GET /api/profiles/user/:user_id
// @DESC  -- Get a user's profiles
// @ACCESS -- Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['firstName', 'lastName']);

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
    //await Post.deleteMany({ user: req.user.id });
    // delete user's profile
    await Profile.findByIdAndRemove({ user: req.user.id });
    // delete User
    await User.findByIdAndRemove({ _id: req.user.id });

    res.json({ msg: 'Account deleted.' });
  } catch (error) {}
});

module.exports = router;
