import React, { useState, useEffect, useRef } from 'react';
import {
  X, ChevronLeft, ChevronRight, Check, Play, Pause, RotateCcw,
  Timer, Lock, LockOpen, Sparkles, Eye, EyeOff, AlertCircle, Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { requestWakeLock, releaseWakeLock, setupWakeLockAutoRenew } from '../services/wakeLock';
import { playTimerAlarm, playStepDing, triggerHaptic, stopHaptic } from '../services/sound';
import { formatScaledAmount, convertUnitAndAmount } from '../utils/scaler';

export function CookModeModal({ recipe, servings, unitSystem = 'metric', onClose }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState({});
  const [showIngredientsDrawer, setShowIngredientsDrawer] = useState(false);
  const [wakeLockActive, setWakeLockActive] = useState(false);
  const [showWakeLockConfirm, setShowWakeLockConfirm] = useState(false);
  const [dontShowWakeLockAgain, setDontShowWakeLockAgain] = useState(false);

  // Timer state for current step
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerAlarmRinging, setTimerAlarmRinging] = useState(false);
  const timerIntervalRef = useRef(null);

  const steps = recipe.steps || [];
  const currentStep = steps[currentStepIndex] || {};
  const isLastStep = currentStepIndex === steps.length - 1;
  const allStepsCompleted = steps.length > 0 && steps.every((_, idx) => completedSteps[idx]);

  // Total step duration in seconds (supporting both timerMinutes and timerSeconds)
  const getStepTotalSeconds = (step) => {
    if (!step) return 0;
    const mins = Number(step.timerMinutes) || 0;
    const secs = Number(step.timerSeconds) || 0;
    return mins * 60 + secs;
  };

  // Prevent background window / recipe from scrolling while cook mode is active
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      stopHaptic();
    };
  }, []);

  // Handle Wake Lock independently
  useEffect(() => {
    let active = true;
    async function activateWakeLock() {
      const ok = await requestWakeLock();
      if (active) setWakeLockActive(ok);
    }
    activateWakeLock();

    const cleanupRenew = setupWakeLockAutoRenew(() => active && wakeLockActive);

    return () => {
      active = false;
      cleanupRenew();
      releaseWakeLock();
    };
  }, [wakeLockActive]);

  // When step changes, set timer if specified
  useEffect(() => {
    clearInterval(timerIntervalRef.current);
    setIsTimerRunning(false);
    setTimerAlarmRinging(false);

    const stepSecs = getStepTotalSeconds(currentStep);
    setTimerSecondsLeft(stepSecs);
  }, [currentStepIndex, currentStep.timerMinutes, currentStep.timerSeconds]);

  const timerTargetEndRef = useRef(null);

  // Timer countdown ticker with Date.now() timestamp calculation (resilient to WhatsApp / backgrounding)
  useEffect(() => {
    if (isTimerRunning) {
      if (!timerTargetEndRef.current) {
        timerTargetEndRef.current = Date.now() + timerSecondsLeft * 1000;
      }

      const checkTime = () => {
        if (!timerTargetEndRef.current) return;
        const now = Date.now();
        const remaining = Math.max(0, Math.ceil((timerTargetEndRef.current - now) / 1000));
        setTimerSecondsLeft(remaining);

        if (remaining <= 0) {
          clearInterval(timerIntervalRef.current);
          setIsTimerRunning(false);
          setTimerAlarmRinging(true);
          playTimerAlarm();
          triggerHaptic('alarm');
          timerTargetEndRef.current = null;

          // If phone was in background / screen off, show system notification
          if (document.hidden && typeof Notification !== 'undefined' && Notification.permission === 'granted') {
            try {
              new Notification('⏱️ CucinApp - Timer Completato!', {
                body: `Tempo di cottura scaduto per "${recipe.title}"!`,
                icon: '/pwa-192x192.png'
              });
            } catch {
              // Ignore
            }
          }
        }
      };

      timerIntervalRef.current = setInterval(checkTime, 1000);

      // Instantly sync when user returns to CucinApp from WhatsApp or other apps
      const handleVisibilityChange = () => {
        if (!document.hidden && isTimerRunning) {
          checkTime();
        }
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        clearInterval(timerIntervalRef.current);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    } else {
      clearInterval(timerIntervalRef.current);
    }
  }, [isTimerRunning, recipe.title]);

  const toggleTimer = () => {
    if (timerAlarmRinging) {
      stopHaptic();
      setTimerAlarmRinging(false);
      return;
    }
    if (!isTimerRunning) {
      timerTargetEndRef.current = Date.now() + timerSecondsLeft * 1000;
      setIsTimerRunning(true);
    } else {
      timerTargetEndRef.current = null;
      setIsTimerRunning(false);
    }
  };

  const resetTimer = () => {
    clearInterval(timerIntervalRef.current);
    timerTargetEndRef.current = null;
    setIsTimerRunning(false);
    stopHaptic();
    setTimerAlarmRinging(false);
    setTimerSecondsLeft(getStepTotalSeconds(currentStep));
  };

  const addExtraMinute = (extraSec = 60) => {
    setTimerSecondsLeft(prev => prev + extraSec);
    if (timerTargetEndRef.current) {
      timerTargetEndRef.current += extraSec * 1000;
    }
  };

  // Toggle WakeLock with confirmation modal if currently active
  const handleToggleWakeLock = async () => {
    if (wakeLockActive) {
      const dismissed = localStorage.getItem('cucinapp_wakelock_confirm_dismissed') === 'true';
      if (dismissed) {
        await releaseWakeLock();
        setWakeLockActive(false);
      } else {
        setShowWakeLockConfirm(true);
      }
    } else {
      const ok = await requestWakeLock();
      setWakeLockActive(ok);
    }
  };

  const confirmDisableWakeLock = async () => {
    if (dontShowWakeLockAgain) {
      localStorage.setItem('cucinapp_wakelock_confirm_dismissed', 'true');
    }
    await releaseWakeLock();
    setWakeLockActive(false);
    setShowWakeLockConfirm(false);
  };

  const toggleStepDone = (idx) => {
    const isNowDone = !completedSteps[idx];
    setCompletedSteps(prev => ({
      ...prev,
      [idx]: isNowDone
    }));

    if (isNowDone) {
      playStepDing();
      triggerHaptic('light');
      // Check if all are done after this
      const willBeAllDone = steps.every((_, i) => (i === idx ? true : completedSteps[i]));
      if (willBeAllDone) {
        triggerHaptic('success');
        triggerConfetti();
      } else if (currentStepIndex < steps.length - 1) {
        // Auto advance to next step after slight delay
        setTimeout(() => {
          setCurrentStepIndex(currentStepIndex + 1);
        }, 500);
      }
    }
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
  };

  const formatTimerDisplay = (totalSec) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="cook-mode-fullscreen animate-fade-in">
      {/* Top Header */}
      <div className="cook-mode-header">
        <div className="cook-header-left">
          <button className="cook-btn-close" onClick={onClose} title="Chiudi modalità cucina">
            <X size={22} />
          </button>
          <div className="cook-title-wrap">
            <div className="cook-recipe-title">{recipe.title}</div>
            <div className="cook-step-tracker">
              Passaggio {currentStepIndex + 1} di {steps.length}
            </div>
          </div>
        </div>

        <div className="cook-header-right">
          <button
            type="button"
            className={`btn-wakelock-toggle ${wakeLockActive ? 'active' : 'inactive'}`}
            onClick={handleToggleWakeLock}
            title={wakeLockActive ? 'Schermo sempre attivo (ON) - Clicca per disattivare' : 'Schermo normale (OFF) - Clicca per mantenere schermo attivo'}
            aria-label={wakeLockActive ? 'Disattiva schermo sempre attivo' : 'Attiva schermo sempre attivo'}
          >
            {wakeLockActive ? (
              <Lock size={18} className="icon-wakelock-on" />
            ) : (
              <LockOpen size={18} className="icon-wakelock-off" />
            )}
          </button>

          <button
            className={`btn-ingredients-toggle ${showIngredientsDrawer ? 'active' : ''}`}
            onClick={() => setShowIngredientsDrawer(prev => !prev)}
            title="Mostra / Nascondi ingredienti"
          >
            {showIngredientsDrawer ? <EyeOff size={18} /> : <Eye size={18} />}
            <span className="hide-on-mobile">Ingredienti</span>
          </button>
        </div>
      </div>

      {/* Progress Line */}
      <div className="cook-progress-bar-bg">
        <div
          className="cook-progress-bar-fill"
          style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Main Step Arena */}
      <div className="cook-arena">
        {/* Ingredients Drawer (Side or Floating) */}
        {showIngredientsDrawer && (
          <aside className="cook-ingredients-drawer animate-slide-up">
            <div className="drawer-header">
              <h4>Ingredienti ({servings} porzioni)</h4>
              <button className="btn-icon-sm" onClick={() => setShowIngredientsDrawer(false)}>
                <X size={16} />
              </button>
            </div>
            <ul className="drawer-ingredients-list">
              {recipe.ingredients?.map((ing, idx) => {
                const scaledAmount = formatScaledAmount(ing.amount, recipe.servings || 4, servings);
                const converted = convertUnitAndAmount(scaledAmount, ing.unit, unitSystem);
                return (
                  <li key={idx} className="drawer-ingredient-item">
                    <span className="drawer-ing-qty">
                      {converted.amount} {converted.unit}
                    </span>
                    <span className="drawer-ing-name">{ing.name}</span>
                  </li>
                );
              })}
            </ul>
          </aside>
        )}

        {/* Current Step Big Card */}
        <div className="cook-step-card">
          <div className="cook-step-badge">
            Passaggio {currentStepIndex + 1}
          </div>

          <div className="cook-instruction-text">
            {currentStep.instruction}
          </div>

          {currentStep.tip && (
            <div className="cook-tip-card">
              <AlertCircle size={20} className="tip-alert-icon" />
              <div>
                <strong>Consiglio dello Chef:</strong>
                <p>{currentStep.tip}</p>
              </div>
            </div>
          )}

          {/* Big Interactive Timer Box */}
          {(getStepTotalSeconds(currentStep) > 0 || timerSecondsLeft > 0) && (
            <div className={`cook-timer-box ${timerAlarmRinging ? 'timer-ringing' : ''}`}>
              <div className="timer-display-wrap">
                <Timer size={24} className="timer-display-icon" />
                <span className="timer-digits">
                  {formatTimerDisplay(timerSecondsLeft)}
                </span>
              </div>

              {timerAlarmRinging ? (
                <div className="alarm-active-msg">
                  <span>Tempo scaduto! 🔔</span>
                  <button className="btn-primary btn-stop-alarm" onClick={toggleTimer}>
                    Ferma Allarme
                  </button>
                </div>
              ) : (
                <div className="timer-controls">
                  <button
                    className={`btn-timer-toggle ${isTimerRunning ? 'btn-pause' : 'btn-play'}`}
                    onClick={toggleTimer}
                  >
                    {isTimerRunning ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
                    <span>{isTimerRunning ? 'Pausa' : 'Avvia Timer'}</span>
                  </button>

                  <button className="btn-timer-control" onClick={resetTimer} title="Azzera timer">
                    <RotateCcw size={16} />
                  </button>

                  <button className="btn-timer-control" onClick={() => addExtraMinute(60)} title="+1 minuto">
                    <Plus size={14} /> 1m
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mark Done Button for Current Step */}
          <div className="step-complete-wrap">
            <button
              className={`btn-mark-step-done ${completedSteps[currentStepIndex] ? 'step-is-done' : ''}`}
              onClick={() => toggleStepDone(currentStepIndex)}
            >
              <div className="mark-check-circle">
                <Check size={20} />
              </div>
              <span>
                {completedSteps[currentStepIndex]
                  ? 'Passaggio completato! ✓'
                  : 'Segna come fatto'}
              </span>
            </button>
          </div>

          {/* Celebration Banner when done */}
          {allStepsCompleted && (
            <div className="completion-celebration animate-slide-up">
              <Sparkles size={32} className="celebration-sparkle" />
              <h3>Complimenti, ricetta completata! 🎉</h3>
              <p>Tutti i passaggi sono stati eseguiti alla perfezione. Buon appetito!</p>
              <button className="btn-primary mt-3" onClick={onClose}>
                Torna alla ricetta
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation for Steps - Compact Iconic Arrow Buttons */}
      <div className="cook-bottom-bar">
        <button
          className="btn-cook-nav btn-cook-nav-icon"
          disabled={currentStepIndex === 0}
          onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
          title="Passaggio precedente"
          aria-label="Passaggio precedente"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Step dots */}
        <div className="cook-step-dots">
          {steps.map((_, idx) => (
            <button
              key={idx}
              className={`step-dot ${idx === currentStepIndex ? 'current' : ''} ${completedSteps[idx] ? 'completed' : ''}`}
              onClick={() => setCurrentStepIndex(idx)}
              title={`Vai al passaggio ${idx + 1}`}
            />
          ))}
        </div>

        <button
          className="btn-cook-nav btn-cook-nav-icon"
          disabled={isLastStep}
          onClick={() => setCurrentStepIndex(prev => Math.min(steps.length - 1, prev + 1))}
          title="Passaggio successivo"
          aria-label="Passaggio successivo"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Wake Lock Confirmation Modal */}
      {showWakeLockConfirm && (
        <div className="modal-backdrop animate-fade-in" onClick={() => setShowWakeLockConfirm(false)}>
          <div className="modal-content modal-confirm-wakelock" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-title">
                <LockOpen size={20} className="text-highlight-orange" />
                <h3>Disattivare schermo sempre attivo?</h3>
              </div>
              <button className="btn-icon-sm" onClick={() => setShowWakeLockConfirm(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p className="wakelock-confirm-text">
                Se disattivi lo schermo attivo, il display dello smartphone potrebbe oscurarsi o spegnersi automaticamente secondo le impostazioni del telefono mentre cucini.
              </p>
              <div className="form-group-checkbox mt-3">
                <label className="checkbox-toggle-label">
                  <input
                    type="checkbox"
                    checked={dontShowWakeLockAgain}
                    onChange={(e) => setDontShowWakeLockAgain(e.target.checked)}
                    className="checkbox-native"
                  />
                  <span className="checkbox-toggle-text text-sm">
                    Non mostrare più questa conferma
                  </span>
                </label>
              </div>
              <div className="wakelock-confirm-actions mt-4">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowWakeLockConfirm(false)}
                >
                  Mantieni attivo
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={confirmDisableWakeLock}
                >
                  Disattiva
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
