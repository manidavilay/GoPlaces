const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

// Create user
router.post('/signup', (req, res) => {
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
  })
  .catch(error => {
    res.status(422).json({
      error
    });
  });
});

// Log user
router.post('/login', (req, res) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
  .then(user => {
    if (!user) {
      return res.status(401).json({
        message: "Authentication failed !"
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    if (!result) {
      return res.status(401).json({
        message: "Authentication failed !"
      });
    }
    const token = jwt.sign(
      { email: fetchedUser.email, userId: fetchedUser._id },
      'ZErdvygygyf34gujijojnbyfy12AEfyj',
      { expiresIn: '1h' }
    );
    res.status(200).json({
      token: token,
      message: "Authenticated !",
      expiresIn: 3600,
      userId: fetchedUser._id
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: "Authentication failed !",
      err
    });
  });
});

// Get user by id
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
  .then(user => {
    if (user) {
      res.status(200).json({
        message: "User fetched successfully!",
        posts: user
      });
    } else {
      res.status(400).json({
        message: 'User not found!'
      });
    }
  });
});

// Update user by id
router.put('/:id', checkAuth, (req, res) => {
  User.findById(req.params.id).then(user => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      if (req.body.lastname == null) {
        user.lastname = user.lastname
      } else {
        user.lastname = req.body.lastname
      }
      if (req.body.firstname == null) {
        user.firstname = user.firstname
      } else {
        user.firstname = req.body.firstname
      }
      if (req.body.password == null) {
        user.password = user.password
      } else {
        user.password = hash
      }
      user.save()
      .then(updatedUser => {
        return res.status(200).json({
          message: 'User updated and saved!',
          data: updatedUser,
          err: null
        });
      })
      .catch(err => {
        return res.status(401).json({
          message: 'User not saved!',
          data: null,
          err: err
        });
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: 'User not updated!',
        data: null,
        err: err
      });
    });
  });
});

// Delete user by id
router.delete('/:id', checkAuth, (req, res) => {
  User.deleteOne({ _id: req.params.id })
  .then(result => {
    res.status(200).json({
      message: 'User deleted!',
      result
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: 'User not deleted!',
      data: null,
      err
    });
  });
});

module.exports = router;
