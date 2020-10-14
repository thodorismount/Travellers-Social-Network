const admin = require('firebase-admin');
const firebase = require('firebase');
const config = require('./config');

firebase.initializeApp(config);

admin.initializeApp();

const db = admin.firestore();

module.exports = { db, admin };
