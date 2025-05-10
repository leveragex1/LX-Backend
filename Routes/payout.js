const express = require('express');
const router = express.Router();
const User = require('../Models/userModel');

// Get payout status for a specific user
router.get("/users/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });
  
      // Send only the payoutEnabled status
      res.json({ payoutEnabled: user.payoutEnabled });
    } catch (err) {
      console.error("Error fetching user:", err);
      res.status(500).json({ error: "Server error" });
    }
  });

// Admin updates payout status for a user
router.put('/:userId', async (req, res) => {
    const { payoutEnabled } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { payoutEnabled },
            { new: true }
        );
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ message: `Payout ${payoutEnabled ? 'enabled' : 'disabled'} for user.` });
    } catch (error) {
        res.status(500).json({ message: 'Error updating payout status' });
    }
});

module.exports = router;
