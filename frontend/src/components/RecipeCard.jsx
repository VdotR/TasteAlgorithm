const RecipeCard = ({ recipe }) => {
    // Early return if recipe is not provided
    if (!recipe) return null;
    
    const { 
      title, 
      prepTime, 
      cookTime, 
      servings, 
      difficulty, 
      ingredients = [], // Provide default empty arrays
      instructions = [], 
      notes 
    } = recipe;
  
    return (
      <div className="recipe-card">
        <h3 className="recipe-title">{title}</h3>
        
        <div className="recipe-meta">
          <div>Prep time: {prepTime}</div>
          <div>Cook time: {cookTime}</div>
          <div>Servings: {servings}</div>
          <div>Difficulty: {difficulty}</div>
        </div>
        
        <h4 className="recipe-section-title">Ingredients</h4>
        <ul className="ingredients-list">
          {ingredients && ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        
        <h4 className="recipe-section-title">Instructions</h4>
        <ol className="instructions-list">
          {instructions && instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
        
        {notes && (
          <>
            <h4 className="recipe-section-title">Notes</h4>
            <p>{notes}</p>
          </>
        )}
      </div>
    );
  };
  
  export default RecipeCard;