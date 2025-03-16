// Creates recipes
const GPT = require("./gpt")

/**
 * Generates a recipe using OpenAI's GPT model based on the given input ingredient or dish name.
 * 
 * @param {string} input - The ingredient or dish name for which a recipe should be generated.
 * @returns {Promise<Object>} A Promise that resolves to an object containing the recipe details:
 *  - {string} title - The name of the dish.
 *  - {string[]} ingredients - A list of ingredients.
 *  - {string[]} instructions - Step-by-step instructions.
 *  - {number} servings - Number of servings.
 *  - {boolean} harmful - Whether the recipe might be harmful (true if dangerous, otherwise false).
 * 
 * @throws {Error} If the GPT response is not valid JSON or if an API error occurs.
 */
const generateRecipe = async (input) => {
    try {
        // Prompt 
        const prompt = `
        Generate a recipe (safe, sanitary, delicious) of or using ${input} in JSON format. The response must be valid JSON with the following fields:
        - title: (string) The name of the dish.
        - description: (string) description of the dish
        - prepTime: (string) Time it takes to prep the meal
        - cookTime: (string) Time it takes to cook the meal
        - servings: (integer) Number of servings.
        - difficulty: (string) easy, medium, or hard
        - ingredients: (array of strings) List of ingredients.
        - steps: (array of strings) Step-by-step instructions.
        - nutritionFacts: (dictionary string: integer) amount of calories, protein, carbs and fat per serving. You should calculate this as accurately as possible
        - notes: additional tips and instructions (in a refreshing and friendly tone)
        
        title: 'Delicious Recipe',
        description: "A spectacular fusion dish featuring succulent salmon fillets glazed with a spicy-sweet mango sauce, served atop a vibrant medley of colorful roasted vegetables",
        prepTime: '20 min',
        cookTime: '30 min',
        servings: 4,
        difficulty: 'Medium',
        ingredients: [
          '2 cups of ingredient 1',
          '1 tablespoon of ingredient 2',
          '3 medium ingredient 3',
          '1/4 cup of ingredient 4',
          '1 teaspoon of ingredient 5'
        ],
        steps: [
          'First step of the recipe instructions.',
          'Second step with more details about what to do.',
          'Third step explaining the cooking process.',
          'Final step with serving suggestions.'
        ],
        nutritionFacts: {
            calories: 385,
            protein: 29,
            carbs: 24,
            fat: 18
        }
        notes: 'This recipe can be stored in an airtight container for up to 3 days.'

        Respond **only** with valid JSON (no markdown formatting, just plain JSON string) that can be interpreted by Javascript JSON.parse() function and no additional text. 
        Please make sure that the recipe is safe
        `;

        // Set up GPT
        const gpt = new GPT();
        const options = {
            temperature: 0.5
        };

        // Get GPT Response
        const response = await gpt.ask(prompt, "gpt-4o", options);
        console.log(response)

        // Validate if response is valid JSON 
        let recipe;
        try {
            recipe = JSON.parse(response); // Ensures valid JSON
        } catch (jsonError) {
            throw new Error("Invalid JSON format received from GPT response.");
        }
        
        //console.log(recipe);
        return recipe

    } catch (error) {
        console.error("Error generating recipe:", error.message);
    }
    
};

generateRecipe("salmon, air fry")


module.exports = { generateRecipe }