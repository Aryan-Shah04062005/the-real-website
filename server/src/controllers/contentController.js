const Founder = require('../models/Founder');
const Service = require('../models/Service');
const Testimonial = require('../models/Testimonial');
const Project = require('../models/Project');
const Blog = require('../models/Blog');

// Generic CRUD handlers
const getAll = (Model) => async (req, res) => {
  try {
    const data = await Model.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = (Model) => async (req, res) => {
  try {
    const data = await Model.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update = (Model) => async (req, res) => {
  try {
    const data = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) return res.status(404).json({ error: 'Item not found' });
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = (Model) => async (req, res) => {
  try {
    const data = await Model.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Exports
module.exports = {
  getFounder: async (req, res) => {
    const founder = await Founder.findOne();
    res.json(founder);
  },
  updateFounder: async (req, res) => {
    const founder = await Founder.findOneAndUpdate({}, req.body, { upsert: true, new: true });
    res.json(founder);
  },
  // Services
  getServices: getAll(Service),
  createService: create(Service),
  updateService: update(Service),
  deleteService: remove(Service),
  // Testimonials
  getTestimonials: getAll(Testimonial),
  createTestimonial: create(Testimonial),
  updateTestimonial: update(Testimonial),
  deleteTestimonial: remove(Testimonial),
  // Projects
  getProjects: getAll(Project),
  createProject: create(Project),
  updateProject: update(Project),
  deleteProject: remove(Project),
  // Blogs
  getBlogs: getAll(Blog),
  createBlog: create(Blog),
  updateBlog: update(Blog),
  deleteBlog: remove(Blog),
};
