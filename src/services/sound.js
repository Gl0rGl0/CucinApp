// Web Audio API chime generator for timers and step completions
let audioCtx = null;
let isAudioUnlocked = false;

export function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Pre-unlock Web Audio API on first user interaction (touch/click)
 * so mobile browsers allow alarm playback without blocking
 */
export function unlockAudio() {
  if (isAudioUnlocked) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume().then(() => {
      isAudioUnlocked = true;
    }).catch(() => {});
  } else {
    isAudioUnlocked = true;
  }
}

// Attach listener once for initial user gesture
if (typeof window !== 'undefined') {
  const unlockEvents = ['touchstart', 'touchend', 'click', 'keydown'];
  const handleUnlock = () => {
    unlockAudio();
    unlockEvents.forEach(evt => window.removeEventListener(evt, handleUnlock, true));
  };
  unlockEvents.forEach(evt => window.addEventListener(evt, handleUnlock, { capture: true, passive: true }));
}

/**
 * Play a cheerful chime when a timer ends (repeated 3-note melodic arpeggio)
 */
export function playTimerAlarm() {
  unlockAudio();
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
  const playPattern = (context, offset = 0, oscType = 'sine', volume = 0.35) => {
    const now = context.currentTime + offset;
    notes.forEach((freq, index) => {
      const osc = context.createOscillator();
      const gain = context.createGain();

      osc.type = oscType;
      osc.frequency.setValueAtTime(freq, now + index * 0.14);

      gain.gain.setValueAtTime(0.001, now + index * 0.14);
      gain.gain.exponentialRampToValueAtTime(volume, now + index * 0.14 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.14 + 0.35);

      osc.connect(gain);
      gain.connect(context.destination);

      osc.start(now + index * 0.14);
      osc.stop(now + index * 0.14 + 0.4);
    });
  };

  // Immediate chime
  playPattern(ctx, 0, 'sine', 0.35);

  // Second chime with triangle waveform for punchiness
  setTimeout(() => {
    const ctx2 = getAudioContext();
    if (ctx2) playPattern(ctx2, 0, 'triangle', 0.3);
  }, 650);

  // Third confirmation chime
  setTimeout(() => {
    const ctx3 = getAudioContext();
    if (ctx3) playPattern(ctx3, 0, 'sine', 0.35);
  }, 1300);
}

/**
 * Play a subtle click/ding when checking a step
 */
export function playStepDing() {
  unlockAudio();
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, now); // A5
  osc.frequency.exponentialRampToValueAtTime(1320, now + 0.08); // E6

  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.2);
}

/**
 * Trigger subtle physical vibration on mobile devices
 */
export function triggerHaptic(type = 'light') {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      if (type === 'light') {
        navigator.vibrate(25);
      } else if (type === 'medium') {
        navigator.vibrate(45);
      } else if (type === 'success') {
        navigator.vibrate([40, 60, 80]);
      } else if (type === 'alarm') {
        // Repeated distinct alarm pattern: 400ms on, 150ms off, 400ms on, 150ms off, 800ms on
        navigator.vibrate([400, 150, 400, 150, 800]);
      }
    } catch {
      // Ignore vibration errors if blocked
    }
  }
}

/**
 * Stop any ongoing vibration
 */
export function stopHaptic() {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(0);
    } catch {
      // Ignore
    }
  }
}

