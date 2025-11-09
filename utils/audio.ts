// utils/audio.ts

// Create a single AudioContext to be reused.
// It is initialized on the first user interaction to comply with browser policies.
let audioCtx: AudioContext | null = null;

const initializeAudio = () => {
  if (!audioCtx) {
    // Standard AudioContext
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
};

type SoundType = 'spin' | 'win' | 'lock' | 'lose' | 'gameOver' | 'restart' | 'cascade';

export const playSound = (type: SoundType, details?: { amount?: number }) => {
  // Audio must be initialized after a user gesture.
  // We call this on every play, but it will only initialize the context once.
  initializeAudio();
  if (!audioCtx || audioCtx.state === 'suspended') {
    audioCtx?.resume();
  }
  if (!audioCtx) return;

  const now = audioCtx.currentTime;
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  // Start with 0 volume
  gainNode.gain.setValueAtTime(0, now);

  switch (type) {
    case 'spin':
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(200, now);
      oscillator.frequency.linearRampToValueAtTime(1200, now + 0.3);
      gainNode.gain.linearRampToValueAtTime(0.15, now + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, now + 0.3);
      oscillator.start(now);
      oscillator.stop(now + 0.3);
      break;

    case 'win':
      // A quick ascending arpeggio for a positive feel
      // Pitch scales with win amount
      const winAmount = details?.amount ?? 0;
      const baseFreq = 500;
      // Use a logarithmic scale for perceived pitch, capped to avoid being too shrill
      const freqStep = Math.min(40 * Math.log(winAmount + 1), 700);
      
      gainNode.gain.linearRampToValueAtTime(0.2, now + 0.01);
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(baseFreq + freqStep, now);
      oscillator.frequency.setValueAtTime(baseFreq + freqStep + 200, now + 0.1);
      oscillator.frequency.setValueAtTime(baseFreq + freqStep + 400, now + 0.2);
      gainNode.gain.linearRampToValueAtTime(0, now + 0.3);
      oscillator.start(now);
      oscillator.stop(now + 0.3);
      break;
      
    case 'cascade':
      // A soft whoosh for falling symbols
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, now);
      oscillator.frequency.linearRampToValueAtTime(400, now + 0.2);
      gainNode.gain.linearRampToValueAtTime(0.08, now + 0.01);
      gainNode.gain.linearRampToValueAtTime(0, now + 0.2);
      oscillator.start(now);
      oscillator.stop(now + 0.2);
      break;

    case 'lock':
      // A sharp, metallic click
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, now);
      gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
      oscillator.start(now);
      oscillator.stop(now + 0.1);
      break;
      
    case 'lose':
      // A soft, low-pitched 'thud' for a failed spin attempt
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(200, now);
      oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.2);
      gainNode.gain.linearRampToValueAtTime(0.1, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
      oscillator.start(now);
      oscillator.stop(now + 0.2);
      break;
      
    case 'gameOver':
      // A more dramatic, descending tone
      oscillator.type = 'sawtooth';
      gainNode.gain.linearRampToValueAtTime(0.2, now + 0.01);
      oscillator.frequency.setValueAtTime(440, now);
      oscillator.frequency.exponentialRampToValueAtTime(110, now + 0.8);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
      oscillator.start(now);
      oscillator.stop(now + 0.8);
      break;
      
    case 'restart':
      // An optimistic, rising sound
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(440, now);
      oscillator.frequency.linearRampToValueAtTime(880, now + 0.2);
      gainNode.gain.linearRampToValueAtTime(0.2, now + 0.01);
      gainNode.gain.linearRampToValueAtTime(0, now + 0.2);
      oscillator.start(now);
      oscillator.stop(now + 0.2);
      break;
  }
};