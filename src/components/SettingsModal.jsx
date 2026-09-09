import React, { useState, useRef, useEffect } from 'react';
import {
  Settings, Sun, Moon, Scale, Bell, BellOff, Download, Upload,
  X, Check, AlertCircle, RefreshCw, Smartphone, Heart
} from 'lucide-react';
import { exportAllData, importData } from '../services/db';

export function SettingsModal({
  isOpen,
  onClose,
  theme,
  onToggleTheme,
  unitSystem = 'metric',
  onChangeUnitSystem,
  onDataReloaded
}) {
  const [statusMsg, setStatusMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [notificationState, setNotificationState] = useState(() => {
    return typeof Notification !== 'undefined' ? Notification.permission : 'unsupported';
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (typeof Notification !== 'undefined') {
      setNotificationState(Notification.permission);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRequestNotification = async () => {
    if (typeof Notification === 'undefined') {
      setErrorMsg('Le notifiche non sono supportate da questo browser/dispositivo.');
      return;
    }

    try {
      const perm = await Notification.requestPermission();
      setNotificationState(perm);
      if (perm === 'granted') {
        setStatusMsg('Notifiche attivate! Riceverai un avviso quando il timer scade anche se usi altre app.');
        setErrorMsg(null);
      } else {
        setErrorMsg('Permesso notifiche negato nelle impostazioni del browser.');
      }
    } catch (err) {
      setErrorMsg('Errore richiesta notifiche: ' + err.message);
    }
  };

  const handleExport = async () => {
    try {
      const data = await exportAllData();
      const jsonStr = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const dateStr = new Date().toISOString().split('T')[0];
      const link = document.createElement('a');
      link.href = url;
      link.download = `cucinapp-backup-${dateStr}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setStatusMsg('Backup scaricato con successo! Conservalo sul tuo PC o smartphone.');
      setErrorMsg(null);
    } catch (err) {
      setErrorMsg("Errore durante l'esportazione: " + err.message);
    }
  };

  const handleImportFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          await importData(parsed);
          setStatusMsg('Ripristino completato con successo!');
          setErrorMsg(null);
          if (onDataReloaded) {
            await onDataReloaded();
          }
        } catch (jsonErr) {
          setErrorMsg('File JSON non valido o danneggiato: ' + jsonErr.message);
        }
      };
      reader.readAsText(file);
    } catch (err) {
      setErrorMsg('Errore di lettura del file: ' + err.message);
    }
  };

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="modal-content modal-settings-card" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-title">
            <Settings size={22} className="text-highlight-orange" />
            <div>
              <h3>Impostazioni</h3>
              <p className="modal-subtitle">Personalizza preferenze, unità e dati</p>
            </div>
          </div>
          <button className="btn-icon-sm" onClick={onClose} title="Chiudi impostazioni">
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body settings-body-scroll">
          {statusMsg && (
            <div className="alert-inline alert-success mb-3">
              <Check size={16} /> {statusMsg}
            </div>
          )}

          {errorMsg && (
            <div className="alert-inline alert-danger mb-3">
              <AlertCircle size={16} /> {errorMsg}
            </div>
          )}

          {/* Section 1: Tema & Aspetto */}
          <div className="settings-section">
            <h4 className="settings-section-title">
              {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
              <span>Aspetto & Tema</span>
            </h4>
            <div className="settings-options-grid">
              <button
                className={`settings-card-btn ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => theme !== 'dark' && onToggleTheme()}
              >
                <div className="settings-card-icon">
                  <Moon size={20} />
                </div>
                <div className="settings-card-text">
                  <strong>Tema Scuro</strong>
                  <span>Ideale in cucina, meno affaticamento</span>
                </div>
                {theme === 'dark' && <Check size={18} className="settings-check-icon" />}
              </button>

              <button
                className={`settings-card-btn ${theme === 'light' ? 'active' : ''}`}
                onClick={() => theme !== 'light' && onToggleTheme()}
              >
                <div className="settings-card-icon">
                  <Sun size={20} />
                </div>
                <div className="settings-card-text">
                  <strong>Tema Chiaro</strong>
                  <span>Sfondo bianco ad alta leggibilità</span>
                </div>
                {theme === 'light' && <Check size={18} className="settings-check-icon" />}
              </button>
            </div>
          </div>

          {/* Section 2: Unità di Misura */}
          <div className="settings-section mt-4">
            <h4 className="settings-section-title">
              <Scale size={18} />
              <span>Sistema di Misura</span>
            </h4>
            <div className="settings-options-grid">
              <button
                className={`settings-card-btn ${unitSystem === 'metric' ? 'active' : ''}`}
                onClick={() => onChangeUnitSystem && onChangeUnitSystem('metric')}
              >
                <div className="settings-card-icon">
                  <span className="unit-flag">🇪🇺</span>
                </div>
                <div className="settings-card-text">
                  <strong>Metrico</strong>
                  <span>Grammi (g), kg, millilitri (ml), litri</span>
                </div>
                {unitSystem === 'metric' && <Check size={18} className="settings-check-icon" />}
              </button>

              <button
                className={`settings-card-btn ${unitSystem === 'imperial' ? 'active' : ''}`}
                onClick={() => onChangeUnitSystem && onChangeUnitSystem('imperial')}
              >
                <div className="settings-card-icon">
                  <span className="unit-flag">🇺🇸</span>
                </div>
                <div className="settings-card-text">
                  <strong>Imperiale (US/UK)</strong>
                  <span>Once (oz), libbre (lb), fl oz, cups</span>
                </div>
                {unitSystem === 'imperial' && <Check size={18} className="settings-check-icon" />}
              </button>
            </div>
          </div>

          {/* Section 3: Notifiche Timer in Background */}
          <div className="settings-section mt-4">
            <h4 className="settings-section-title">
              <Bell size={18} />
              <span>Avvisi Timer in Background</span>
            </h4>
            <div className="settings-feature-card">
              <div className="settings-feature-info">
                <Smartphone size={22} className="text-secondary" />
                <div>
                  <strong>Notifiche di Sistema</strong>
                  <p>Ricevi un avviso sonoro e a schermo intero quando il timer termina anche se usi WhatsApp o blocchi lo schermo.</p>
                </div>
              </div>
              <div>
                {notificationState === 'granted' ? (
                  <span className="badge-notification-active">
                    <Check size={14} /> Notifiche Attive
                  </span>
                ) : (
                  <button className="btn-secondary btn-sm" onClick={handleRequestNotification}>
                    <Bell size={16} />
                    <span>Abilita Avvisi</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Dati & Backup */}
          <div className="settings-section mt-4">
            <h4 className="settings-section-title">
              <Download size={18} />
              <span>Dati & Backup Offline</span>
            </h4>
            <div className="settings-feature-card">
              <div className="settings-feature-info">
                <div>
                  <strong>Salvataggio e Ripristino</strong>
                  <p>Esporta le tue ricette in un file sicuro per conservarle o condividerle.</p>
                </div>
              </div>
              <div className="settings-actions-row">
                <button className="btn-secondary btn-sm" onClick={handleExport}>
                  <Download size={16} />
                  <span>Esporta JSON</span>
                </button>
                <button className="btn-secondary btn-sm" onClick={() => fileInputRef.current?.click()}>
                  <Upload size={16} />
                  <span>Ripristina</span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImportFile}
                  accept=".json"
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          </div>

          {/* Section 5: Info App */}
          <div className="settings-footer-info mt-4">
            <p>
              <strong>CucinApp</strong> v{typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '1.3.0'}
            </p>
            <p className="text-muted text-xs mt-1">
              Ricettario personale offline.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
