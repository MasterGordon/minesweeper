import { useCallback, useRef } from 'react';
import { useWSQuery } from '../hooks';

interface AudioOptions {
  volume?: number;
  loop?: boolean;
}

export const useAudio = (src: string, options: AudioOptions = {}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { data: settings } = useWSQuery("user.getSettings", null);

  const play = useCallback(() => {
    // Check if sound is disabled in settings
    if (settings && settings.soundEnabled === false) {
      return;
    }

    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.volume = options.volume ?? 1;
      audioRef.current.loop = options.loop ?? false;
    }
    
    // Reset to beginning and play
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((error) => {
      console.warn('Audio play failed:', error);
    });
  }, [src, options.volume, options.loop, settings]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return [play, { pause, stop }] as const;
};