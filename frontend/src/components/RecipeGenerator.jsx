import { useState } from 'react'
import RecipeCard from './RecipeCard'

const RecipeGenerator = () => {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [recipe, setRecipe] = useState(null)
  const [error, setError] = useState('')

  const handlePromptChange = (e) => {
    setPrompt(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!prompt.trim()) {
      setError('Please enter a recipe prompt.')
      return
    }

    setError('')
    setLoading(true)
    
    try {
      // Enhance the prompt to specify we want a recipe
      
      // Make GET request to API
      const isDev = import.meta.env.DEV;
      const apiBaseUrl = isDev ? 'http://localhost:3000' : ''; // Empty string for relative in prod

      const response = await fetch(`${apiBaseUrl}/api/recipe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        // Convert JSON object to string for the request body
        body: JSON.stringify({ query: prompt })
      });
      
      const recipeData = await response.json();

      console.log(recipeData)
      
      const recipe = recipeData.recipe;

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      //const data = await response.json()
      
      // For now, we'll use placeholder recipe data
      // In a real implementation, you would parse the API response
      setRecipe(recipe)
      
    } catch (error) {
      setError(`Error: ${error.message}`)
      console.error('API Request failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <header>
        <h1>TasteAlgorithm</h1>
        <p className="tagline">Create delicious recipes from simple prompts</p>
      </header>
      
      <div className="prompt-section">
        <form onSubmit={handleSubmit}>
          <textarea 
            value={prompt}
            onChange={handlePromptChange}
            placeholder="Describe what you're looking for (e.g., 'vegetarian pasta dish with mushrooms and spinach')"
          />
          <div className="button-container">
            <button type="submit" disabled={loading}>
              Generate Recipe
            </button>
          </div>
        </form>
      </div>
      
      {loading && (
        <div className="loading">
          <div className="loader"></div> Cooking up your recipe...
        </div>
      )}
      
      {error && (
        <div className="error">{error}</div>
      )}
      
      <div className="response-container">
        <h2>Your Recipe</h2>
        <div className="recipe-card-container">
          {recipe ? (
            <RecipeCard recipe={recipe} />
          ) : (
            <div className="empty-recipe-card">
              Your recipe will appear here
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RecipeGenerator