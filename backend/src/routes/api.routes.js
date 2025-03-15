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
router.get('/recipe', async (req, res) => {
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

// const generateRecipe = (query) => {
//   return {
//     title: 'Simple Spaghetti Bolognese',
//     ingredients: [
//       '1 lb ground beef',
//       '1 onion, diced',
//       '2 garlic cloves, minced',
//       '1 can (14 oz) crushed tomatoes',
//       '1 tbsp tomato paste',
//       '1 tsp dried oregano',
//       '1 tsp dried basil',
//       'Salt and pepper to taste',
//       '1 lb spaghetti'
//     ],
//     instructions: [
//       'In a large pan, brown the ground beef over medium heat.',
//       'Add onion and garlic, cook until softened.',
//       'Stir in crushed tomatoes, tomato paste, and herbs.',
//       'Simmer for 20 minutes, season with salt and pepper.',
//       'Meanwhile, cook spaghetti according to package instructions.',
//       'Drain pasta and serve topped with sauce.'
//     ]
//   };
// }
module.exports = router