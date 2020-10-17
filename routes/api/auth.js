const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @ROUTE -- GET api/auth
// @DESC  -- Test route
// @ACCESS -- Public

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

// TODO: Create Login Route , (require auth )

// @ROUTE -- POST api/auth/login
// @DESC  -- Login user and get a token back
// @ACCESS -- Public

module.exports = router;
