import React, { useState } from 'react';
import {
  ArrowLeft, Heart, Edit3, Trash2, ExternalLink, Clock, Users,
  Play, ShoppingBag, Plus, Minus, Check, Timer, MessageSquare,
  AlertCircle, ChefHat
} from 'lucide-react';
import { formatScaledAmount } from '../utils/scaler';

export function RecipeDetail({
  recipe,
  onBack,
  onEdit,
  onDelete,
  onToggleFavorite,
  onStartCook,
  onAddToShopping,
  onUpdateNotes
}) {
  const [servings, setServings] = useState(recipe.servings || 4);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [notes, setNotes] = useState(recipe.personalNotes || '');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notesSavedAlert, setNotesSavedAlert] = useState(false);
  const [addedToShopAlert, setAddedToShopAlert] = useState(false);

  const baseServings = recipe.servings || 4;

  const handleServingChange = (delta) => {
    const next = Math.max(1, Math.min(20, servings + delta));
    setServings(next);
  };

  const toggleCheck = (idx) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleSaveNotes = async () => {
    await onUpdateNotes(recipe.id, notes);
    setIsEditingNotes(false);
    setNotesSavedAlert(true);
    setTimeout(() => setNotesSavedAlert(false), 2500);
  };

  const handleAddIngredientsToShop = () => {
    const scaledItems = recipe.ingredients.map((ing) => ({
      name: ing.name,
      amount: formatScaledAmount(ing.amount, baseServings, servings),
      unit: ing.unit || '',
      recipeTitle: recipe.title
    }));

    onAddToShopping(scaledItems, recipe.title);
    setAddedToShopAlert(true);
    setTimeout(() => setAddedToShopAlert(false), 2500);
  };

  return (
    <div className="recipe-detail-view animate-fade-in">
      {/* Top action bar */}
      <div className="detail-top-nav">
        <button className="btn-back" onClick={onBack} title="Torna all'elenco">
          <ArrowLeft size={20} />
          <span>Indietro</span>
        </button>

        <div className="detail-top-actions">
          <button
            className={`btn-icon ${recipe.isFavorite ? 'is-fav' : ''}`}
            onClick={() => onToggleFavorite(recipe.id)}
            title="Preferito"
          >
            <Heart size={20} fill={recipe.isFavorite ? '#f43f5e' : 'none'} color={recipe.isFavorite ? '#f43f5e' : 'currentColor'} />
          </button>
          <button className="btn-icon" onClick={() => onEdit(recipe)} title="Modifica ricetta">
            <Edit3 size={18} />
          </button>
          <button
            className="btn-icon btn-danger"
            onClick={() => {
              if (window.confirm(`Sei sicuro di voler eliminare la ricetta "${recipe.title}"?`)) {
                onDelete(recipe.id);
              }
            }}
            title="Elimina ricetta"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="detail-hero-wrap">
        {recipe.imageUrl ? (
          <img src={recipe.imageUrl} alt={recipe.title} className="detail-hero-image" />
        ) : (
          <div className="detail-hero-fallback">
            <ChefHat size={64} className="hero-fallback-icon" />
          </div>
        )}
        <div className="detail-hero-gradient"></div>
        <div className="detail-hero-meta">
          <span className="badge badge-primary">{recipe.category || 'Ricetta'}</span>
          {recipe.difficulty && (
            <span className="badge badge-blue">Difficoltà: {recipe.difficulty}</span>
          )}
        </div>
      </div>

      {/* Title & Info Section */}
      <div className="detail-body">
        <h1 className="detail-title">{recipe.title}</h1>

        {/* Source link if available */}
        {recipe.sourceUrl && (
          <a
            href={recipe.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="source-link"
          >
            <ExternalLink size={15} />
            <span>Fonte: {recipe.sourceName || recipe.sourceUrl.replace(/^https?:\/\/(?:www\.)?([^\/]+).*/, '$1')}</span>
          </a>
        )}

        {/* Stats Grid */}
        <div className="stats-strip">
          <div className="stat-card">
            <Clock size={20} className="stat-icon" />
            <div>
              <div className="stat-label">Preparazione</div>
              <div className="stat-value">{recipe.prepTime || 0} min</div>
            </div>
          </div>
          <div className="stat-card">
            <Timer size={20} className="stat-icon" />
            <div>
              <div className="stat-label">Cottura</div>
              <div className="stat-value">{recipe.cookTime || 0} min</div>
            </div>
          </div>
          <div className="stat-card">
            <Users size={20} className="stat-icon" />
            <div>
              <div className="stat-label">Porzioni Base</div>
              <div className="stat-value">{baseServings} persone</div>
            </div>
          </div>
        </div>

        {/* Big Cook Mode CTA Button */}
        <button className="btn-cook-hero" onClick={() => onStartCook(recipe, servings)}>
          <Play size={22} fill="currentColor" />
          <div className="btn-cook-text">
            <strong>Avvia Modalità Cucina</strong>
            <span>Schermo sempre attivo, caratteri grandi e timer</span>
          </div>
        </button>

        {/* Servings Scaler Section */}
        <div className="servings-scaler-card">
          <div className="scaler-header">
            <div>
              <h3 className="section-title">Ingredienti</h3>
              <p className="scaler-subtitle">
                {servings !== baseServings ? (
                  <span className="text-highlight">Dosi ricalcolate per {servings} persone (originale: {baseServings})</span>
                ) : (
                  <span>Porzioni per {servings} persone</span>
                )}
              </p>
            </div>

            <div className="scaler-controls">
              <button
                className="btn-scaler"
                onClick={() => handleServingChange(-1)}
                disabled={servings <= 1}
                title="Riduci porzioni"
              >
                <Minus size={18} />
              </button>
              <span className="scaler-count">{servings}</span>
              <button
                className="btn-scaler"
                onClick={() => handleServingChange(1)}
                disabled={servings >= 20}
                title="Aumenta porzioni"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Add to shopping list action */}
          <div className="ingredients-actions">
            <button
              className="btn-secondary btn-sm"
              onClick={handleAddIngredientsToShop}
            >
              <ShoppingBag size={16} />
              <span>Aggiungi alla Lista Spesa</span>
            </button>
            {addedToShopAlert && (
              <span className="alert-inline alert-success">
                <Check size={14} /> Ingredienti aggiunti alla spesa!
              </span>
            )}
          </div>

          {/* Ingredient items */}
          <ul className="ingredients-list">
            {recipe.ingredients?.map((ing, idx) => {
              const scaledAmount = formatScaledAmount(ing.amount, baseServings, servings);
              const isChecked = !!checkedIngredients[idx];

              return (
                <li
                  key={ing.id || idx}
                  className={`ingredient-item ${isChecked ? 'item-checked' : ''}`}
                  onClick={() => toggleCheck(idx)}
                >
                  <div className={`checkbox-custom ${isChecked ? 'active' : ''}`}>
                    {isChecked && <Check size={14} />}
                  </div>
                  <span className="ingredient-qty">
                    {scaledAmount} {ing.unit}
                  </span>
                  <span className="ingredient-name">{ing.name}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Steps Section */}
        <div className="steps-section">
          <h3 className="section-title">Procedimento</h3>
          <div className="steps-flow">
            {recipe.steps?.map((step, idx) => (
              <div key={step.id || idx} className="step-card">
                <div className="step-number-badge">{idx + 1}</div>
                <div className="step-content">
                  <p className="step-instruction">{step.instruction}</p>

                  {step.timerMinutes > 0 && (
                    <div className="step-timer-pill">
                      <Timer size={16} />
                      <span>Timer suggerito: {step.timerMinutes} minuti</span>
                    </div>
                  )}

                  {step.tip && (
                    <div className="step-tip-box">
                      <AlertCircle size={16} className="tip-icon" />
                      <span>{step.tip}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Notes / Diary */}
        <div className="notes-card">
          <div className="notes-header">
            <div className="notes-title-wrap">
              <MessageSquare size={18} className="notes-icon" />
              <h3 className="section-title">Note Personali & Consigli</h3>
            </div>
            {!isEditingNotes && (
              <button
                className="btn-secondary btn-sm"
                onClick={() => setIsEditingNotes(true)}
              >
                <Edit3 size={14} />
                <span>{notes ? 'Modifica nota' : 'Aggiungi nota'}</span>
              </button>
            )}
          </div>

          {isEditingNotes ? (
            <div className="notes-edit-box">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Es: 'La prossima volta abbassare un po' il sale', 'Ottimo con contorno di patate al forno'..."
                rows={4}
                className="notes-textarea"
              />
              <div className="notes-edit-actions">
                <button className="btn-secondary btn-sm" onClick={() => setIsEditingNotes(false)}>
                  Annulla
                </button>
                <button className="btn-primary btn-sm" onClick={handleSaveNotes}>
                  Salva Nota
                </button>
              </div>
            </div>
          ) : (
            <div className="notes-display">
              {notes ? (
                <p className="notes-text">{notes}</p>
              ) : (
                <p className="notes-placeholder">Nessuna nota personale inserita. Clicca su "Aggiungi nota" per appuntarti le tue varianti!</p>
              )}
            </div>
          )}

          {notesSavedAlert && (
            <div className="alert-inline alert-success mt-2">
              <Check size={14} /> Nota salvata con successo!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
