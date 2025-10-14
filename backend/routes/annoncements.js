const express = require('express');
const Announcement = require('../models/Announcement');
const router = express.Router();

// Get all announcements
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .populate('createdBy', 'firstName lastName')
      .sort({ createdAt: -1 });
    
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create announcement (Admin only)
router.post('/', async (req, res) => {
  try {
    const announcement = new Announcement(req.body);
    await announcement.save();
    
    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;