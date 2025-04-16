const Announcement = require('../models/Announcement');
const { cloudinary } = require('../config/cloudinary');

// Get all announcements
exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      status: 'success',
      results: announcements.length,
      data: announcements
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get recent announcements (within last 30 days)
exports.getRecentAnnouncements = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const announcements = await Announcement.find({
      createdAt: { $gte: thirtyDaysAgo },
      active: true
    }).sort({ createdAt: -1 }); // Latest first
    
    res.status(200).json({
      status: 'success',
      results: announcements.length,
      data: announcements
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get featured announcements
exports.getFeaturedAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({
      featured: true,
      active: true
    }).sort({ createdAt: -1 });
    
    res.status(200).json({
      status: 'success',
      results: announcements.length,
      data: announcements
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get announcements by category
exports.getAnnouncementsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    const announcements = await Announcement.find({
      category,
      active: true
    }).sort({ createdAt: -1 });
    
    res.status(200).json({
      status: 'success',
      results: announcements.length,
      data: announcements
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get a specific announcement
exports.getAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    
    if (!announcement) {
      return res.status(404).json({
        status: 'fail',
        message: 'Announcement not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: announcement
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Create a new announcement
exports.createAnnouncement = async (req, res) => {
  try {
    const newAnnouncement = await Announcement.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: newAnnouncement
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Upload announcement image
exports.uploadAnnouncementImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'fail',
        message: 'No file uploaded'
      });
    }
    
    const announcementId = req.params.id;
    const announcement = await Announcement.findById(announcementId);
    
    if (!announcement) {
      return res.status(404).json({
        status: 'fail',
        message: 'Announcement not found'
      });
    }
    
    // If announcement already has an image, delete the old one
    if (announcement.cloudinary_id) {
      await cloudinary.uploader.destroy(announcement.cloudinary_id);
    }
    
    // Update announcement with new image data
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      announcementId,
      {
        image: req.file.path,
        cloudinary_id: req.file.filename
      },
      { new: true }
    );
    
    res.status(200).json({
      status: 'success',
      data: updatedAnnouncement
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update an announcement
exports.updateAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!announcement) {
      return res.status(404).json({
        status: 'fail',
        message: 'Announcement not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: announcement
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Delete an announcement (soft delete)
exports.deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );
    
    if (!announcement) {
      return res.status(404).json({
        status: 'fail',
        message: 'Announcement not found'
      });
    }
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
}; 