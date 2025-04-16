const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');
const { uploadAnnouncementImage } = require('../config/cloudinary');

// Special routes
router.get('/recent', announcementController.getRecentAnnouncements);
router.get('/featured', announcementController.getFeaturedAnnouncements);
router.get('/category/:category', announcementController.getAnnouncementsByCategory);

// Announcement CRUD routes
router.route('/')
  .get(announcementController.getAllAnnouncements)
  .post(announcementController.createAnnouncement);

router.route('/:id')
  .get(announcementController.getAnnouncement)
  .patch(announcementController.updateAnnouncement)
  .delete(announcementController.deleteAnnouncement);

// Upload announcement image route
router.post(
  '/:id/upload-image',
  uploadAnnouncementImage.single('image'),
  announcementController.uploadAnnouncementImage
);

module.exports = router; 