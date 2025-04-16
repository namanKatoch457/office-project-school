const Student = require('../models/Student');
const { cloudinary } = require('../config/cloudinary');

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({ active: true });
    
    res.status(200).json({
      status: 'success',
      results: students.length,
      data: students
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get students with birthdays today
exports.getTodaysBirthdays = async (req, res) => {
  try {
    const today = new Date();
    const month = today.getMonth() + 1; // MongoDB uses 1-12 for months
    const day = today.getDate();
    
    // Find students with birthdays today (regardless of year)
    const students = await Student.find({
      $expr: {
        $and: [
          { $eq: [{ $month: '$birthday' }, month] },
          { $eq: [{ $dayOfMonth: '$birthday' }, day] }
        ]
      },
      active: true
    });
    
    // If no students have birthdays today
    if (students.length === 0) {
      return res.status(200).json({
        status: 'success',
        results: 0,
        message: 'No students have birthdays today',
        data: []
      });
    }
    
    res.status(200).json({
      status: 'success',
      results: students.length,
      message: `${students.length} student(s) have birthdays today!`,
      data: students
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get a specific student
exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        status: 'fail',
        message: 'Student not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: student
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Create a new student
exports.createStudent = async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: newStudent
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Upload student profile photo
exports.uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'fail',
        message: 'No file uploaded'
      });
    }
    
    const studentId = req.params.id;
    const student = await Student.findById(studentId);
    
    if (!student) {
      return res.status(404).json({
        status: 'fail',
        message: 'Student not found'
      });
    }
    
    // If student already has a profile image, delete the old one
    if (student.cloudinary_id) {
      await cloudinary.uploader.destroy(student.cloudinary_id);
    }
    
    // Update student with new image data
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      {
        profileImage: req.file.path,
        cloudinary_id: req.file.filename
      },
      { new: true }
    );
    
    res.status(200).json({
      status: 'success',
      data: updatedStudent
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update a student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!student) {
      return res.status(404).json({
        status: 'fail',
        message: 'Student not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: student
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Delete a student (soft delete)
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );
    
    if (!student) {
      return res.status(404).json({
        status: 'fail',
        message: 'Student not found'
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