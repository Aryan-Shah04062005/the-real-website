const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
  getFounder, updateFounder,
  getServices, createService, updateService, deleteService,
  getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial,
  getProjects, createProject, updateProject, deleteProject,
  getBlogs, createBlog, updateBlog, deleteBlog
} = require('../controllers/contentController');

// Public Routes
router.get('/founder', getFounder);
router.get('/services', getServices);
router.get('/testimonials', getTestimonials);
router.get('/projects', getProjects);
router.get('/blogs', getBlogs);

// Protected Admin Routes
router.put('/founder', protect, admin, updateFounder);

router.post('/services', protect, admin, createService);
router.put('/services/:id', protect, admin, updateService);
router.delete('/services/:id', protect, admin, deleteService);

router.post('/testimonials', protect, admin, createTestimonial);
router.put('/testimonials/:id', protect, admin, updateTestimonial);
router.delete('/testimonials/:id', protect, admin, deleteTestimonial);

router.post('/projects', protect, admin, createProject);
router.put('/projects/:id', protect, admin, updateProject);
router.delete('/projects/:id', protect, admin, deleteProject);

router.post('/blogs', protect, admin, createBlog);
router.put('/blogs/:id', protect, admin, updateBlog);
router.delete('/blogs/:id', protect, admin, deleteBlog);

module.exports = router;
