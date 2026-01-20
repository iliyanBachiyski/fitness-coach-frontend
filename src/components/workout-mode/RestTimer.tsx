import { useState, useEffect } from 'react';
import { Play, Pause, SkipForward } from 'lucide-react';

interface RestTimerProps {
  duration: number; // in seconds
  onComplete: () => void;
  onSkip: () => void;
}

export function RestTimer({ duration, onComplete, onSkip }: RestTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isPaused, setIsPaused] = useState(false);

  const percentage = (timeLeft / duration) * 100;
  const circumference = 2 * Math.PI * 60;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <h3 className="text-xl font-semibold text-text-primary">Rest Time</h3>

      <div className="relative">
        <svg className="w-40 h-40 -rotate-90" viewBox="0 0 140 140">
          <circle
            cx="70"
            cy="70"
            r="60"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-surface"
          />
          <circle
            cx="70"
            cy="70"
            r="60"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="stroke-secondary transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-4xl font-bold text-text-primary">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="w-14 h-14 rounded-full bg-surface hover:bg-surface-hover
                     flex items-center justify-center transition-colors"
        >
          {isPaused ? (
            <Play className="w-6 h-6 text-primary" />
          ) : (
            <Pause className="w-6 h-6 text-text-secondary" />
          )}
        </button>
        <button
          onClick={onSkip}
          className="w-14 h-14 rounded-full bg-primary/20 hover:bg-primary/30
                     flex items-center justify-center transition-colors"
        >
          <SkipForward className="w-6 h-6 text-primary" />
        </button>
      </div>

      <p className="text-text-secondary text-sm">Tap skip when ready</p>
    </div>
  );
}
