const express = require('express');
const Announcement = require('../models/Announcement');
const auth = require('../middleware/auth'); // Add this line
const router = express.Router();

// Get all announcements (public - no auth needed)
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

// Create announcement (Admin only) - ADD AUTH
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const announcement = new Announcement({
      ...req.body,
      createdBy: req.user.userId
    });
    await announcement.save();
    
    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete announcement (Admin only) - ADD THIS ROUTE
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }
    
    res.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;