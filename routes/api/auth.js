const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');

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

// TODO: Create Login Route ,

// @ROUTE -- POST api/auth/
// @DESC  -- Login user and get a token back
// @ACCESS -- Public
router.post(
    '/login',
    // check if all fields are filled properly
    [
        check('email', 'Please enter a valid email address').isEmail(),
        check('password', 'Please enter your password').exists()
    ],
    async (req, res) => {
        // check if there was an error with the parsed data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {email, password} = req.body;

        try {
            // check if a user with same email exists
            let user = await User.findOne({email});
            if (!user) {
                res.status(400).json({errors: [{message: 'Invalid Credentials'}]});
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                res.status(400).json({errors: [{message: 'Invalid Credentials'}]});
            }

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {expiresIn: 360000},
                (err, token) => {
                    if (err) throw err;
                    res.json({token});
                }
            );
        } catch (err) {
            console.log(err);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
