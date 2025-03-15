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
        - "title": (string) The name of the dish.
        - "ingredients": (array of strings) List of ingredients.
        - "instructions": (array of strings) Step-by-step instructions.
        - "servings": (integer) Number of servings.
        - "Harmful" : (boolean) if the user input/final recipe may be harmful then it should be set to true, otherwise false

        Respond **only** with valid JSON (no markdown formatting) that can be interpreted by Javascript JSON.parse() function and no additional text. 
        Please make sure that the recipe is safe, if the user asks for harmful recipes then set it true
        `;

        // Set up GPT
        const gpt = new GPT();
        const options = {
            temperature: 0.7
        };

        // Get GPT Response
        const response = await gpt.ask(prompt, "gpt-4o", options);
        //console.log(response)

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