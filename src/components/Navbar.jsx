import React from 'react';
import { ChefHat, Sun, Moon, Download, Plus, Sparkles } from 'lucide-react';

export function Navbar({
  theme,
  onToggleTheme,
  onOpenNewRecipe,
  onOpenBackup,
  onOpenFridge
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
              <span className="logo-version">v{typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '1.2.1'}</span>
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
            className="nav-btn-icon"
            onClick={onOpenBackup}
            title="Backup e Ripristino"
          >
            <Download size={18} />
            <span className="nav-btn-label hide-on-mobile">Backup</span>
          </button>

          <button
            className="nav-btn-icon"
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Passa al tema chiaro' : 'Passa al tema scuro'}
            aria-label="Cambia tema"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className="btn-primary hide-on-mobile"
            onClick={onOpenNewRecipe}
          >
            <Plus size={18} />
            <span>Nuova Ricetta</span>
          </button>
        </div>
      </div>
    </header>
  );
}
