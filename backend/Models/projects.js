const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  requiredSkills: {
    type: [String], 
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  fulfilled: {
    type: Boolean,
    default: false  //false = live, true = completed
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date, 
    default: Date.now
  }
});

module.exports = mongoose.model('Project', projectSchema);
