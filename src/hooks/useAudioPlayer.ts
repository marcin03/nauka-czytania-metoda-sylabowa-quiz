import { useState, useCallback } from 'react';

const speakText = (text: string) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    
    // Polish syllables sound better in lowercase
    const utterance = new SpeechSynthesisUtterance(text.toLowerCase());
    utterance.lang = 'pl-PL';
    
    // Find Polish voice
    const voices = window.speechSynthesis.getVoices();
    const plVoice = voices.find(voice => voice.lang.startsWith('pl'));
    if (plVoice) {
      utterance.voice = plVoice;
    }
    
    utterance.rate = 0.75; // Slower for clear syllable pronunciation
    utterance.pitch = 1.1;  // Slightly higher pitch for kids
    
    window.speechSynthesis.speak(utterance);
  } else {
    console.warn('Web Speech API (speechSynthesis) is not supported in this browser.');
  }
};

export const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio());

  const playAudio = useCallback(async (audioUrl?: string, syllableText?: string) => {
    if (!audioUrl) {
      if (syllableText) {
        speakText(syllableText);
      } else {
        console.warn('No audioUrl or syllableText provided, cannot play audio.');
      }
      return;
    }

    try {
      setIsPlaying(true);
      audio.src = audioUrl;

      await new Promise<void>((resolve, reject) => {
        audio.onended = () => {
          resolve();
        };
        audio.onerror = () => {
          reject(new Error('Audio file failed to load'));
        };
        audio.play().catch(reject);
      });
    } catch (error) {
      console.warn(`Local audio playback failed for ${audioUrl}, falling back to Web Speech API.`, error);
      if (syllableText) {
        speakText(syllableText);
      }
    } finally {
      setIsPlaying(false);
    }
  }, [audio]);

  return { playAudio, isPlaying };
};
