# School Website Backend API

A comprehensive Node.js backend API built with Express.js and MongoDB for a school website. This API provides endpoints for student birthdays, school announcements, and Instagram feed integration.

## Features

- **Student Birthdays API**: Fetch students with birthdays today
- **Announcements API**: Manage and retrieve school announcements
- **Instagram Feed Integration**: Fetch latest posts from the school's Instagram account
- **Image Storage**: Cloudinary integration for image uploads
- **Security**: Implementation of secure practices with Helmet, rate limiting, etc.

## Prerequisites

- Node.js (v14+)
- MongoDB (local installation or MongoDB Atlas account)
- Cloudinary account (for image uploads)
- Instagram Business account and API access (for Instagram feed)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd school-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/school_website
   MONGODB_URI_PROD=mongodb+srv://<your-mongodb-atlas-uri>
   
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
   
   INSTAGRAM_ACCESS_TOKEN=<your-instagram-access-token>
   INSTAGRAM_BUSINESS_ACCOUNT_ID=<your-instagram-account-id>
   ```

## Running the Server

### Development Mode
```
npm run dev
```

### Production Mode
```
npm start
```

### Debug Mode
```
npm run debug
```

## API Endpoints

### Students API

- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get a specific student
- `GET /api/students/birthdays/today` - Get students with birthdays today
- `POST /api/students` - Create a new student
- `PATCH /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student (soft delete)
- `POST /api/students/:id/upload-profile` - Upload student profile photo

### Announcements API

- `GET /api/announcements` - Get all announcements
- `GET /api/announcements/:id` - Get a specific announcement
- `GET /api/announcements/recent` - Get recent announcements (last 30 days)
- `GET /api/announcements/featured` - Get featured announcements
- `GET /api/announcements/category/:category` - Get announcements by category
- `POST /api/announcements` - Create a new announcement
- `PATCH /api/announcements/:id` - Update an announcement
- `DELETE /api/announcements/:id` - Delete an announcement (soft delete)
- `POST /api/announcements/:id/upload-image` - Upload announcement image

### Instagram API

- `GET /api/instagram/feed` - Get Instagram feed
- `GET /api/instagram/account` - Get Instagram account info

## Integration with Frontend

To connect this backend with a React frontend, use Axios or fetch API to make requests to these endpoints. Example:

```javascript
// Using Axios
import axios from 'axios';

// Get students with birthdays today
const fetchBirthdayStudents = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/students/birthdays/today');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching birthday students:', error);
    return [];
  }
};

// Get recent announcements
const fetchRecentAnnouncements = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/announcements/recent');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return [];
  }
};

// Get Instagram feed
const fetchInstagramFeed = async (limit = 6) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/instagram/feed?limit=${limit}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching Instagram feed:', error);
    return [];
  }
};
```

## License

[MIT](LICENSE) 