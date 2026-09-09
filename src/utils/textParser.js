/**
 * Parses unstructured pasted recipe text into structured fields:
 * title, category, servings, ingredients, steps (with suggested timers).
 */
export function parseRecipeText(rawText) {
  if (!rawText || !rawText.trim()) {
    return null;
  }

  const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length === 0) return null;

  let title = '';
  let servings = 4;
  let prepTime = 15;
  let cookTime = 20;
  const ingredients = [];
  const steps = [];

  let currentSection = 'meta'; // 'meta' | 'ingredients' | 'steps'

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lower = line.toLowerCase();

    // Section headers detection
    if (lower.match(/^(ingredienti|per la ricetta|per l'impasto|cosa serve)[:\s]*$/i) ||
        lower.startsWith('ingredienti:') || lower.startsWith('ingrédient')) {
      currentSection = 'ingredients';
      continue;
    }

    if (lower.match(/^(preparazione|procedimento|passaggi|istruzioni|come si fa|fasi)[:\s]*$/i) ||
        lower.startsWith('preparazione:') || lower.startsWith('procedimento:')) {
      currentSection = 'steps';
      continue;
    }

    // Check for metadata like "porzioni: 4" or "persone: 4"
    const servingsMatch = lower.match(/(?:porzioni|persone|dosi per)\s*[:=]?\s*(\d+)/i);
    if (servingsMatch) {
      servings = parseInt(servingsMatch[1], 10) || 4;
      continue;
    }

    // Check for cooking/prep time in text (e.g. "tempo: 30 min", "cottura: 20 min")
    const cookMatch = lower.match(/(?:cottura|cuocere)\s*[:=]?\s*(\d+)\s*(?:min|minuti|m)/i);
    if (cookMatch) {
      cookTime = parseInt(cookMatch[1], 10) || 20;
      continue;
    }

    const prepMatch = lower.match(/(?:preparazione|prep)\s*[:=]?\s*(\d+)\s*(?:min|minuti|m)/i);
    if (prepMatch) {
      prepTime = parseInt(prepMatch[1], 10) || 15;
      continue;
    }

    if (currentSection === 'meta') {
      if (!title) {
        // Clean markdown headers like # or **
        title = line.replace(/^[#*>\s]+/, '').replace(/[*_#]+$/, '').trim();
      } else {
        // If line starts with bullet or number, switch to ingredients
        if (line.match(/^[-*•\d]/)) {
          currentSection = 'ingredients';
          parseIngredientLine(line, ingredients);
        }
      }
    } else if (currentSection === 'ingredients') {
      // If line looks like a step (starts with 1., 2. or "in una ciotola", "inforna")
      if (line.match(/^\d+[\.\)]\s+/) && steps.length === 0 && ingredients.length > 2) {
        currentSection = 'steps';
        parseStepLine(line, steps);
      } else {
        parseIngredientLine(line, ingredients);
      }
    } else if (currentSection === 'steps') {
      parseStepLine(line, steps);
    }
  }

  // Fallback: if no steps were found but ingredients was found, treat remaining as steps
  if (steps.length === 0 && ingredients.length > 0) {
    // If half the items were put into ingredients and look like sentences
    const filteredIng = [];
    for (const ing of ingredients) {
      if (ing.name.length > 50 || ing.name.includes(' cuoci ') || ing.name.includes(' inforna ')) {
        steps.push({
          id: 'step-' + (steps.length + 1),
          instruction: ing.name,
          timerMinutes: extractMinutes(ing.name),
          tip: ''
        });
      } else {
        filteredIng.push(ing);
      }
    }
  }

  return {
    title: title || 'Nuova Ricetta',
    servings: servings || 4,
    prepTime: prepTime || 15,
    cookTime: cookTime || 20,
    category: guessCategory(title),
    ingredients: ingredients.length > 0 ? ingredients : [
      { id: 'ing-1', name: '', amount: '', unit: '' }
    ],
    steps: steps.length > 0 ? steps : [
      { id: 'step-1', instruction: '', timerMinutes: 0, tip: '' }
    ]
  };
}

function parseIngredientLine(line, ingredientsList) {
  // Strip bullets, dash, asterisks
  const clean = line.replace(/^[-*•–—\d\.\)]+\s*/, '').trim();
  if (!clean || clean.length < 2) return;

  // Try to match quantity + unit + name (e.g. "300 g di farina", "2 cucchiai olio", "1/2 cipolla", "sale q.b.")
  const match = clean.match(/^([\d\.,\/½¼¾⅓]+)\s*([a-zA-Z°]+)?(?:\s+di|\s+d'|\s+de)?\s+(.+)$/i);

  if (match) {
    let amountStr = match[1].trim();
    let unit = (match[2] || '').trim();
    let name = match[3].trim();

    // Normalize fraction characters
    let amount = amountStr;
    if (amountStr === '½') amount = 0.5;
    else if (amountStr === '¼') amount = 0.25;
    else if (amountStr === '¾') amount = 0.75;
    else if (amountStr.includes('/')) {
      const [num, den] = amountStr.split('/').map(Number);
      if (den) amount = Math.round((num / den) * 100) / 100;
    } else {
      const parsed = parseFloat(amountStr.replace(',', '.'));
      if (!isNaN(parsed)) amount = parsed;
    }

    ingredientsList.push({
      id: 'ing-' + (ingredientsList.length + 1),
      amount: amount || '',
      unit: unit || '',
      name: name
    });
  } else {
    // Check if ends with q.b.
    if (clean.toLowerCase().includes('q.b.')) {
      ingredientsList.push({
        id: 'ing-' + (ingredientsList.length + 1),
        amount: 1,
        unit: 'q.b.',
        name: clean.replace(/q\.?b\.?/i, '').trim()
      });
    } else {
      // General item without parsed quantity
      ingredientsList.push({
        id: 'ing-' + (ingredientsList.length + 1),
        amount: '',
        unit: '',
        name: clean
      });
    }
  }
}

function parseStepLine(line, stepsList) {
  const clean = line.replace(/^\d+[\.\)]\s*/, '').trim();
  if (!clean) return;

  const timerMin = extractMinutes(clean);

  stepsList.push({
    id: 'step-' + (stepsList.length + 1),
    instruction: clean,
    timerMinutes: timerMin,
    tip: ''
  });
}

function extractMinutes(text) {
  const match = text.match(/(?:per|circa|dopo|almeno)\s*(\d+)\s*(?:minuti|minuto|min)\b/i) ||
                text.match(/(\d+)\s*(?:minuti|minuto|min)\b/i);
  if (match) {
    const mins = parseInt(match[1], 10);
    if (mins > 0 && mins <= 240) {
      return mins;
    }
  }
  return 0;
}

function guessCategory(title) {
  const t = (title || '').toLowerCase();
  if (t.includes('pasta') || t.includes('spaghetti') || t.includes('risotto') || t.includes('gnocchi') || t.includes('lasagne') || t.includes('zuppa') || t.includes('vellutata')) {
    return 'Primi';
  }
  if (t.includes('carne') || t.includes('pollo') || t.includes('salmone') || t.includes('pesce') || t.includes('orata') || t.includes('spezzatino') || t.includes('polpette')) {
    return 'Secondi';
  }
  if (t.includes('torta') || t.includes('tiramisu') || t.includes('biscotti') || t.includes('cioccolato') || t.includes('dolce') || t.includes('crema') || t.includes('crostata')) {
    return 'Dolci';
  }
  if (t.includes('pane') || t.includes('pizza') || t.includes('focaccia')) {
    return 'Lievitati';
  }
  if (t.includes('insalata') || t.includes('patate') || t.includes('verdure') || t.includes('zucchine')) {
    return 'Contorni';
  }
  return 'Primi';
}
