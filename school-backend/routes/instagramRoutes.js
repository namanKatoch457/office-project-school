const express = require('express');
const router = express.Router();
const instagramController = require('../controllers/instagramController');

// Get Instagram feed
router.get('/feed', instagramController.getInstagramFeed);

// Get Instagram account info
router.get('/account', instagramController.getInstagramAccount);

module.exports = router; 