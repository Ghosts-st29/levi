const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find()
      .populate('createdBy', 'firstName lastName')
      .sort({ date: 1 });
    
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create event (Admin only)
router.post('/', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;