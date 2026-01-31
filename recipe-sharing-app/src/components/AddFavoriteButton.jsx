import React from 'react';
import { useRecipeStore } from './recipeStore';

const AddFavoriteButton = ({ recipeId }) => {
  const favorites = useRecipeStore(state => state.favorites);
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  const isFavorite = favorites.includes(recipeId);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`px-3 py-1 rounded ${
        isFavorite ? 'bg-red-500 text-white' : 'bg-gray-300'
      }`}
    >
      {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
    </button>
  );
};

export default AddFavoriteButton;
