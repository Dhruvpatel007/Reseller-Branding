const express = require('express');
const router = express.Router();
const User = require('../models/user');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
require('dotenv').config();

router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    const payload = {
      user: {
        id: user._id,
        client: user.client,
        name: user.name
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;

