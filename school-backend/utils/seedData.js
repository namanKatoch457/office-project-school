const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Student = require('../models/Student');
const Announcement = require('../models/Announcement');

// Load env variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connection successful for seeding'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Sample student data
const students = [
  {
    name: 'John Smith',
    birthday: new Date(2010, 3, 14), // April 14, 2010 (today's date)
    class: '7',
    section: 'A',
    profileImage: 'https://res.cloudinary.com/demo/image/upload/v1580125763/samples/people/boy-snow-hoodie.jpg'
  },
  {
    name: 'Emma Johnson',
    birthday: new Date(new Date().getFullYear() - 10, new Date().getMonth(), new Date().getDate()), // Today's date 10 years ago
    class: '8',
    section: 'B',
    profileImage: 'https://res.cloudinary.com/demo/image/upload/v1580125763/samples/people/smiling-man.jpg'
  },
  {
    name: 'Sophia Williams',
    birthday: new Date(2011, 6, 22), // July 22, 2011
    class: '6',
    section: 'C',
    profileImage: 'https://res.cloudinary.com/demo/image/upload/v1580125763/samples/people/jazz.jpg'
  }
];

// Sample announcement data
const announcements = [
  {
    title: 'School Annual Day',
    content: 'The school annual day will be celebrated on December 15th. All parents are invited.',
    category: 'event',
    publishedBy: 'Principal',
    featured: true
  },
  {
    title: 'Holiday Notice',
    content: 'The school will remain closed from May 15th to June 15th for summer vacation.',
    category: 'holiday',
    publishedBy: 'Administration',
    featured: false
  },
  {
    title: 'Sports Tournament Results',
    content: 'Congratulations to Blue House for winning the inter-house sports tournament!',
    category: 'sports',
    publishedBy: 'Sports Department',
    featured: true
  }
];

// Seed function
const seedData = async () => {
  try {
    // Clear existing data
    await Student.deleteMany({});
    await Announcement.deleteMany({});
    
    console.log('Previous data cleared');
    
    // Insert new data
    await Student.insertMany(students);
    await Announcement.insertMany(announcements);
    
    console.log('Database seeded successfully!');
    console.log(`Added ${students.length} students`);
    console.log(`Added ${announcements.length} announcements`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder
seedData(); 