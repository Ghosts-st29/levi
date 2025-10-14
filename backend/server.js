const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas');
})
.catch((err) => {
  console.log('❌ MongoDB Atlas connection error:', err);
});

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'IFT Backend is running! 🚀',
    version: '1.0.0',
    database: 'MongoDB Atlas',
    endpoints: [
      '/api/announcements',
      '/api/events', 
      '/api/auth/signup',
      '/api/auth/login',
      '/api/auth/create-admin'
    ]
  });
});

// Import routes
const authRoutes = require('./routes/auth');
const announcementRoutes = require('./routes/announcements');
const eventRoutes = require('./routes/events');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/events', eventRoutes);

// Add sample data route (optional)
app.post('/api/sample-data', async (req, res) => {
  try {
    // This will create sample data - you can run this once
    const Announcement = require('./models/Announcement');
    const Event = require('./models/Event');
    
    // Sample announcements
    const announcements = await Announcement.create([
      {
        title: "New Course Launch: Data Science",
        content: "We're excited to announce our new Data Science specialization course starting next month. Register now for early bird discounts.",
        category: "courses",
        priority: true
      },
      {
        title: "Platform Maintenance",
        content: "Our platform will undergo scheduled maintenance this weekend to improve performance.",
        category: "maintenance",
        priority: false
      }
    ]);

    // Sample events
    const events = await Event.create([
      {
        title: "Web Development Workshop",
        description: "Join our hands-on workshop to learn modern web development techniques.",
        date: new Date('2025-04-15'),
        category: "workshop",
        seats: 30,
        registered: 15
      },
      {
        title: "Career Fair 2025",
        description: "Connect with top employers looking for skilled graduates.",
        date: new Date('2025-05-03'),
        category: "career", 
        seats: 100,
        registered: 45
      }
    ]);

    res.json({ 
      success: true, 
      message: 'Sample data created!',
      announcements: announcements.length,
      events: events.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🎯 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 Using MongoDB Atlas`);
});