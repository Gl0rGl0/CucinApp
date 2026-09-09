import React, { useState, useEffect, useMemo, useRef } from 'react';
import './App.css';
import {
  initializeDatabase,
  getAllRecipes,
  saveRecipe,
  deleteRecipe,
  toggleFavorite,
  updateRecipeNotes,
  getShoppingList,
  addShoppingItem,
  addMultipleToShoppingList,
  toggleShoppingItem,
  deleteShoppingItem,
  clearCheckedShoppingItems,
  clearAllShoppingItems
} from './services/db';

import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { RecipeCard } from './components/RecipeCard';
import { RecipeDetail } from './components/RecipeDetail';
import { RecipeForm } from './components/RecipeForm';
import { CookModeModal } from './components/CookModeModal';
import { ShoppingListView } from './components/ShoppingListView';
import { FridgeFilterModal } from './components/FridgeFilterModal';
import { SettingsModal } from './components/SettingsModal';

import { Search, Heart, X, Plus, ChefHat } from 'lucide-react';

const CATEGORIES = ['Tutte', 'Primi', 'Secondi', 'Contorni', 'Dolci', 'Lievitati', 'Antipasti'];

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Navigation & View states
  const [activeTab, setActiveTab] = useState('recipes'); // 'recipes' | 'shopping' | 'fridge' | 'new'
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [cookingSession, setCookingSession] = useState(null); // { recipe, servings }

  // Modals
  const [showFridgeModal, setShowFridgeModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Unit system: 'metric' | 'imperial'
  const [unitSystem, setUnitSystem] = useState(() => {
    return localStorage.getItem('cucinapp_units') || 'metric';
  });

  const handleUnitSystemChange = (system) => {
    setUnitSystem(system);
    localStorage.setItem('cucinapp_units', system);
  };

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tutte');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [onlyGlutenFree, setOnlyGlutenFree] = useState(false);

  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('cucinapp_theme') || 'dark';
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cucinapp_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Load database on start
  const loadData = async () => {
    try {
      await initializeDatabase();
      const allR = await getAllRecipes();
      const allS = await getShoppingList();
      setRecipes(allR || []);
      setShoppingList(allS || []);
    } catch (err) {
      console.error('Errore nel caricamento del database:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle App Shortcuts from home screen launcher (/?action=new, /?tab=shopping, /?action=fridge)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    const actionParam = params.get('action');

    if (tabParam === 'shopping') {
      setActiveTab('shopping');
      window.history.replaceState({ cucinappView: 'shopping' }, '', '/');
    } else if (actionParam === 'new') {
      setEditingRecipe({});
      window.history.replaceState({ cucinappView: 'edit' }, '', '/');
    } else if (actionParam === 'fridge') {
      setShowFridgeModal(true);
      window.history.replaceState({ cucinappView: 'fridge' }, '', '/');
    }
  }, []);

  // Gesture Back Navigation for Android (popstate listener)
  const navigationStateRef = useRef({});
  useEffect(() => {
    navigationStateRef.current = {
      cookingSession,
      showSettingsModal,
      showFridgeModal,
      editingRecipe,
      selectedRecipe,
      activeTab
    };
  }, [cookingSession, showSettingsModal, showFridgeModal, editingRecipe, selectedRecipe, activeTab]);

  useEffect(() => {
    const handlePopState = () => {
      const {
        cookingSession: cs,
        showSettingsModal: ssm,
        showFridgeModal: sfm,
        editingRecipe: er,
        selectedRecipe: sr,
        activeTab: at
      } = navigationStateRef.current;

      // Close topmost layer first
      if (cs) {
        setCookingSession(null);
      } else if (ssm) {
        setShowSettingsModal(false);
      } else if (sfm) {
        setShowFridgeModal(false);
      } else if (er) {
        setEditingRecipe(null);
      } else if (sr) {
        setSelectedRecipe(null);
      } else if (at === 'shopping') {
        setActiveTab('recipes');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigation helpers
  const navigateToView = (viewName) => {
    window.history.pushState({ cucinappView: viewName }, '');
  };

  const closeCurrentView = (fallback) => {
    if (window.history.state?.cucinappView) {
      window.history.back();
    } else {
      fallback();
    }
  };

  const handleOpenRecipeDetail = (rec) => {
    setSelectedRecipe(rec);
    navigateToView('recipe');
  };

  const handleOpenNewRecipe = () => {
    setSelectedRecipe(null);
    setEditingRecipe({});
    setActiveTab('recipes');
    navigateToView('edit');
  };

  const handleEditRecipe = (rec) => {
    setEditingRecipe(rec);
    navigateToView('edit');
  };

  const handleOpenFridge = () => {
    setShowFridgeModal(true);
    navigateToView('fridge');
  };

  const handleOpenSettings = () => {
    setShowSettingsModal(true);
    navigateToView('settings');
  };

  // Filtered recipes
  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      // Category filter
      if (selectedCategory !== 'Tutte' && recipe.category !== selectedCategory) {
        return false;
      }

      // Favorite filter
      if (onlyFavorites && !recipe.isFavorite) {
        return false;
      }

      // Gluten-Free filter
      if (onlyGlutenFree && !recipe.isGlutenFree) {
        return false;
      }

      // Search query (title, category, or ingredients)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const titleMatch = recipe.title?.toLowerCase().includes(query);
        const categoryMatch = recipe.category?.toLowerCase().includes(query);
        const ingredientMatch = recipe.ingredients?.some(i =>
          i.name?.toLowerCase().includes(query)
        );

        if (!titleMatch && !categoryMatch && !ingredientMatch) {
          return false;
        }
      }

      return true;
    });
  }, [recipes, selectedCategory, onlyFavorites, onlyGlutenFree, searchQuery]);

  // Recipe CRUD Handlers
  const handleSaveRecipe = async (recipeData) => {
    const saved = await saveRecipe(recipeData);
    setRecipes(prev => {
      const idx = prev.findIndex(r => r.id === saved.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = saved;
        return copy;
      }
      return [saved, ...prev];
    });

    setEditingRecipe(null);
    setSelectedRecipe(saved);
    setActiveTab('recipes');
    window.history.replaceState({ cucinappView: 'recipe' }, '');
  };

  const handleDeleteRecipe = async (id) => {
    await deleteRecipe(id);
    setRecipes(prev => prev.filter(r => r.id !== id));
    if (selectedRecipe?.id === id) {
      closeCurrentView(() => setSelectedRecipe(null));
    }
  };

  const handleToggleFavorite = async (id) => {
    const newStatus = await toggleFavorite(id);
    setRecipes(prev =>
      prev.map(r => (r.id === id ? { ...r, isFavorite: newStatus } : r))
    );
    if (selectedRecipe?.id === id) {
      setSelectedRecipe(prev => ({ ...prev, isFavorite: newStatus }));
    }
  };

  const handleUpdateNotes = async (id, notes) => {
    await updateRecipeNotes(id, notes);
    setRecipes(prev =>
      prev.map(r => (r.id === id ? { ...r, personalNotes: notes } : r))
    );
    if (selectedRecipe?.id === id) {
      setSelectedRecipe(prev => ({ ...prev, personalNotes: notes }));
    }
  };

  // Shopping List Handlers
  const handleAddShoppingItem = async (item) => {
    const added = await addShoppingItem(item);
    setShoppingList(prev => [added, ...prev]);
  };

  const handleAddMultipleToShopping = async (items, recipeTitle) => {
    const added = await addMultipleToShoppingList(items, recipeTitle);
    setShoppingList(prev => [...added, ...prev]);
  };

  const handleToggleShoppingItem = async (id) => {
    const updated = await toggleShoppingItem(id);
    if (updated) {
      setShoppingList(prev =>
        prev.map(item => (item.id === id ? updated : item))
      );
    }
  };

  const handleDeleteShoppingItem = async (id) => {
    await deleteShoppingItem(id);
    setShoppingList(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCheckedShopping = async () => {
    await clearCheckedShoppingItems();
    setShoppingList(prev => prev.filter(item => !item.checked));
  };

  const handleClearAllShopping = async () => {
    if (window.confirm('Vuoi svuotare tutta la lista della spesa?')) {
      await clearAllShoppingItems();
      setShoppingList([]);
    }
  };

  // Cook Mode Launcher
  const handleStartCook = (recipe, servings) => {
    setCookingSession({
      recipe,
      servings: servings || recipe.servings || 4
    });
    navigateToView('cook');
  };

  // Bottom nav tab change
  const handleSelectTab = (tab) => {
    if (tab === 'new') {
      handleOpenNewRecipe();
    } else if (tab === 'fridge') {
      handleOpenFridge();
    } else if (tab === 'shopping') {
      setActiveTab('shopping');
      setSelectedRecipe(null);
      setEditingRecipe(null);
      navigateToView('shopping');
    } else {
      setActiveTab('recipes');
      setSelectedRecipe(null);
      setEditingRecipe(null);
    }
  };

  const uncheckedShoppingCount = shoppingList.filter(i => !i.checked).length;

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar
        onOpenNewRecipe={handleOpenNewRecipe}
        onOpenFridge={handleOpenFridge}
        onOpenSettings={handleOpenSettings}
      />

      {/* Main View Switcher */}
      <main className="main-content">
        {loading ? (
          <div className="empty-recipes-state">
            <ChefHat size={48} className="text-muted animate-spin" />
            <p>Caricamento ricettario...</p>
          </div>
        ) : editingRecipe ? (
          /* Recipe Create / Edit View */
          <RecipeForm
            initialRecipe={editingRecipe.id ? editingRecipe : null}
            onSave={handleSaveRecipe}
            onCancel={() => closeCurrentView(() => setEditingRecipe(null))}
          />
        ) : selectedRecipe ? (
          /* Recipe Detail View */
          <RecipeDetail
            recipe={selectedRecipe}
            unitSystem={unitSystem}
            onBack={() => closeCurrentView(() => setSelectedRecipe(null))}
            onEdit={handleEditRecipe}
            onDelete={handleDeleteRecipe}
            onToggleFavorite={handleToggleFavorite}
            onStartCook={handleStartCook}
            onAddToShopping={handleAddMultipleToShopping}
            onUpdateNotes={handleUpdateNotes}
          />
        ) : activeTab === 'shopping' ? (
          /* Shopping List Tab */
          <ShoppingListView
            items={shoppingList}
            onAddItem={handleAddShoppingItem}
            onToggleItem={handleToggleShoppingItem}
            onDeleteItem={handleDeleteShoppingItem}
            onClearChecked={handleClearCheckedShopping}
            onClearAll={handleClearAllShopping}
          />
        ) : (
          /* Main Recipes Catalog View */
          <div className="animate-fade-in">
            {/* Search & Filters */}
            <div className="search-filter-section">
              <div className="search-bar-wrap">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Cerca ricetta o ingrediente (es. pecorino, riso)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                {searchQuery && (
                  <button
                    className="search-clear-btn"
                    onClick={() => setSearchQuery('')}
                    title="Cancella ricerca"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* Categories, Favorites, and Gluten-Free filter */}
              <div className="categories-scroll">
                <button
                  className={`cat-pill fav-filter-pill ${onlyFavorites ? 'active' : ''}`}
                  onClick={() => {
                    setOnlyFavorites(prev => !prev);
                    if (!onlyFavorites) setOnlyGlutenFree(false);
                  }}
                >
                  <Heart size={14} fill={onlyFavorites ? '#ffffff' : 'none'} />
                  <span>Preferiti</span>
                </button>

                <button
                  className={`cat-pill gf-filter-pill ${onlyGlutenFree ? 'active' : ''}`}
                  onClick={() => {
                    setOnlyGlutenFree(prev => !prev);
                  }}
                  title="Filtra solo ricette senza glutine"
                >
                  <span>🌾 Senza Glutine</span>
                </button>

                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    className={`cat-pill ${selectedCategory === cat && !onlyFavorites ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setOnlyFavorites(false);
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Recipes Grid */}
            {filteredRecipes.length === 0 ? (
              <div className="empty-recipes-state">
                <div className="empty-recipes-icon">
                  <ChefHat size={36} />
                </div>
                <h3>Nessuna ricetta trovata</h3>
                <p>
                  {searchQuery
                    ? `Non abbiamo trovato ricette corrispondenti a "${searchQuery}".`
                    : onlyFavorites
                    ? 'Non hai ancora aggiunto nessuna ricetta ai preferiti!'
                    : onlyGlutenFree
                    ? 'Nessuna ricetta senza glutine trovata con questi filtri.'
                    : 'Il tuo ricettario è ancora vuoto.'}
                </p>
                <button
                  className="btn-primary"
                  onClick={handleOpenNewRecipe}
                >
                  <Plus size={18} />
                  <span>Crea una Ricetta</span>
                </button>
              </div>
            ) : (
              <div className="recipes-grid">
                {filteredRecipes.map(recipe => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onSelect={handleOpenRecipeDetail}
                    onToggleFavorite={handleToggleFavorite}
                    onStartCook={(rec) => handleStartCook(rec)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Cook Mode Modal Overlay */}
      {cookingSession && (
        <CookModeModal
          recipe={cookingSession.recipe}
          servings={cookingSession.servings}
          unitSystem={unitSystem}
          onClose={() => closeCurrentView(() => setCookingSession(null))}
        />
      )}

      {/* Svuotafrigo Modal */}
      {showFridgeModal && (
        <FridgeFilterModal
          recipes={recipes}
          onSelectRecipe={handleOpenRecipeDetail}
          onClose={() => closeCurrentView(() => setShowFridgeModal(false))}
        />
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => closeCurrentView(() => setShowSettingsModal(false))}
        theme={theme}
        onToggleTheme={toggleTheme}
        unitSystem={unitSystem}
        onChangeUnitSystem={handleUnitSystemChange}
        onDataReloaded={loadData}
      />

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        shoppingCount={uncheckedShoppingCount}
      />
    </div>
  );
}
