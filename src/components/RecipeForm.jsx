import React, { useState, useRef } from 'react';
import {
  ArrowLeft, Plus, Trash2, Camera, Link, Sparkles, Save, Clock,
  Users, ChefHat, AlertCircle, Timer, Check, Image
} from 'lucide-react';
import { QuickPasteModal } from './QuickPasteModal';

const CATEGORIES = ['Primi', 'Secondi', 'Contorni', 'Dolci', 'Lievitati', 'Antipasti', 'Bevande', 'Altro'];
const DIFFICULTIES = ['Facile', 'Media', 'Difficile'];

export function RecipeForm({ initialRecipe, onSave, onCancel }) {
  const [title, setTitle] = useState(initialRecipe?.title || '');
  const [category, setCategory] = useState(initialRecipe?.category || 'Primi');
  const [difficulty, setDifficulty] = useState(initialRecipe?.difficulty || 'Facile');
  const [prepTime, setPrepTime] = useState(initialRecipe?.prepTime ?? 15);
  const [cookTime, setCookTime] = useState(initialRecipe?.cookTime ?? 20);
  const [servings, setServings] = useState(initialRecipe?.servings ?? 4);
  const [sourceUrl, setSourceUrl] = useState(initialRecipe?.sourceUrl || '');
  const [sourceName, setSourceName] = useState(initialRecipe?.sourceName || '');
  const [imageUrl, setImageUrl] = useState(initialRecipe?.imageUrl || '');
  const [personalNotes, setPersonalNotes] = useState(initialRecipe?.personalNotes || '');
  const [isFavorite, setIsFavorite] = useState(initialRecipe?.isFavorite || false);
  const [isGlutenFree, setIsGlutenFree] = useState(initialRecipe?.isGlutenFree || false);

  const [ingredients, setIngredients] = useState(
    initialRecipe?.ingredients?.length > 0
      ? initialRecipe.ingredients
      : [{ id: 'ing-1', name: '', amount: '', unit: '' }]
  );

  const [steps, setSteps] = useState(
    initialRecipe?.steps?.length > 0
      ? initialRecipe.steps
      : [{ id: 'step-1', instruction: '', timerMinutes: 0, tip: '' }]
  );

  const [showPasteModal, setShowPasteModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  // Ingredient list handlers
  const handleAddIngredient = () => {
    setIngredients(prev => [
      ...prev,
      { id: 'ing-' + Date.now(), name: '', amount: '', unit: '' }
    ]);
  };

  const handleUpdateIngredient = (idx, field, value) => {
    setIngredients(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });
  };

  const handleRemoveIngredient = (idx) => {
    if (ingredients.length <= 1) return;
    setIngredients(prev => prev.filter((_, i) => i !== idx));
  };

  // Steps list handlers
  const handleAddStep = () => {
    setSteps(prev => [
      ...prev,
      { id: 'step-' + Date.now(), instruction: '', timerMinutes: 0, tip: '' }
    ]);
  };

  const handleUpdateStep = (idx, field, value) => {
    setSteps(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });
  };

  const handleRemoveStep = (idx) => {
    if (steps.length <= 1) return;
    setSteps(prev => prev.filter((_, i) => i !== idx));
  };

  // Image upload from camera / device gallery
  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('L\'immagine selezionata è superiore a 5MB. Scegli una foto più leggera.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageUrl(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Quick paste import callback
  const handleApplyParsedRecipe = (parsed) => {
    if (parsed.title) setTitle(parsed.title);
    if (parsed.category) setCategory(parsed.category);
    if (parsed.servings) setServings(parsed.servings);
    if (parsed.prepTime) setPrepTime(parsed.prepTime);
    if (parsed.cookTime) setCookTime(parsed.cookTime);
    if (parsed.ingredients?.length > 0) setIngredients(parsed.ingredients);
    if (parsed.steps?.length > 0) setSteps(parsed.steps);

    // Auto-detect gluten-free from parsed content
    const fullText = (parsed.title + ' ' + JSON.stringify(parsed.ingredients) + ' ' + JSON.stringify(parsed.steps)).toLowerCase();
    if (fullText.includes('senza glutine') || fullText.includes('gluten-free') || fullText.includes('farina di riso')) {
      setIsGlutenFree(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim()) {
      setErrorMsg('Inserisci il titolo della ricetta.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const validIngredients = ingredients.filter(i => i.name && i.name.trim().length > 0);
    if (validIngredients.length === 0) {
      setErrorMsg('Inserisci almeno un ingrediente.');
      return;
    }

    const validSteps = steps.filter(s => s.instruction && s.instruction.trim().length > 0);
    if (validSteps.length === 0) {
      setErrorMsg('Inserisci almeno un passaggio della preparazione.');
      return;
    }

    const recipeData = {
      id: initialRecipe?.id,
      title: title.trim(),
      category,
      difficulty,
      isGlutenFree,
      prepTime: Number(prepTime) || 0,
      cookTime: Number(cookTime) || 0,
      servings: Number(servings) || 4,
      sourceUrl: sourceUrl.trim(),
      sourceName: sourceName.trim() || (sourceUrl ? 'Sito Web' : ''),
      imageUrl: imageUrl.trim(),
      personalNotes: personalNotes.trim(),
      isFavorite,
      ingredients: validIngredients,
      steps: validSteps,
      createdAt: initialRecipe?.createdAt
    };

    onSave(recipeData);
  };

  return (
    <div className="recipe-form-container animate-fade-in">
      {/* Top Header */}
      <div className="form-header-bar">
        <button type="button" className="btn-back" onClick={onCancel}>
          <ArrowLeft size={18} />
          <span>Annulla</span>
        </button>

        <h2>{initialRecipe?.id ? 'Modifica Ricetta' : 'Nuova Ricetta'}</h2>

        <button
          type="button"
          className="btn-primary"
          onClick={handleSubmit}
          title="Salva la ricetta"
        >
          <Save size={18} />
          <span>Salva</span>
        </button>
      </div>

      {errorMsg && (
        <div className="form-error-alert animate-slide-up">
          <AlertCircle size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-main-body">
        {/* Quick Paste Banner */}
        <div className="quick-paste-banner">
          <div className="paste-banner-info">
            <Sparkles size={18} className="text-highlight-orange" />
            <span>Vuoi velocizzare? Incolla una ricetta copiata dal web o dagli appunti:</span>
          </div>
          <button
            type="button"
            className="btn-secondary btn-sm"
            onClick={() => setShowPasteModal(true)}
          >
            <Sparkles size={14} />
            <span>Incolla Testo</span>
          </button>
        </div>
        {/* Section 1: Main info */}
        <div className="form-card">
          <h3 className="form-section-title">Informazioni Generali</h3>

          <div className="form-group">
            <label className="form-label">Titolo della Ricetta *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Es: Tagliatelle ai Funghi Porcini"
              className="input-title"
              required
            />
          </div>

          <div className="form-group-checkbox mb-3">
            <label className="checkbox-toggle-label">
              <input
                type="checkbox"
                checked={isGlutenFree}
                onChange={(e) => setIsGlutenFree(e.target.checked)}
                className="checkbox-native"
              />
              <span className="checkbox-toggle-text">
                🌾 Ricetta Senza Glutine
              </span>
            </label>
          </div>

          <div className="form-grid-3">
            <div className="form-group">
              <label className="form-label">Categoria</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Difficoltà</label>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                {DIFFICULTIES.map(diff => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Porzioni Base</label>
              <input
                type="number"
                min="1"
                max="50"
                value={servings}
                onChange={(e) => setServings(Math.max(1, parseInt(e.target.value) || 1))}
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Tempo di Preparazione (minuti)</label>
              <input
                type="number"
                min="0"
                value={prepTime}
                onChange={(e) => setPrepTime(parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tempo di Cottura (minuti)</label>
              <input
                type="number"
                min="0"
                value={cookTime}
                onChange={(e) => setCookTime(parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Link al sito originale (opzionale)</label>
              <input
                type="url"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="form-group">
              <label className="form-label">Nome Fonte (opzionale)</label>
              <input
                type="text"
                value={sourceName}
                onChange={(e) => setSourceName(e.target.value)}
                placeholder="Es: GialloZafferano, Ricetta della Nonna"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Image */}
        <div className="form-card">
          <h3 className="form-section-title">Foto del Piatto</h3>

          <div className="image-input-choice">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageFileChange}
              accept="image/*"
              style={{ display: 'none' }}
            />

            <button
              type="button"
              className="btn-secondary"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera size={18} />
              <span>Carica da fotocamera / galleria</span>
            </button>

            <span className="text-muted text-sm">oppure inserisci URL foto:</span>
          </div>

          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://images.unsplash.com/... o incolla link immagine"
            className="mt-2"
          />

          {imageUrl && (
            <div className="image-preview-box mt-3">
              <img src={imageUrl} alt="Anteprima ricetta" className="image-preview-thumb" />
              <button
                type="button"
                className="btn-icon-sm btn-remove-img"
                onClick={() => setImageUrl('')}
                title="Rimuovi immagine"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Section 3: Ingredients */}
        <div className="form-card">
          <div className="card-header-flex">
            <h3 className="form-section-title">Ingredienti ({ingredients.length})</h3>
            <button
              type="button"
              className="btn-secondary btn-sm"
              onClick={handleAddIngredient}
            >
              <Plus size={16} />
              <span>Aggiungi Ingrediente</span>
            </button>
          </div>

          <div className="ingredients-form-list">
            {ingredients.map((ing, idx) => (
              <div key={ing.id || idx} className="ingredient-row">
                <input
                  type="text"
                  placeholder="Dose"
                  value={ing.amount}
                  onChange={(e) => handleUpdateIngredient(idx, 'amount', e.target.value)}
                  className="input-qty"
                />
                <input
                  type="text"
                  placeholder="Unità"
                  value={ing.unit}
                  onChange={(e) => handleUpdateIngredient(idx, 'unit', e.target.value)}
                  className="input-unit"
                />
                <input
                  type="text"
                  placeholder="Ingrediente (es. Farina)"
                  value={ing.name}
                  onChange={(e) => handleUpdateIngredient(idx, 'name', e.target.value)}
                  className="input-name"
                />
                <button
                  type="button"
                  className="btn-icon-sm btn-delete-row"
                  onClick={() => handleRemoveIngredient(idx)}
                  disabled={ingredients.length <= 1}
                  title="Elimina ingrediente"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Steps with optional timers */}
        <div className="form-card">
          <div className="card-header-flex">
            <h3 className="form-section-title">Procedimento Step-by-Step ({steps.length})</h3>
          </div>

          <div className="steps-form-list">
            {steps.map((step, idx) => (
              <div key={step.id || idx} className="step-form-card">
                <div className="step-form-top">
                  <span className="step-badge-num">Passaggio {idx + 1}</span>
                  <button
                    type="button"
                    className="btn-icon-sm btn-delete-row"
                    onClick={() => handleRemoveStep(idx)}
                    disabled={steps.length <= 1}
                    title="Elimina passaggio"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <textarea
                  rows={3}
                  placeholder="Descrivi cosa fare in questo passaggio..."
                  value={step.instruction}
                  onChange={(e) => handleUpdateStep(idx, 'instruction', e.target.value)}
                  className="input-step-text"
                />

                <div className="step-extra-fields">
                  <div className="step-timer-input">
                    <Timer size={16} className="text-secondary" />
                    <span>Timer passaggio (minuti):</span>
                    <input
                      type="number"
                      min="0"
                      max="300"
                      value={step.timerMinutes || 0}
                      onChange={(e) => handleUpdateStep(idx, 'timerMinutes', parseInt(e.target.value) || 0)}
                      className="input-min"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Consiglio dello chef (opzionale)"
                    value={step.tip || ''}
                    onChange={(e) => handleUpdateStep(idx, 'tip', e.target.value)}
                    className="input-tip"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="btn-secondary btn-add-step mt-3"
            onClick={handleAddStep}
          >
            <Plus size={18} />
            <span>Aggiungi Passaggio</span>
          </button>
        </div>

        {/* Section 5: Notes */}
        <div className="form-card notes-form-card">
          <h3 className="form-section-title">Note Personali & Variazioni</h3>
          <textarea
            rows={5}
            placeholder="Appuntati le tue note, varianti, marche consigliate o cosa cambiare la volta successiva..."
            value={personalNotes}
            onChange={(e) => setPersonalNotes(e.target.value)}
            className="notes-form-textarea"
          />
        </div>

        {/* Submit action bar */}
        <div className="form-bottom-actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Annulla
          </button>
          <button type="submit" className="btn-primary btn-lg">
            <Save size={18} />
            <span>Salva Ricetta</span>
          </button>
        </div>
      </form>

      {/* Quick Paste Modal */}
      <QuickPasteModal
        isOpen={showPasteModal}
        onClose={() => setShowPasteModal(false)}
        onApplyParsedRecipe={handleApplyParsedRecipe}
      />
    </div>
  );
}
