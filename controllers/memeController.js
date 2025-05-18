const Meme = require('../models/Meme');
const cloudinary = require('../config/cloudinary');
const axios = require("axios");


// Generate text meme (existing functionality)
exports.generateTextMeme = async (req, res) => {
  try {
    
    const { theme } = req.body;

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        contents: [{ parts: [{ text: `Write a single funny meme about: ${theme}` }] }],
      }
    );
    console.log("heyy");
    const memeText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Couldn't generate meme.";
    console.log(memeText);
    res.json({ success: true, memeText: memeText });
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message || error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Generate image meme (existing functionality)
exports.generateImageMeme = async (req, res) => {
  try {
    const { prompt } = req.body;
    // Your existing image generation logic here
    res.json({ success: true, imageUrl: "generated_image_url.jpg" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Share meme to community

exports.shareMeme = async (req, res) => {
  try {
    const { imageData, text, theme, creator } = req.body;
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(imageData, {
      folder: 'memes',
      resource_type: 'image',
      quality: 'auto:good' // Optimize image quality
    });

    // Save to database
    const newMeme = new Meme({
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id, // Store for future deletion
      text,
      theme,
      creator,
      likes: 0
    });

    await newMeme.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Meme shared successfully',
      meme: newMeme
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to share meme',
      error: error.message
    });
  }
};

// Get all shared memes
exports.getSharedMemes = async (req, res) => {
  try {
    const memes = await Meme.find().sort({ createdAt: -1 });
    res.json({ success: true, memes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Vote on a meme
exports.voteOnMeme = async (req, res) => {
  try {
    const { id } = req.params; // Get meme ID from URL
    const { voteType } = req.body; // 'like' or 'dislike'

    if (!['like', 'dislike'].includes(voteType)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid vote type' 
      });
    }

    const meme = await Meme.findById(id);
    if (!meme) {
      return res.status(404).json({ 
        success: false, 
        message: 'Meme not found' 
      });
    }

    // Update likes
    meme.likes += voteType === 'like' ? 1 : -1;
    meme.likes = Math.max(0, meme.likes); // Prevent negative likes
    
    await meme.save();
    
    res.json({ 
      success: true, 
      likes: meme.likes,
      message: 'Vote recorded successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};