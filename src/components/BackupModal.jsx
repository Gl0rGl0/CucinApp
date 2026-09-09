import React, { useState, useRef } from 'react';
import {
  Download, Upload, X, Check, AlertCircle, RefreshCw, FileText, Database
} from 'lucide-react';
import { exportAllData, importData } from '../services/db';

export function BackupModal({ isOpen, onClose, onDataReloaded }) {
  const [statusMsg, setStatusMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

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
      setErrorMsg('Errore durante l\'esportazione: ' + err.message);
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
          setStatusMsg(`Ripristino completato con successo!`);
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
      <div className="modal-content modal-backup-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-title">
            <Database size={22} className="text-highlight-orange" />
            <div>
              <h3>Backup e Ripristino Ricettario</h3>
              <p className="modal-subtitle">I tuoi dati rimangono sempre tuoi, al 100% offline</p>
            </div>
          </div>
          <button className="btn-icon-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
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

          <div className="backup-section-card">
            <div className="backup-info">
              <Download size={24} className="backup-icon" />
              <div>
                <h4>Esporta Backup (JSON)</h4>
                <p>Scarica una copia completa di tutte le tue ricette, note, ingredienti e lista della spesa.</p>
              </div>
            </div>
            <button className="btn-primary" onClick={handleExport}>
              <Download size={16} />
              <span>Scarica File Backup</span>
            </button>
          </div>

          <div className="backup-section-card mt-3">
            <div className="backup-info">
              <Upload size={24} className="backup-icon" />
              <div>
                <h4>Ripristina da Backup</h4>
                <p>Carica un file di backup (.json) precedentemente scaricato per ripristinare le tue ricette.</p>
              </div>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              accept=".json,application/json"
              style={{ display: 'none' }}
              onChange={handleImportFile}
            />

            <button className="btn-secondary" onClick={() => fileInputRef.current?.click()}>
              <Upload size={16} />
              <span>Seleziona File .JSON</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
