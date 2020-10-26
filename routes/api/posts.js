const express = require('express');
const router = express.Router();

// @ROUTE -- GET api/posts
// @DESC  -- Test route
// @ACCESS -- Public

router.get('/', (req, res) => {
  res.send('Posts route');
});

module.exports = router;
