const mongoose = require('mongoose');

const founderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String, required: true },
  title: { type: String, required: true },
  avatarUrl: { type: String },
  socialLinks: {
    linkedin: String,
    twitter: String,
    github: String,
    instagram: String
  },
  stats: {
    projectsCompleted: { type: Number, default: 0 },
    experienceYears: { type: Number, default: 0 },
    clientSatisfaction: { type: String, default: '100%' }
  }
}, { timestamps: true });

module.exports = mongoose.model('Founder', founderSchema);
