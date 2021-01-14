const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

const app = express();

app.use(cors());

mongoose
  .connect(
    'mongodb+srv://many:5hi7jeTAY77DBk9M@cluster0.hplm9.mongodb.net/app-perso?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log('Connected to database !');
  })
  .catch(() => {
    console.log('Connection failed');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/user', userRoutes);

module.exports = app;
