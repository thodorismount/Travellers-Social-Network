const express = require('express');
const router = express.Router();

// @ROUTE -- GET api/profile
// @DESC  -- Test route
// @ACCESS -- Public

router.get('/', (req, res) => {
  res.send('Profile route');
});

module.exports = router;
