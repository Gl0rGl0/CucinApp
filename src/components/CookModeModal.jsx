import React, { useState, useEffect, useRef } from 'react';
import {
  X, ChevronLeft, ChevronRight, Check, Play, Pause, RotateCcw,
  Timer, Lock, Sparkles, ChefHat, Eye, EyeOff, AlertCircle, Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { requestWakeLock, releaseWakeLock, setupWakeLockAutoRenew } from '../services/wakeLock';
import { playTimerAlarm, playStepDing } from '../services/sound';
import { formatScaledAmount } from '../utils/scaler';

export function CookModeModal({ recipe, servings, onClose }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState({});
  const [showIngredientsDrawer, setShowIngredientsDrawer] = useState(false);
  const [wakeLockActive, setWakeLockActive] = useState(false);

  // Timer state for current step
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerAlarmRinging, setTimerAlarmRinging] = useState(false);
  const timerIntervalRef = useRef(null);

  const steps = recipe.steps || [];
  const currentStep = steps[currentStepIndex] || {};
  const isLastStep = currentStepIndex === steps.length - 1;
  const allStepsCompleted = steps.length > 0 && steps.every((_, idx) => completedSteps[idx]);

  // Handle Wake Lock
  useEffect(() => {
    let active = true;
    async function activateWakeLock() {
      const ok = await requestWakeLock();
      if (active) setWakeLockActive(ok);
    }
    activateWakeLock();

    const cleanupRenew = setupWakeLockAutoRenew(() => active);

    return () => {
      active = false;
      cleanupRenew();
      releaseWakeLock();
    };
  }, []);

  // When step changes, set timer if specified
  useEffect(() => {
    clearInterval(timerIntervalRef.current);
    setIsTimerRunning(false);
    setTimerAlarmRinging(false);

    if (currentStep.timerMinutes > 0) {
      setTimerSecondsLeft(currentStep.timerMinutes * 60);
    } else {
      setTimerSecondsLeft(0);
    }
  }, [currentStepIndex, currentStep.timerMinutes]);

  // Timer countdown ticker
  useEffect(() => {
    if (isTimerRunning && timerSecondsLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimerSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current);
            setIsTimerRunning(false);
            setTimerAlarmRinging(true);
            playTimerAlarm();
            if ('vibrate' in navigator) {
              navigator.vibrate([400, 200, 400, 200, 600]);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }

    return () => clearInterval(timerIntervalRef.current);
  }, [isTimerRunning, timerSecondsLeft]);

  const toggleTimer = () => {
    if (timerAlarmRinging) {
      setTimerAlarmRinging(false);
      return;
    }
    setIsTimerRunning(prev => !prev);
  };

  const resetTimer = () => {
    clearInterval(timerIntervalRef.current);
    setIsTimerRunning(false);
    setTimerAlarmRinging(false);
    setTimerSecondsLeft((currentStep.timerMinutes || 0) * 60);
  };

  const addExtraMinute = (extraSec = 60) => {
    setTimerSecondsLeft(prev => prev + extraSec);
  };

  const toggleStepDone = (idx) => {
    const isNowDone = !completedSteps[idx];
    setCompletedSteps(prev => ({
      ...prev,
      [idx]: isNowDone
    }));

    if (isNowDone) {
      playStepDing();
      // Check if all are done after this
      const willBeAllDone = steps.every((_, i) => (i === idx ? true : completedSteps[i]));
      if (willBeAllDone) {
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
          {wakeLockActive && (
            <div className="wakelock-pill" title="Lo schermo rimarrà acceso finché sei in questa modalità">
              <Lock size={12} />
              <span>Schermo sempre attivo</span>
            </div>
          )}

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
              {recipe.ingredients?.map((ing, idx) => (
                <li key={idx} className="drawer-ingredient-item">
                  <span className="drawer-ing-qty">
                    {formatScaledAmount(ing.amount, recipe.servings || 4, servings)} {ing.unit}
                  </span>
                  <span className="drawer-ing-name">{ing.name}</span>
                </li>
              ))}
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
          {(currentStep.timerMinutes > 0 || timerSecondsLeft > 0) && (
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

      {/* Bottom Navigation for Steps */}
      <div className="cook-bottom-bar">
        <button
          className="btn-cook-nav"
          disabled={currentStepIndex === 0}
          onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
        >
          <ChevronLeft size={20} />
          <span>Precedente</span>
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
          className="btn-cook-nav"
          disabled={isLastStep}
          onClick={() => setCurrentStepIndex(prev => Math.min(steps.length - 1, prev + 1))}
        >
          <span>Successivo</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
