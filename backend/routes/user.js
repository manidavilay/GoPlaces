const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');

const router = express.Router();

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
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

// router.get('/toto', (req, res, next) => {
//   res.json({
//     toto: 'tata'
//   })
// })

module.exports = router;
