const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
    },
    birthday: {
      type: Date,
      required: [true, 'Birthday is required'],
    },
    profileImage: {
      type: String, // Cloudinary URL
      default: 'https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/default-profile.jpg',
    },
    cloudinary_id: {
      type: String, // Cloudinary image ID for management
    },
    class: {
      type: String,
      required: [true, 'Class is required'],
      trim: true,
    },
    section: {
      type: String,
      required: [true, 'Section is required'],
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for full class identifier (e.g., "Class 5A")
studentSchema.virtual('classSection').get(function () {
  return `Class ${this.class}${this.section}`;
});

// Virtual to check if today is the student's birthday
studentSchema.virtual('isBirthdayToday').get(function () {
  const today = new Date();
  const birthday = new Date(this.birthday);
  
  return (
    today.getDate() === birthday.getDate() &&
    today.getMonth() === birthday.getMonth()
  );
});

// Format birthday in readable format
studentSchema.virtual('formattedBirthday').get(function() {
  return this.birthday ? new Date(this.birthday).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) : '';
});

// Create indexes for efficient queries
studentSchema.index({ name: 1 });
studentSchema.index({ birthday: 1 });
studentSchema.index({ class: 1, section: 1 });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student; 