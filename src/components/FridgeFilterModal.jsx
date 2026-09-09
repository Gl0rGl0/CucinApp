import React, { useState, useMemo } from 'react';
import { Sparkles, X, Check, Search, ChefHat, ArrowRight } from 'lucide-react';

export function FridgeFilterModal({ recipes = [], onSelectRecipe, onClose }) {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [customInput, setCustomInput] = useState('');

  // Extract top popular ingredients present across all user's recipes
  const commonIngredients = useMemo(() => {
    const counts = {};
    recipes.forEach(r => {
      r.ingredients?.forEach(ing => {
        const clean = ing.name.toLowerCase().trim();
        // Remove common filler words
        const simplified = clean
          .replace(/^(di|d'|del|della|dello|dei|delle)\s+/, '')
          .split('(')[0]
          .trim();

        if (simplified.length > 2) {
          counts[simplified] = (counts[simplified] || 0) + 1;
        }
      });
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 16)
      .map(([name]) => name);
  }, [recipes]);

  const handleToggleIngredient = (name) => {
    const lower = name.toLowerCase().trim();
    if (selectedIngredients.includes(lower)) {
      setSelectedIngredients(prev => prev.filter(i => i !== lower));
    } else {
      setSelectedIngredients(prev => [...prev, lower]);
    }
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    const clean = customInput.toLowerCase().trim();
    if (!selectedIngredients.includes(clean)) {
      setSelectedIngredients(prev => [...prev, clean]);
    }
    setCustomInput('');
  };

  // Calculate matching recipes
  const matchingRecipes = useMemo(() => {
    if (selectedIngredients.length === 0) return [];

    const scored = recipes.map(recipe => {
      const recipeIngredients = recipe.ingredients || [];
      const total = recipeIngredients.length;
      if (total === 0) return { recipe, matchCount: 0, missing: [] };

      const matched = [];
      const missing = [];

      recipeIngredients.forEach(ing => {
        const ingName = ing.name.toLowerCase();
        const isMatched = selectedIngredients.some(sel =>
          ingName.includes(sel) || sel.includes(ingName)
        );

        if (isMatched) {
          matched.push(ing.name);
        } else {
          missing.push(ing.name);
        }
      });

      return {
        recipe,
        matchCount: matched.length,
        total,
        missing,
        percentage: Math.round((matched.length / total) * 100)
      };
    });

    return scored
      .filter(item => item.matchCount > 0)
      .sort((a, b) => b.percentage - a.percentage || b.matchCount - a.matchCount);
  }, [recipes, selectedIngredients]);

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="modal-content modal-fridge-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-title">
            <Sparkles size={22} className="text-highlight-orange" />
            <div>
              <h3>Svuotafrigo Smart</h3>
              <p className="modal-subtitle">Seleziona cosa hai in casa per trovare cosa cucinare</p>
            </div>
          </div>
          <button className="btn-icon-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Custom ingredient input */}
          <form onSubmit={handleAddCustom} className="fridge-input-row">
            <input
              type="text"
              placeholder="Scrivi un ingrediente (es. uova, zucchine, riso)..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
            />
            <button type="submit" className="btn-primary btn-sm" disabled={!customInput.trim()}>
              Aggiungi
            </button>
          </form>

          {/* Quick suggestions pills */}
          {commonIngredients.length > 0 && (
            <div className="fridge-pills-section">
              <span className="text-sm text-muted">Ingredienti comuni nelle tue ricette:</span>
              <div className="fridge-pills-wrap">
                {commonIngredients.map(ing => {
                  const isSelected = selectedIngredients.includes(ing);
                  return (
                    <button
                      key={ing}
                      type="button"
                      className={`fridge-pill ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleToggleIngredient(ing)}
                    >
                      {isSelected && <Check size={12} />}
                      <span>{ing}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Selected pills list */}
          {selectedIngredients.length > 0 && (
            <div className="selected-bar">
              <span className="text-sm font-semibold">Nel tuo frigo:</span>
              <div className="selected-tags">
                {selectedIngredients.map(item => (
                  <span key={item} className="tag-selected" onClick={() => handleToggleIngredient(item)}>
                    {item} <X size={12} />
                  </span>
                ))}
                <button
                  type="button"
                  className="btn-text-sm text-danger ml-2"
                  onClick={() => setSelectedIngredients([])}
                >
                  Azzera tutti
                </button>
              </div>
            </div>
          )}

          {/* Results section */}
          <div className="fridge-results-box">
            {selectedIngredients.length === 0 ? (
              <div className="fridge-hint-empty">
                <ChefHat size={36} className="text-muted" />
                <p>Seleziona o aggiungi uno o più ingredienti per scoprire quali piatti puoi preparare subito.</p>
              </div>
            ) : matchingRecipes.length === 0 ? (
              <div className="fridge-hint-empty">
                <p>Nessuna ricetta corrisponde agli ingredienti selezionati. Prova a selezionarne altri!</p>
              </div>
            ) : (
              <div className="fridge-matches-list">
                <div className="results-count-title">
                  Trovate <strong>{matchingRecipes.length}</strong> ricette possibili:
                </div>
                {matchingRecipes.map(({ recipe, matchCount, total, missing, percentage }) => (
                  <div
                    key={recipe.id}
                    className="fridge-match-card"
                    onClick={() => {
                      onSelectRecipe(recipe);
                      onClose();
                    }}
                  >
                    <div className="match-card-content">
                      <div className="match-card-header">
                        <h4>{recipe.title}</h4>
                        <span className={`match-badge ${percentage === 100 ? 'match-perfect' : 'match-partial'}`}>
                          {percentage === 100 ? 'Puoi farla subito! (100%)' : `${matchCount}/${total} ingredienti`}
                        </span>
                      </div>

                      {missing.length > 0 && (
                        <p className="missing-text">
                          <span className="text-muted">Ti manca:</span> {missing.slice(0, 3).join(', ')}
                          {missing.length > 3 && ` + altri ${missing.length - 3}`}
                        </p>
                      )}
                    </div>
                    <ArrowRight size={18} className="match-arrow" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
