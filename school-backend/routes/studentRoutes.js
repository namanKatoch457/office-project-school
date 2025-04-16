const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { uploadStudentProfile } = require('../config/cloudinary');

// Birthday routes
router.get('/birthdays/today', studentController.getTodaysBirthdays);

// Student CRUD routes
router.route('/')
  .get(studentController.getAllStudents)
  .post(studentController.createStudent);

router.route('/:id')
  .get(studentController.getStudent)
  .patch(studentController.updateStudent)
  .delete(studentController.deleteStudent);

// Upload profile photo route
router.post('/:id/upload-profile', uploadStudentProfile.single('profileImage'), studentController.uploadProfilePhoto);

module.exports = router; 