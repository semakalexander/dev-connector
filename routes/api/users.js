const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const keys = require('../../config/keys');
const User = require('../../models/User');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const router = express.Router();

// @route  api/users/test
// @desc   tests users route
// @access public
router.get('/test', (req, res) => res.json({ msg: 'users' }));

// @route  api/users/register
// @desc   register user
// @access public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, name, password } = req.body;

  User.findOne({ email }).then(user => {
    if (user) {
      errors.email = 'email alredy exists';
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(email, {
        s: '200', // size
        r: 'pg', // rate
        d: 'mm' // default img (mystery man)
      });

      const newUser = new User({
        name,
        email,
        password,
        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route api/users/login
// @desc login user / returns JWT token
// @access public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'User is not found';
      return res.status(404).json(errors);
    }

    bcrypt
      .compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          const payload = { id: user.id, name: user.name, avatar: user.avatar };
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 60 * 60 },
            (err, token) => {
              res.json({
                success: true,
                token: `Bearer ${token}`,
                user: {
                  email: user.email,
                  name: user.name,
                  avatar: user.avatar
                }
              });
            }
          );
        } else {
          errors.password = 'Password is incorrect';
          return res.status(400).json(errors);
        }
      })
      .catch(err => console.log(err));
  });
});

// @route api/users/current
// @desc returns the current user
// @access private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { id, name, email } = req.user;
    res.json({
      id,
      name,
      email
    });
  }
);

module.exports = router;
