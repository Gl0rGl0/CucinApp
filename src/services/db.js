import { openDB } from 'idb';
import { DEFAULT_RECIPES } from './defaultRecipes';

const DB_NAME = 'cucinapp_db';
const DB_VERSION = 1;

/**
 * Generates a standard UUID v4
 */
export function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers or non-secure contexts
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Creates a clean URL-friendly slug from recipe title
 */
function slugify(text) {
  if (!text) return 'ricetta';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 30) || 'ricetta';
}

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
        recipeStore.createIndex('isDeleted', 'isDeleted', { unique: false });
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

const OBSOLETE_TEMPLATE_IDS = [
  'recipe-carbonara-1',
  'recipe-risotto-2',
  'recipe-tiramisu-3',
  'recipe-salmone-4'
];

/**
 * Syncs defaultRecipes into IndexedDB.
 * - New default recipes added in defaultRecipes.js are automatically inserted.
 * - Soft-deleted recipes (isDeleted === true) will NEVER be resurrected.
 * - Existing default recipes get updated ingredients/steps without losing user favorites or custom notes.
 */
export async function initializeDatabase() {
  const db = await getDB();

  // 1. Remove obsolete prototype template recipes if present
  const txPurge = db.transaction('recipes', 'readwrite');
  for (const oldId of OBSOLETE_TEMPLATE_IDS) {
    await txPurge.store.delete(oldId);
  }
  await txPurge.done;

  // 2. Synchronize default recipes
  const txSync = db.transaction('recipes', 'readwrite');
  for (const recipe of DEFAULT_RECIPES) {
    const existing = await txSync.store.get(recipe.id);
    if (!existing) {
      // Brand new default recipe: add it as active
      await txSync.store.put({
        ...recipe,
        isDefault: true,
        isDeleted: false
      });
    } else if (existing.isDeleted) {
      // User has explicitly deleted this recipe: NEVER un-delete it!
      continue;
    } else if (existing.isDefault) {
      // Keep steps, ingredients and timing updated from defaultRecipes.js
      existing.title = recipe.title;
      existing.category = recipe.category;
      existing.prepTime = recipe.prepTime;
      existing.cookTime = recipe.cookTime;
      existing.servings = recipe.servings;
      existing.difficulty = recipe.difficulty;
      existing.isGlutenFree = recipe.isGlutenFree;
      existing.ingredients = recipe.ingredients;
      existing.steps = recipe.steps;
      existing.sourceName = recipe.sourceName;
      if (recipe.imageUrl && !existing.imageUrl) {
        existing.imageUrl = recipe.imageUrl;
      }
      if (!existing.userCustomNotes) {
        existing.personalNotes = recipe.personalNotes;
      }
      await txSync.store.put(existing);
    }
  }
  await txSync.done;
}

// ------------------- RECIPES CRUD -------------------

/**
 * Retrieves all active (non-deleted) recipes
 */
export async function getAllRecipes() {
  const db = await getDB();
  const all = await db.getAll('recipes');
  return all.filter((r) => !r.isDeleted && r.title);
}

/**
 * Retrieves a single active recipe by ID
 */
export async function getRecipeById(id) {
  const db = await getDB();
  const recipe = await db.get('recipes', id);
  return recipe && !recipe.isDeleted ? recipe : null;
}

/**
 * Saves a recipe.
 * For new recipes, creates a slug + UUID id (e.g. recipe_pasta-al-pomodoro_8f93a1c2-...)
 * ensuring no collisions even with hundreds of identical titles.
 */
export async function saveRecipe(recipe) {
  const db = await getDB();
  const slug = slugify(recipe.title);
  const id = recipe.id || `recipe_${slug}_${generateUUID()}`;

  const toSave = {
    ...recipe,
    id,
    isDeleted: false,
    createdAt: recipe.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  await db.put('recipes', toSave);
  return toSave;
}

/**
 * Soft delete: marks the recipe as isDeleted: true.
 * It completely disappears from the UI and queries, and prevents defaultRecipes
 * from resurrecting it upon future reloads.
 */
export async function deleteRecipe(id) {
  const db = await getDB();
  const recipe = await db.get('recipes', id);
  if (recipe) {
    recipe.isDeleted = true;
    recipe.deletedAt = new Date().toISOString();
    await db.put('recipes', recipe);
  } else {
    // Tombstone record to ensure the ID is never seeded
    await db.put('recipes', {
      id,
      isDeleted: true,
      deletedAt: new Date().toISOString()
    });
  }
  return true;
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
    recipe.userCustomNotes = true;
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
    id: 'item_' + generateUUID(),
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
      id: 'item_' + generateUUID(),
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

export async function clearAllShoppingItems() {
  const db = await getDB();
  const tx = db.transaction('shoppingList', 'readwrite');
  await tx.store.clear();
  await tx.done;
}

// ------------------- BACKUP & EXPORT -------------------

export async function exportAllData() {
  const db = await getDB();
  const allRecipes = await db.getAll('recipes');
  const recipes = allRecipes.filter((r) => !r.isDeleted && r.title);
  const shoppingList = await db.getAll('shoppingList');
  return {
    app: 'CucinApp',
    version: typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '1.2.1',
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

  // Import recipes (upsert as active)
  for (const recipe of importedJson.recipes) {
    if (recipe.id && recipe.title) {
      await tx.objectStore('recipes').put({
        ...recipe,
        isDeleted: false
      });
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
