// routes/api.js - API routes
const express = require('express');
const router = express.Router();
const { generateRecipe } = require('../services/recipe')

// GET /api
router.get('/', (req, res) => {
  res.json({ message: 'API is working' });
});

// GET /api/recipe
// Example: /api/recipe?query=pasta
router.post('/recipe', async (req, res) => {
  try {
    const { query } = req.body;

    // Input validation
    if (!query) {
      return res.status(400).json({ 
        error: 'Missing query parameter. Please provide a dish or ingredients.' 
      });
    }
    
    // Mock function to generate recipe (replace with Claude API call later)
    const recipe = await generateRecipe(query);
    
    res.json({ recipe });
  } catch (error) {
    console.error('Error processing recipe request:', error);
    res.status(500).json({ error: 'Failed to process recipe request' });
  }
});

module.exports = router