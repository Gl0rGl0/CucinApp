// Screen Wake Lock API manager
// Prevents mobile screen from dimming or turning off during cooking mode

let wakeLockSentinel = null;

export async function requestWakeLock() {
  if (!('wakeLock' in navigator)) {
    console.warn('Screen Wake Lock API non supportata da questo browser');
    return false;
  }

  try {
    wakeLockSentinel = await navigator.wakeLock.request('screen');
    wakeLockSentinel.addEventListener('release', () => {
      wakeLockSentinel = null;
    });
    return true;
  } catch (err) {
    console.warn('Impossibile attivare il Wake Lock dello schermo:', err);
    return false;
  }
}

export async function releaseWakeLock() {
  if (wakeLockSentinel) {
    try {
      await wakeLockSentinel.release();
      wakeLockSentinel = null;
    } catch (err) {
      console.warn('Errore durante il rilascio del Wake Lock:', err);
    }
  }
}

// Automatically re-request lock if page returns to visibility while cook mode is active
export function setupWakeLockAutoRenew(isActiveGetter) {
  const handleVisibilityChange = async () => {
    if (document.visibilityState === 'visible' && isActiveGetter()) {
      await requestWakeLock();
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}
