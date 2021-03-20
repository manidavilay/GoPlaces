const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const user = require('../models/user');

const router = express.Router();

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User created!',
            result
          });
        })
        .catch(error => {
          res.status(422).json({
            error
          });
        });
    });
});

router.post('/login', (req, res, next) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.status(401).json({
        message: "Authentication failed !"
      });
    }
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    if (!result) {
      return res.status(401).json({
        message: "Authentication failed !"
      });
    }
    const token = jwt.sign(
      { email: user.email, userId: user._id },
      'ZErdvygygyf34gujijojnbyfy12AEfyj',
      { expiresIn: '1h' }
    );
    res.status(200).json({
      token: token,
      message: "Authenticated !",
      expiresIn: 3600
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: "Authentication failed !"
    });
  });
});

// router.post('/profile', (req, res, next) => {
//   const profile = new Profile({
//     lastname: req.body.lastname,
//     firstname: req.body.firstname
//   })
//   profile.save().then(createdProfile => {
//     res.status(201).json({
//       message: 'Informations added successfully',
//       profileId: createdProfile._id
//     })
//   })
// });

module.exports = router;
