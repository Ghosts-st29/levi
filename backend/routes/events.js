const express = require('express');
const Event = require('../models/Event');
const auth = require('../middleware/auth'); // Add this line
const router = express.Router();

// Get all events (public - no auth needed)
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

// Create event (Admin only) - ADD AUTH
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const event = new Event({
      ...req.body,
      createdBy: req.user.userId
    });
    await event.save();
    
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete event (Admin only) - ADD THIS ROUTE
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;