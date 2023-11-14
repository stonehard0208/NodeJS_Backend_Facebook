const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  
  username: {
    type: String,
    required: [true, 'Username is required']
  },
  headline: {
    type: String,
    default: 'Default headline' 
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  zipcode: {
    type: Number,
    required: [true, 'Zipcode is required']
  },
  phone: {
    type: String,
    required: [true, 'Phone is required']
  },
  dob: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  avatar: {
    type: String
  },
  following:{
    type: [String]
  },
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = profileSchema;