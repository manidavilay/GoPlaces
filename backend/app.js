const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

const app = express();

// function cors(req, res, nxt) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent');
//   if(req.method === 'OPTIONS') {
//       res.sendStatus(204);
//   }
//   else {
//       nxt();
//   }
// }

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
