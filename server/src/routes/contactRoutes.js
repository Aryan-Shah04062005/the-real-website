const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const { submitContact, getContacts, updateContactStatus } = require('../controllers/contactController');

router.post('/', submitContact);
router.get('/', protect, admin, getContacts);
router.put('/:id', protect, admin, updateContactStatus);

module.exports = router;
