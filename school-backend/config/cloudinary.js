const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config();

// Configure Cloudinary with credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure storage for student profile photos
const studentProfileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'school-website/students',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});

// Configure storage for announcement images
const announcementImageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'school-website/announcements',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 1200, height: 800, crop: 'limit' }],
  },
});

// Set up multer middlewares for different types of uploads
const uploadStudentProfile = multer({ storage: studentProfileStorage });
const uploadAnnouncementImage = multer({ storage: announcementImageStorage });

module.exports = {
  cloudinary,
  uploadStudentProfile,
  uploadAnnouncementImage,
}; 