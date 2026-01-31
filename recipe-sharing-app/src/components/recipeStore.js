import { create } from 'zustand';

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  favorites: [],
  recommendations: [],
   searchTerm: '',
    setSearchTerm: (term) => set({ searchTerm: term }),

  setRecipes: (recipe) => set ({recipes}),

  addRecipe: (newRecipe) => set(state => ({
    recipes: [...state.recipes, newRecipe],
  })),

  deleteRecipe: (id) => set(state => ({
    recipes: state.recipes.filter(recipe => recipe.id !== id),
  })),

  updateRecipe: (updatedRecipe) => set(state => ({
    recipes: state.recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    ),
  })),

  // Favorites management
  addFavorite: (recipeId) => {
    const { favorites } = get();
    if (!favorites.includes(recipeId)) {
      set({ favorites: [...favorites, recipeId] });
    }
  },

  removeFavorite: (recipeId) => {
    set(state => ({
      favorites: state.favorites.filter(id => id !== recipeId),
    }));
  },

  // Recommendations - mock example based on favorites
  generateRecommendations: () => {
    const { recipes, favorites } = get();
    const recommended = recipes.filter(recipe =>
      favorites.includes(recipe.id) && Math.random() > 0.5
    );
    set({ recommendations: recommended });
  },
}));
