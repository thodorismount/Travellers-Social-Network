const express = require('express');
const router = express.Router();

// @ROUTE -- GET api/users
// @DESC  -- Test route
// @ACCESS -- Public
router.get('/', (req, res) => {
  res.send('User route');
});

module.exports = router;
