import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';
import AddFavoriteButton from './AddFavoriteButton';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);

  return (
    <div>
      <h2>Recipes</h2>
      {recipes.length === 0 && <p>No recipes added yet.</p>}
      {recipes.map((recipe) => (
        <div key={recipe.id} className="border p-2 mb-2 rounded">
          <h3 className="text-lg font-semibold">
            <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
          </h3>
          <p>{recipe.description}</p>
          <AddFavoriteButton recipeId={recipe.id} />
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
