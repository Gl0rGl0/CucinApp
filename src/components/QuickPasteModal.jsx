import React, { useState } from 'react';
import { X, Sparkles, Check, ClipboardCopy, ArrowRight } from 'lucide-react';
import { parseRecipeText } from '../utils/textParser';

export function QuickPasteModal({ isOpen, onClose, onApplyParsedRecipe }) {
  const [rawText, setRawText] = useState('');
  const [parsed, setParsed] = useState(null);

  if (!isOpen) return null;

  const handleParse = () => {
    if (!rawText.trim()) return;
    const result = parseRecipeText(rawText);
    setParsed(result);
  };

  const handleApply = () => {
    if (parsed) {
      onApplyParsedRecipe(parsed);
      onClose();
    }
  };

  const sampleText = `Torta di Mele Soffice
Porzioni: 6
Tempo di cottura: 35 minuti
Tempo di preparazione: 15 minuti

Ingredienti:
300g di farina 00
3 mele golden
150g di zucchero
3 uova medie
80ml di latte
1 bustina di lievito per dolci
1 cucchiaino di cannella
un pizzico di sale q.b.

Preparazione:
1. Sbuccia le mele e tagliale a fettine sottili.
2. In una ciotola monta le uova con lo zucchero per 5 minuti fino a renderle spumose.
3. Aggiungi il latte e incorpora la farina setacciata con il lievito.
4. Versa l'impasto nella tortiera, disponi le fettine di mela e inforna a 180°C per 35 minuti.`;

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="modal-content modal-paste-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-title">
            <Sparkles size={20} className="text-highlight-orange" />
            <h3>Incolla Testo Rapido da Web o Appunti</h3>
          </div>
          <button className="btn-icon-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p className="paste-subtitle">
            Copia il testo di una ricetta da qualsiasi sito o nota e incollalo qui sotto. CucinApp estrarrà automaticamente titolo, porzioni, tempi, ingredienti e passaggi con timer!
          </p>

          {!parsed ? (
            <div>
              <textarea
                className="paste-textarea"
                rows={10}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Incolla qui la ricetta (titolo, ingredienti, procedimento)..."
              />

              <div className="paste-actions">
                <button
                  type="button"
                  className="btn-secondary btn-sm"
                  onClick={() => setRawText(sampleText)}
                >
                  Inserisci testo d'esempio
                </button>

                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleParse}
                  disabled={!rawText.trim()}
                >
                  <Sparkles size={16} />
                  <span>Analizza Ricetta</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="parsed-preview-box">
              <div className="preview-header">
                <strong>Anteprima estratta con successo!</strong>
                <button
                  type="button"
                  className="btn-secondary btn-sm"
                  onClick={() => setParsed(null)}
                >
                  Modifica testo
                </button>
              </div>

              <div className="preview-meta-row">
                <div className="preview-pill">Titolo: <strong>{parsed.title}</strong></div>
                <div className="preview-pill">Categoria: <strong>{parsed.category}</strong></div>
                <div className="preview-pill">Porzioni: <strong>{parsed.servings}</strong></div>
                <div className="preview-pill">Cottura: <strong>{parsed.cookTime} min</strong></div>
              </div>

              <div className="preview-summary">
                <div className="summary-item">
                  <Check size={16} className="text-success" />
                  <span><strong>{parsed.ingredients.length}</strong> ingredienti identificati</span>
                </div>
                <div className="summary-item">
                  <Check size={16} className="text-success" />
                  <span><strong>{parsed.steps.length}</strong> passaggi ordinati</span>
                </div>
              </div>

              <div className="paste-apply-row">
                <button type="button" className="btn-secondary" onClick={onClose}>
                  Annulla
                </button>
                <button type="button" className="btn-primary" onClick={handleApply}>
                  <Check size={16} />
                  <span>Usa questa Ricetta</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
