const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Announcement title is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Announcement content is required'],
    },
    category: {
      type: String,
      enum: ['event', 'academic', 'sports', 'general', 'holiday'],
      default: 'general',
    },
    image: {
      type: String, // Cloudinary URL
    },
    cloudinary_id: {
      type: String,
    },
    expiresAt: {
      type: Date,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    publishedBy: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Method to check if announcement is expired
announcementSchema.methods.isExpired = function () {
  if (!this.expiresAt) return false;
  
  return new Date() > this.expiresAt;
};

// Query middleware to find only active and non-expired announcements
announcementSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ 
    active: true,
    $or: [
      { expiresAt: { $exists: false } },
      { expiresAt: { $gt: new Date() } }
    ]
  });
  next();
});

// Create indexes for efficient queries
announcementSchema.index({ category: 1 });
announcementSchema.index({ featured: 1 });
announcementSchema.index({ createdAt: -1 }); // Latest first
announcementSchema.index({ expiresAt: 1 });

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement; 