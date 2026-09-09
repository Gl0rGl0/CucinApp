import React from 'react';
import { ChefHat, Plus, Sparkles, Settings } from 'lucide-react';

export function Navbar({
  onOpenNewRecipe,
  onOpenFridge,
  onOpenSettings
}) {
  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        <div className="navbar-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="logo-badge">
            <ChefHat size={24} className="logo-icon" />
          </div>
          <div>
            <div className="logo-title">
              CucinApp
              <span className="logo-version">v{typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '1.3.0'}</span>
            </div>
            <div className="logo-subtitle">Il tuo ricettario</div>
          </div>
        </div>

        <div className="navbar-actions">
          <button
            className="nav-btn-icon hide-on-mobile"
            onClick={onOpenFridge}
            title="Svuotafrigo: cerca per ingredienti"
          >
            <Sparkles size={18} />
            <span className="nav-btn-label">Svuotafrigo</span>
          </button>

          <button
            className="btn-primary hide-on-mobile"
            onClick={onOpenNewRecipe}
          >
            <Plus size={18} />
            <span>Nuova Ricetta</span>
          </button>

          <button
            className="nav-btn-icon btn-square"
            onClick={onOpenSettings}
            title="Impostazioni"
            aria-label="Apri impostazioni"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
