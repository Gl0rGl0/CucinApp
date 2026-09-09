import React from 'react';
import { Clock, Users, Heart, ChefHat, Play } from 'lucide-react';

export function RecipeCard({ recipe, onSelect, onToggleFavorite, onStartCook }) {
  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);

  return (
    <article className="recipe-card" onClick={() => onSelect(recipe)}>
      <div className="card-image-wrap">
        {recipe.imageUrl ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="card-image"
            loading="lazy"
          />
        ) : (
          <div className="card-image-fallback">
            <ChefHat size={40} className="fallback-icon" />
          </div>
        )}

        <button
          className={`card-favorite-btn ${recipe.isFavorite ? 'is-fav' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(recipe.id);
          }}
          title={recipe.isFavorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
          aria-label="Preferito"
        >
          <Heart size={18} fill={recipe.isFavorite ? '#f43f5e' : 'none'} color={recipe.isFavorite ? '#f43f5e' : '#ffffff'} />
        </button>

        <div className="card-badges-container">
          {recipe.category && (
            <span className="card-category-badge">{recipe.category}</span>
          )}
          {recipe.isGlutenFree && (
            <span className="card-gf-badge" title="Ricetta Senza Glutine">🌾 Senza Glutine</span>
          )}
        </div>
      </div>

      <div className="card-content">
        <h3 className="card-title" title={recipe.title}>{recipe.title}</h3>

        <div className="card-meta">
          {totalTime > 0 && (
            <div className="meta-item">
              <Clock size={15} />
              <span>{totalTime} min</span>
            </div>
          )}

          {recipe.servings && (
            <div className="meta-item">
              <Users size={15} />
              <span>{recipe.servings} porz.</span>
            </div>
          )}

          {recipe.difficulty && (
            <span className={`difficulty-pill diff-${recipe.difficulty.toLowerCase()}`}>
              {recipe.difficulty}
            </span>
          )}
        </div>

        <div className="card-footer">
          <span className="ingredient-count">
            {recipe.ingredients?.length || 0} ingredienti
          </span>
          <button
            className="btn-cook-quick"
            onClick={(e) => {
              e.stopPropagation();
              onStartCook(recipe);
            }}
            title="Avvia Modalità Cucina"
          >
            <Play size={13} fill="currentColor" />
            <span>Cucina</span>
          </button>
        </div>
      </div>
    </article>
  );
}
