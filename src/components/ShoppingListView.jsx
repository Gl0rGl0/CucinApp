import React, { useState } from 'react';
import {
  ShoppingBag, Plus, Check, Trash2, Copy, CheckCheck, Share2,
  AlertCircle
} from 'lucide-react';

export function ShoppingListView({
  items = [],
  onAddItem,
  onToggleItem,
  onDeleteItem,
  onClearChecked
}) {
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');
  const [newItemUnit, setNewItemUnit] = useState('');
  const [copiedAlert, setCopiedAlert] = useState(false);

  const uncheckedItems = items.filter(i => !i.checked);
  const checkedItems = items.filter(i => i.checked);

  const handleAddManual = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    onAddItem({
      name: newItemName.trim(),
      amount: newItemAmount.trim(),
      unit: newItemUnit.trim(),
      recipeTitle: 'Manuale'
    });

    setNewItemName('');
    setNewItemAmount('');
    setNewItemUnit('');
  };

  const handleCopyList = () => {
    if (items.length === 0) return;

    let text = '🛒 *Lista della Spesa (CucinApp)*:\n\n';
    
    if (uncheckedItems.length > 0) {
      text += 'Da comprare:\n';
      uncheckedItems.forEach(i => {
        const qty = i.amount ? `${i.amount} ${i.unit} ` : '';
        text += `◻️ ${qty}${i.name}\n`;
      });
    }

    if (checkedItems.length > 0) {
      text += '\nGià presi:\n';
      checkedItems.forEach(i => {
        text += `✅ ~${i.name}~\n`;
      });
    }

    navigator.clipboard.writeText(text).then(() => {
      setCopiedAlert(true);
      setTimeout(() => setCopiedAlert(false), 2500);
    });
  };

  return (
    <div className="shopping-view-container animate-fade-in">
      <div className="shopping-header">
        <div>
          <h2>Lista della Spesa</h2>
          <p className="shopping-subtitle">
            {uncheckedItems.length} {uncheckedItems.length === 1 ? 'articolo da acquistare' : 'articoli da acquistare'}
          </p>
        </div>

        <div className="shopping-header-actions">
          {items.length > 0 && (
            <button className="btn-secondary btn-sm" onClick={handleCopyList} title="Copia per WhatsApp o note">
              {copiedAlert ? <CheckCheck size={16} className="text-success" /> : <Share2 size={16} />}
              <span>{copiedAlert ? 'Copiata!' : 'Copia Lista'}</span>
            </button>
          )}

          {checkedItems.length > 0 && (
            <button className="btn-secondary btn-sm" onClick={onClearChecked} title="Elimina articoli spuntati">
              <Trash2 size={15} />
              <span className="hide-on-mobile">Rimuovi spuntati</span>
            </button>
          )}
        </div>
      </div>

      {/* Add Item Form */}
      <form onSubmit={handleAddManual} className="shopping-add-card">
        <input
          type="text"
          placeholder="Aggiungi ingrediente o prodotto..."
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="input-shopping-name"
        />
        <input
          type="text"
          placeholder="Quantità"
          value={newItemAmount}
          onChange={(e) => setNewItemAmount(e.target.value)}
          className="input-shopping-amount"
        />
        <input
          type="text"
          placeholder="Unità (g, l, pz)"
          value={newItemUnit}
          onChange={(e) => setNewItemUnit(e.target.value)}
          className="input-shopping-unit"
        />
        <button type="submit" className="btn-primary" disabled={!newItemName.trim()}>
          <Plus size={18} />
          <span>Aggiungi</span>
        </button>
      </form>

      {/* Items list */}
      {items.length === 0 ? (
        <div className="shopping-empty-state">
          <div className="empty-icon-wrap">
            <ShoppingBag size={48} />
          </div>
          <h3>La lista della spesa è vuota</h3>
          <p>Aggiungi prodotti manualmente qui sopra o premi "Aggiungi alla Lista Spesa" da qualsiasi ricetta!</p>
        </div>
      ) : (
        <div className="shopping-list-flow">
          {/* Unchecked items */}
          {uncheckedItems.length > 0 && (
            <div className="shopping-group">
              <h4 className="shopping-group-title">Da Comprare ({uncheckedItems.length})</h4>
              <ul className="shopping-items-list">
                {uncheckedItems.map(item => (
                  <li key={item.id} className="shopping-item-card" onClick={() => onToggleItem(item.id)}>
                    <div className="checkbox-custom">
                      {item.checked && <Check size={14} />}
                    </div>
                    <div className="shopping-item-info">
                      <span className="shopping-item-title">
                        {item.amount && <strong>{item.amount} {item.unit} </strong>}
                        {item.name}
                      </span>
                      {item.recipeTitle && item.recipeTitle !== 'Manuale' && (
                        <span className="shopping-recipe-source">Da: {item.recipeTitle}</span>
                      )}
                    </div>
                    <button
                      className="btn-icon-sm btn-delete-row"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteItem(item.id);
                      }}
                      title="Elimina articolo"
                    >
                      <Trash2 size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Checked items */}
          {checkedItems.length > 0 && (
            <div className="shopping-group mt-4">
              <div className="shopping-group-header">
                <h4 className="shopping-group-title text-muted">Completati ({checkedItems.length})</h4>
                <button className="btn-text-sm" onClick={onClearChecked}>
                  Cancella tutti i completati
                </button>
              </div>
              <ul className="shopping-items-list">
                {checkedItems.map(item => (
                  <li key={item.id} className="shopping-item-card item-checked" onClick={() => onToggleItem(item.id)}>
                    <div className="checkbox-custom active">
                      <Check size={14} />
                    </div>
                    <div className="shopping-item-info">
                      <span className="shopping-item-title line-through">
                        {item.amount && `${item.amount} ${item.unit} `}
                        {item.name}
                      </span>
                    </div>
                    <button
                      className="btn-icon-sm btn-delete-row"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteItem(item.id);
                      }}
                      title="Elimina articolo"
                    >
                      <Trash2 size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
