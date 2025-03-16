// TasteAlgorithm.js
import React, { useState, useEffect } from 'react';
import { ChefHat, Sparkles, Search, ArrowRight, Clock, Users, Heart, BookOpen, Zap, ArrowDown, Flame} from 'lucide-react';
import './TasteAlgorithm.css';

// Header Component
const Header = () => (
  <header className="app-header">
    <div className="container">
      <div className="logo-container">
        <div className="logo-icon">
          <ChefHat size={32} className="icon-white" />
        </div>
        <h1 className="app-title">
          taste<span className="app-title-accent">algorithm</span>
        </h1>
      </div>
      <p className="app-tagline">
        Experience the culinary magic where vibrant flavors meet clever code
      </p>
    </div>
  </header>
);


// Recipe Input Component
const RecipeInput = ({ prompt, setPrompt, handleGenerateRecipe, isGenerating, loadingDots }) => {
  // Handle key down events in the input field
  const handleKeyDown = (e) => {
    // Check if the key pressed is Enter and there's a valid prompt
    if (e.key === 'Enter' && prompt.trim() && !isGenerating) {
      handleGenerateRecipe();
    }
  };

  return (
    <div className="recipe-input">
      <h2 className="input-title">
        <Sparkles size={24} className="icon-yellow" />
        What culinary creation shall we conjure today?
      </h2>
      
      <div className="input-container">
        <div className="search-input-group">
          <div className="input-glow"></div>
          <div className="input-inner">
            <Search className="search-icon" size={22} />
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. A colorful summer dish with mango and salmon..."
              className="recipe-prompt-input"
            />
            <div className="input-border"></div>
          </div>
        </div>
        
        <button
          onClick={handleGenerateRecipe}
          disabled={isGenerating || !prompt.trim()}
          className={`create-button ${(isGenerating || !prompt.trim()) ? 'disabled' : ''}`}
        >
          {isGenerating ? (
            <>
              <div className="loading-spinner"></div>
              Creating{loadingDots}
            </>
          ) : (
            <>
              Create Magic <Zap size={20} className="icon-right" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
  
  

// Loading State Component
const LoadingState = () => (
  <div className="loading-container">
    <div className="loading-content">
      <div className="chef-icon-container">
        <div className="chef-icon">
          <ChefHat size={24} className="icon-white" />
        </div>
        <div className="chef-icon-badge">
          <Zap size={12} className="icon-yellow-dark" />
        </div>
      </div>
      <div className="loading-text-container">
        <h3 className="loading-title">Culinary Algorithm Processing...</h3>
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
        <div className="loading-description">
          Mixing flavors, balancing textures, and crafting culinary magic!
        </div>
      </div>
    </div>
  </div>
);

// Recipe Header Component
const RecipeHeader = ({ recipe }) => (
  <div className="recipe-header">
    <div className="header-content">
      <h2 className="recipe-title">{recipe.title}</h2>
      
    </div>
    
    <div className="recipe-description">{recipe.description}</div>
    
    <div className="recipe-meta">
      <div className="meta-item">
        <Clock size={16} className="icon-pink" />
        <span>Prep: {recipe.prepTime}</span>
      </div>
      <div className="meta-item">
        <Flame size={16} className="icon-yellow" />
        <span>Cook: {recipe.cookTime}</span>
      </div>
      <div className="meta-item">
        <Users size={16} className="icon-green" />
        <span>Serves: {recipe.servings}</span>
      </div>
      <div className="meta-item">
        <Zap size={16} className="icon-blue" />
        <span>Difficulty: {recipe.difficulty}</span>
      </div>
    </div>
  </div>
);

// Ingredients Component
const Ingredients = ({ ingredients }) => (
  <div className="ingredients-container">
    <h3 className="section-title">
      <div className="section-icon">
        <span className="section-icon-text">I</span>
      </div>
      Ingredients
    </h3>
    
    <ul className="ingredients-list">
      {ingredients.map((ingredient, index) => (
        <li key={index} className="ingredient-item">
          <span className="ingredient-bullet"></span>
          <span className="ingredient-text">{ingredient}</span>
        </li>
      ))}
    </ul>
  </div>
);

// Steps Component
const Steps = ({ steps }) => (
  <div className="steps-container">
    <h3 className="section-title">
      <div className="section-icon steps-icon">
        <span className="section-icon-text">S</span>
      </div>
      Steps
    </h3>
    
    <ol className="steps-list">
      {steps.map((step, index) => (
        <li key={index} className="step-item">
          <div className="step-content">
            <div className="step-number">{index + 1}</div>
            <div className="step-text">{step}</div>
          </div>
          
          {index < steps.length - 1 && (
            <div className="step-connector">
              <ArrowDown size={16} className="connector-arrow" />
            </div>
          )}
        </li>
      ))}
    </ol>
  </div>
);

// Nutrition Facts Component
const NutritionFacts = ({ nutrition }) => (
  <div className="nutrition-container">
    <h3 className="section-title">Nutrition Facts (per Serving)</h3>
    <div className="nutrition-grid">
      <div className="nutrition-item calories">
        <div className="nutrition-label">Calories</div>
        <div className="nutrition-value">{nutrition.calories}</div>
      </div>
      <div className="nutrition-item protein">
        <div className="nutrition-label">Protein</div>
        <div className="nutrition-value">{nutrition.protein}g</div>
      </div>
      <div className="nutrition-item carbs">
        <div className="nutrition-label">Carbs</div>
        <div className="nutrition-value">{nutrition.carbs}g</div>
      </div>
      <div className="nutrition-item fat">
        <div className="nutrition-label">Fat</div>
        <div className="nutrition-value">{nutrition.fat}g</div>
      </div>
    </div>
  </div>
);

// Chef Notes Component
const ChefNotes = ( {notes} ) => (
  <div className="chef-notes">
    <div className="notes-header">
      <div className="notes-icon">
        <Sparkles className="icon-white" />
      </div>
      <h3 className="notes-title">Magic Chef Notes</h3>
    </div>
    <p className="notes-content">
        {notes}
    </p>
  </div>
);

// Recipe Actions Component
const RecipeActions = () => (
  <div className="recipe-bottom-actions">
    <button className="action-button primary">Generate New Version</button>
    <button className="action-button secondary">Customize Ingredients</button>
    <button className="action-button secondary">Save to Collection</button>
  </div>
);

// Generated Recipe Component
const GeneratedRecipe = ({ recipe }) => (
  <div className="recipe-container">
    <div className="recipe-top-border"></div>
    
    <RecipeHeader recipe={recipe} />
    
    <div className="recipe-content">
      <div className="recipe-grid">
        <Ingredients ingredients={recipe.ingredients} />
        <Steps steps={recipe.steps} />
      </div>
      
      <NutritionFacts nutrition={recipe.nutritionFacts} />
      
      <ChefNotes notes={recipe.notes}/>
      
    </div>
  </div>
);

// Confetti Component
const Confetti = () => (
  <div className="confetti-container">
    {Array.from({ length: 100 }).map((_, i) => (
      <div 
        key={i}
        className="confetti-piece"
        style={{
          left: `${Math.random() * 100}%`,
          backgroundColor: ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA', '#F8C8DC'][Math.floor(Math.random() * 7)],
          borderRadius: Math.random() > 0.5 ? '50%' : '0',
          animationDuration: `${Math.random() * 2 + 1}s`,
          transform: `rotate(${Math.random() * 360}deg)`,
        }}
      />
    ))}
  </div>
);

// Main TasteAlgorithm Component
const TasteAlgorithm = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // State to track API errors
  const [error, setError] = useState(null);

  const handleGenerateRecipe = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);

    try {
      const isDev = import.meta.env.DEV;
      const apiBaseUrl = isDev ? "http://localhost:3000" : "";
      const response = await fetch(`${apiBaseUrl}/api/recipe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ query: prompt }),
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const recipeData = await response.json();
      console.log(recipeData)
      const recipe = recipeData.recipe;
      console.log(recipe)
      setGeneratedRecipe(recipe);
      setShowConfetti(true);
      
      // Hide confetti after a few seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    } catch (error) {
      console.error('Error generating recipe:', error);
      setError('Failed to generate recipe. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Animation for the loading state
  const [loadingDots, setLoadingDots] = useState('');
  
  useEffect(() => {
    if (!isGenerating) return;
    
    const interval = setInterval(() => {
      setLoadingDots(prev => prev.length < 3 ? prev + '.' : '');
    }, 400);
    
    return () => clearInterval(interval);
  }, [isGenerating]);

  // Footer Component
const Footer = () => (
  <footer className="app-footer">
    <div className="container">
      <div className="footer-content">
        <div className="footer-copyright">
          © {new Date().getFullYear()} TasteAlgorithm. All Rights Reserved.
        </div>
        <div className="footer-links">
          <a href="/terms" className="footer-link">Terms of Service</a>
          <a href="/contact" className="footer-link">Contact</a>
        </div>
        <div className="footer-credit">
          Made with <Heart size={14} className="icon-pink" /> by Victor Ren
        </div>
      </div>
    </div>
  </footer>
);

  return (
    <div className="app-container">
      {/* Decorative elements */}
      <div className="decorative-orb orb-1"></div>
      <div className="decorative-orb orb-2"></div>
      
      {/* Confetti effect when recipe is generated */}
      {showConfetti && <Confetti />}

      <Header />

      <main className="main-content">
        <RecipeInput 
          prompt={prompt} 
          setPrompt={setPrompt} 
          handleGenerateRecipe={handleGenerateRecipe} 
          isGenerating={isGenerating} 
          loadingDots={loadingDots} 
        />

        {/* Loading state visualization */}
        {isGenerating && <LoadingState />}

        {/* Error message */}
        {error && !isGenerating && (
          <div className="error-container">
            <p className="error-message">{error}</p>
            <button 
              className="error-retry-button"
              onClick={() => {
                setError(null);
                handleGenerateRecipe();
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Generated recipe */}
        {generatedRecipe && !isGenerating && !error && <GeneratedRecipe recipe={generatedRecipe} />}
      </main>

      <Footer />
    </div>
  );
};

export default TasteAlgorithm;