import { useState, useCallback } from 'react';

export const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio());

  const playAudio = useCallback(async (audioUrl?: string) => {
    if (!audioUrl) {
      console.warn('No audioUrl provided, cannot play audio.');
      return;
    }
    try {
      setIsPlaying(true);
      audio.src = audioUrl;
      await audio.play();
    } catch (error) {
      console.error('Error playing audio:', error);
    } finally {
      setIsPlaying(false);
    }
  }, [audio]);

  return { playAudio, isPlaying };
};
