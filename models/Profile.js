const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  location: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  interests: {
    type: [String],
    required: true
  },
  visitedCountries: {
    type: [String],
    default: 1
  },
  travelExperience: {
    type: Number
  },
  lastUpdatedDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
