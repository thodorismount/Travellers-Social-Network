const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');

// @ROUTE -- POST api/posts
// @DESC  -- Create a post
// @ACCESS -- private

router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required').trim().not().isEmpty(),
      check('location', 'A location is required to create a new post')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Get user's info except password to pass into the post

    // TODO: add post image when  images get implemented

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        location: req.body.location,
        firstName: user.firstName,
        lastName: user.lastName,
        //useravatar to be added
        user: req.user.id
      });

      //Save Post

      post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @ROUTE -- UPDATE api/posts/:id
// @DESC  -- Update Post
// @ACCESS -- private
router.post(
  '/:id',
  [
    auth,
    [
      check('text', 'Text is required').trim().not().isEmpty(),
      check('location', 'A location is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }

      const postFields = {
        user: req.user.id,
        text: req.body.text,
        location: req.body.location,
        updatedAt: Date.now()
      };

      if (post) {
        // UPDATE POST
        let post = await Post.findByIdAndUpdate(req.params.id, postFields);
        return res.json(post);
      }
      return res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @ROUTE -- GET api/posts/pofile/:id
// @DESC  -- Get 2 first post for a user's id
// @ACCESS -- public

router.get('/profile/:id', async (req, res) => {
  try {
    const skip = 0;
    const post = await Post.find({ user: req.params.id }, undefined, {
      skip,
      limit: 5
    }).sort({ date: -1 });

    return res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId')
      res
        .status(404)
        .json({ msg: 'User profile does not exist,can not get posts.' });
    res.status(500).send('Server Error');
  }
});

// Infinite scroll fetching 2 posts each time
router.get('/profile/fetchMoreProfile/:id', async (req, res) => {
  try {
    const skip =
      req.query.skip && /^\d+$/.test(req.query.skip)
        ? Number(req.query.skip)
        : 5;

    const post = await Post.find({ user: req.params.id }, undefined, {
      skip,
      limit: 2
    }).sort({ date: -1 });

    return res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId')
      res
        .status(404)
        .json({ msg: 'User profile does not exist,can not get posts.' });
    res.status(500).send('Server Error');
  }
});

// @ROUTE -- GET api/posts
// @DESC  -- Get 2 firts post
// @ACCESS -- Public

router.get('/', async (req, res) => {
  try {
    const skip = 0;
    const post = await Post.find({}, undefined, { skip, limit: 5 }).sort({
      date: -1
    });

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/fetchMore', async (req, res) => {
  try {
    const skip =
      req.query.skip && /^\d+$/.test(req.query.skip)
        ? Number(req.query.skip)
        : 5;
    const post = await Post.find({}, undefined, { skip, limit: 5 }).sort({
      date: -1
    });

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @ROUTE -- GET api/posts/:id
// @DESC  -- Get posts by ID
// @ACCESS -- private

router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Check if post exists

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @ROUTE -- DELETE api/posts/:id
// @DESC  -- Delete a post
// @ACCESS -- private

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Check if post exists

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    //Remove Post

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @ROUTE -- Put api/posts/like/:id
// @DESC  -- Like a post
// @ACCESS -- private

router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    //Remove like and save update post

    post.likes.unshift({ user: req.user.id });
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.err(err.message);
    res.status(500).send('Server Error');
  }
});

// @ROUTE -- Put api/posts/unlike/:id
// @DESC  -- Unlike a post
// @ACCESS -- private

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    //Get remove index
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    //Remove like and update post
    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.err(err.message);
    res.status(500).send('Server Error');
  }
});

// @ROUTE -- POST api/posts/comment/:id
// @DESC  -- Comment on a post
// @ACCESS -- private

router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required').trim().not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        firstName: user.firstName,
        lastName: user.lastName,
        //useravatar to be added
        user: req.user.id
      };

      post.comments.unshift(newComment);

      post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @ROUTE -- DELETE api/posts/comment/:id/:comment_id
// @DESC  -- Delete comment
// @ACCESS -- private

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Pull out comment
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    //Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    //Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    //Get remove index
    const removeIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);

    //Remove comment

    post.comments.splice(removeIndex, 1);

    //Update post comment list

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
