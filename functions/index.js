const functions = require('firebase-functions');
const express = require('express');

const app = express();

// initializing the root end point of point

app.use('/users', require('./routes/api/users'));

exports.api = functions.https.onRequest(app);
