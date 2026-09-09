import React from 'react';
import { BookOpen, ShoppingBag, Sparkles, PlusCircle } from 'lucide-react';

export function BottomNav({ activeTab, onSelectTab, shoppingCount = 0 }) {
  return (
    <nav className="bottom-nav">
      <button
        className={`bottom-nav-item ${activeTab === 'recipes' ? 'active' : ''}`}
        onClick={() => onSelectTab('recipes')}
      >
        <BookOpen size={20} />
        <span>Ricette</span>
      </button>

      <button
        className={`bottom-nav-item ${activeTab === 'fridge' ? 'active' : ''}`}
        onClick={() => onSelectTab('fridge')}
      >
        <Sparkles size={20} />
        <span>Svuotafrigo</span>
      </button>

      <button
        className={`bottom-nav-item bottom-nav-center ${activeTab === 'new' ? 'active' : ''}`}
        onClick={() => onSelectTab('new')}
        title="Aggiungi Ricetta"
      >
        <div className="center-btn-bubble">
          <PlusCircle size={28} />
        </div>
        <span>Aggiungi</span>
      </button>

      <button
        className={`bottom-nav-item ${activeTab === 'shopping' ? 'active' : ''}`}
        onClick={() => onSelectTab('shopping')}
      >
        <div className="icon-with-badge">
          <ShoppingBag size={20} />
          {shoppingCount > 0 && (
            <span className="bottom-nav-badge">{shoppingCount}</span>
          )}
        </div>
        <span>Spesa</span>
      </button>
    </nav>
  );
}
