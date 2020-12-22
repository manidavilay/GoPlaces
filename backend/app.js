const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

const app = express();

mongoose
  .connect(
    'mongodb+srv://many:5hi7jeTAY77DBk9M@cluster0.hplm9.mongodb.net/app-perso?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Connected to database !');
  })
  .catch(() => {
    console/log('Connection failed');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/user', userRoutes);

module.exports = app;
