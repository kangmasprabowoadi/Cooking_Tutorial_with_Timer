import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Timer as TimerIcon } from 'lucide-react';

interface StepTimerProps {
  duration: number; // in seconds
  label: string;
}

export function StepTimer({ duration, label }: StepTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsComplete(true);
            playNotification();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeRemaining]);

  const playNotification = () => {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const toggleTimer = () => {
    if (isComplete) {
      resetTimer();
    } else {
      setIsRunning(!isRunning);
    }
  };

  const resetTimer = () => {
    setTimeRemaining(duration);
    setIsRunning(false);
    setIsComplete(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration - timeRemaining) / duration) * 100;

  return (
    <div className={`bg-gradient-to-br ${isComplete ? 'from-green-50 to-green-100' : 'from-orange-50 to-orange-100'} rounded-lg p-6 border-2 ${isComplete ? 'border-green-300' : 'border-orange-300'}`}>
      <div className="flex items-center gap-2 mb-4">
        <TimerIcon className={`w-5 h-5 ${isComplete ? 'text-green-600' : 'text-orange-600'}`} />
        <h3 className={isComplete ? 'text-green-900' : 'text-orange-900'}>{label}</h3>
      </div>

      <div className="mb-4">
        <div className={`${isComplete ? 'text-5xl' : 'text-6xl'} font-mono text-center mb-2 ${isComplete ? 'text-green-600' : 'text-orange-600'}`}>
          {isComplete ? "Time's up!" : formatTime(timeRemaining)}
        </div>
        
        <div className="w-full bg-white/50 rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ease-linear ${isComplete ? 'bg-green-600' : 'bg-orange-600'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <button
          onClick={toggleTimer}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
            isComplete 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : isRunning
              ? 'bg-orange-200 hover:bg-orange-300 text-orange-900'
              : 'bg-orange-600 hover:bg-orange-700 text-white'
          }`}
        >
          {isComplete ? (
            <>
              <RotateCcw className="w-5 h-5" />
              <span>Reset</span>
            </>
          ) : isRunning ? (
            <>
              <Pause className="w-5 h-5" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              <span>Start</span>
            </>
          )}
        </button>

        {!isComplete && timeRemaining !== duration && (
          <button
            onClick={resetTimer}
            className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
