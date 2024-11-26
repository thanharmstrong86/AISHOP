const About = require('../models/About');

// Get About Content
exports.getAboutContent = async (req, res) => {
  try {
    const about = await About.findOne(); // Assuming only one About content exists
    res.json(about);
  } catch (error) {
    console.error('Error fetching About content:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update About Content
exports.updateAboutContent = async (req, res) => {
  const { content } = req.body;

  try {
    const about = await About.findOneAndUpdate(
      {},
      { content, updatedAt: Date.now() },
      { new: true, upsert: true } // Create if it doesn't exist
    );
    res.json(about);
  } catch (error) {
    console.error('Error updating About content:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
