import { openDB } from 'idb';
import { INITIAL_RECIPES } from './sampleRecipes';

const DB_NAME = 'cucinapp_db';
const DB_VERSION = 1;

/**
 * Initialize and upgrade the IndexedDB database
 */
export async function getDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Recipes store
      if (!db.objectStoreNames.contains('recipes')) {
        const recipeStore = db.createObjectStore('recipes', { keyPath: 'id' });
        recipeStore.createIndex('category', 'category', { unique: false });
        recipeStore.createIndex('isFavorite', 'isFavorite', { unique: false });
        recipeStore.createIndex('createdAt', 'createdAt', { unique: false });
      }

      // Shopping list store
      if (!db.objectStoreNames.contains('shoppingList')) {
        const shopStore = db.createObjectStore('shoppingList', { keyPath: 'id' });
        shopStore.createIndex('checked', 'checked', { unique: false });
        shopStore.createIndex('createdAt', 'createdAt', { unique: false });
      }

      // Settings store
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', { keyPath: 'key' });
      }
    }
  });
}

/**
 * Ensures starter recipes and new recipes from the catalog exist in IndexedDB
 */
export async function initializeDatabase() {
  const db = await getDB();
  const tx = db.transaction('recipes', 'readwrite');
  
  for (const recipe of INITIAL_RECIPES) {
    const existing = await tx.store.get(recipe.id);
    if (!existing) {
      await tx.store.put(recipe);
    } else if (existing.isGlutenFree === undefined && recipe.isGlutenFree !== undefined) {
      // Update with gluten-free flag if missing
      existing.isGlutenFree = recipe.isGlutenFree;
      await tx.store.put(existing);
    }
  }
  await tx.done;
}

// ------------------- RECIPES CRUD -------------------

export async function getAllRecipes() {
  const db = await getDB();
  return db.getAll('recipes');
}

export async function getRecipeById(id) {
  const db = await getDB();
  return db.get('recipes', id);
}

export async function saveRecipe(recipe) {
  const db = await getDB();
  const toSave = {
    ...recipe,
    id: recipe.id || 'recipe_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    createdAt: recipe.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  await db.put('recipes', toSave);
  return toSave;
}

export async function deleteRecipe(id) {
  const db = await getDB();
  return db.delete('recipes', id);
}

export async function toggleFavorite(id) {
  const db = await getDB();
  const recipe = await db.get('recipes', id);
  if (recipe) {
    recipe.isFavorite = !recipe.isFavorite;
    await db.put('recipes', recipe);
    return recipe.isFavorite;
  }
  return false;
}

export async function updateRecipeNotes(id, personalNotes) {
  const db = await getDB();
  const recipe = await db.get('recipes', id);
  if (recipe) {
    recipe.personalNotes = personalNotes;
    recipe.updatedAt = new Date().toISOString();
    await db.put('recipes', recipe);
    return recipe;
  }
  return null;
}

// ------------------- SHOPPING LIST -------------------

export async function getShoppingList() {
  const db = await getDB();
  return db.getAll('shoppingList');
}

export async function addShoppingItem(item) {
  const db = await getDB();
  const toAdd = {
    id: 'item_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    name: item.name.trim(),
    amount: item.amount || '',
    unit: item.unit || '',
    checked: false,
    recipeTitle: item.recipeTitle || 'Manuale',
    createdAt: new Date().toISOString()
  };
  await db.put('shoppingList', toAdd);
  return toAdd;
}

export async function addMultipleToShoppingList(items, recipeTitle = '') {
  const db = await getDB();
  const tx = db.transaction('shoppingList', 'readwrite');
  const added = [];
  for (const item of items) {
    const toAdd = {
      id: 'item_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      name: item.name.trim(),
      amount: item.amount || '',
      unit: item.unit || '',
      checked: false,
      recipeTitle: recipeTitle || item.recipeTitle || 'Ricetta',
      createdAt: new Date().toISOString()
    };
    await tx.store.put(toAdd);
    added.push(toAdd);
  }
  await tx.done;
  return added;
}

export async function toggleShoppingItem(id) {
  const db = await getDB();
  const item = await db.get('shoppingList', id);
  if (item) {
    item.checked = !item.checked;
    await db.put('shoppingList', item);
    return item;
  }
  return null;
}

export async function deleteShoppingItem(id) {
  const db = await getDB();
  return db.delete('shoppingList', id);
}

export async function clearCheckedShoppingItems() {
  const db = await getDB();
  const items = await db.getAll('shoppingList');
  const tx = db.transaction('shoppingList', 'readwrite');
  for (const item of items) {
    if (item.checked) {
      await tx.store.delete(item.id);
    }
  }
  await tx.done;
}

// ------------------- BACKUP & EXPORT -------------------

export async function exportAllData() {
  const db = await getDB();
  const recipes = await db.getAll('recipes');
  const shoppingList = await db.getAll('shoppingList');
  return {
    app: 'CucinApp',
    version: '1.1.0',
    exportDate: new Date().toISOString(),
    recipes,
    shoppingList
  };
}

export async function importData(importedJson) {
  if (!importedJson || !Array.isArray(importedJson.recipes)) {
    throw new Error('Formato backup non valido. Il file deve contenere un elenco di ricette.');
  }

  const db = await getDB();
  const tx = db.transaction(['recipes', 'shoppingList'], 'readwrite');

  // Import recipes (upsert)
  for (const recipe of importedJson.recipes) {
    if (recipe.id && recipe.title) {
      await tx.objectStore('recipes').put(recipe);
    }
  }

  // Import shopping list if present
  if (Array.isArray(importedJson.shoppingList)) {
    for (const item of importedJson.shoppingList) {
      if (item.id && item.name) {
        await tx.objectStore('shoppingList').put(item);
      }
    }
  }

  await tx.done;
  return true;
}
