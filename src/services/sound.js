// Web Audio API chime generator for timers and step completions
let audioCtx = null;

function getAudioContext() {
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
 * Play a cheerful chime when a timer ends (repeated 3-note melodic arpeggio)
 */
export function playTimerAlarm() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
  const now = ctx.currentTime;

  notes.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + index * 0.15);

    gain.gain.setValueAtTime(0.001, now + index * 0.15);
    gain.gain.exponentialRampToValueAtTime(0.3, now + index * 0.15 + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.15 + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + index * 0.15);
    osc.stop(now + index * 0.15 + 0.4);
  });

  // Second chime slightly delayed for extra noticeability in noisy kitchen
  setTimeout(() => {
    const ctx2 = getAudioContext();
    if (!ctx2) return;
    const now2 = ctx2.currentTime;
    notes.forEach((freq, index) => {
      const osc = ctx2.createOscillator();
      const gain = ctx2.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now2 + index * 0.14);
      gain.gain.setValueAtTime(0.001, now2 + index * 0.14);
      gain.gain.exponentialRampToValueAtTime(0.25, now2 + index * 0.14 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now2 + index * 0.14 + 0.35);
      osc.connect(gain);
      gain.connect(ctx2.destination);
      osc.start(now2 + index * 0.14);
      osc.stop(now2 + index * 0.14 + 0.4);
    });
  }, 700);
}

/**
 * Play a subtle click/ding when checking a step
 */
export function playStepDing() {
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
