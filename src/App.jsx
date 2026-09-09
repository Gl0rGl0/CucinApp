import React, { useState, useEffect, useMemo } from 'react';
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
import { BackupModal } from './components/BackupModal';

import { Search, Heart, X, BookOpen, Plus, ChefHat, Sparkles } from 'lucide-react';

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
  const [showBackupModal, setShowBackupModal] = useState(false);

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
  };

  const handleDeleteRecipe = async (id) => {
    await deleteRecipe(id);
    setRecipes(prev => prev.filter(r => r.id !== id));
    if (selectedRecipe?.id === id) {
      setSelectedRecipe(null);
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
  };

  // Bottom nav tab change
  const handleSelectTab = (tab) => {
    if (tab === 'new') {
      setSelectedRecipe(null);
      setEditingRecipe({});
      setActiveTab('recipes');
    } else if (tab === 'fridge') {
      setShowFridgeModal(true);
    } else {
      setActiveTab(tab);
      setSelectedRecipe(null);
      setEditingRecipe(null);
    }
  };

  const uncheckedShoppingCount = shoppingList.filter(i => !i.checked).length;

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenNewRecipe={() => {
          setSelectedRecipe(null);
          setEditingRecipe({});
          setActiveTab('recipes');
        }}
        onOpenBackup={() => setShowBackupModal(true)}
        onOpenFridge={() => setShowFridgeModal(true)}
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
            onCancel={() => setEditingRecipe(null)}
          />
        ) : selectedRecipe ? (
          /* Recipe Detail View */
          <RecipeDetail
            recipe={selectedRecipe}
            onBack={() => setSelectedRecipe(null)}
            onEdit={(rec) => setEditingRecipe(rec)}
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
                  onClick={() => setEditingRecipe({})}
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
                    onSelect={(rec) => setSelectedRecipe(rec)}
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
          onClose={() => setCookingSession(null)}
        />
      )}

      {/* Svuotafrigo Modal */}
      {showFridgeModal && (
        <FridgeFilterModal
          recipes={recipes}
          onSelectRecipe={(rec) => setSelectedRecipe(rec)}
          onClose={() => setShowFridgeModal(false)}
        />
      )}

      {/* Backup Modal */}
      <BackupModal
        isOpen={showBackupModal}
        onClose={() => setShowBackupModal(false)}
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
