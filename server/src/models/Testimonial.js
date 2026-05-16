const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String },
  company: { type: String },
  content: { type: String, required: true },
  avatarUrl: { type: String },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  verified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
