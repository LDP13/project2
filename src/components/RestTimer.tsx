import React, { useState, useEffect, useRef } from 'react';
import { Timer, Volume2, VolumeX } from 'lucide-react';

interface RestTimerProps {
  duration: number;
  onComplete: () => void;
  autoStart?: boolean;
}

function RestTimer({ duration, onComplete, autoStart = true }: RestTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVqzn77BdGAg+ltryxnMpBSl+zPLaizsIGGS57OihUBELTKXh8bllHgU2jdXzzn0vBSF1xe/glEILElyx6OyrWBUIQ5zd8sFuJAUuhM/z1YU2Bhxqvu7mnEoODlOq5O+zYBoGPJPY88p2KwUme8rx3I4+CRZiturqpVITC0mi4PK8aB8GM4nU8tGAMQYfcsLu45ZFDBFYr+ftrVoXCECY3PLEcSYELIHO8diJOQgZaLvt559NEAxPqOPwtmMcBjiP1/PMeS0GI3fH8N2RQAoUXrTp66hVFApGnt/yvmwhBTCG0fPTgjQGHm7A7eSaSQ0PVqzl77BeGQc9ltvyxnUoBSh+zPDaizsIGGS56+mjUREKTKXh8bllHgU1jdT0z3wvBSJ0xe/glEILElyx6OyrWRUIRJve8sFuJAUug8/z1YU2BRxqvu3mnEoPDlOq5O+zYRsGPJPY88p3KgUme8rx3I4+CRVht+rqpVMSC0mh4PK8aiAFM4nU8tGAMQYfccPu45ZFDBFYr+ftrVwWCECY3PLEcSYGK4DN8tiIOQgZZ7zs56BODwxPpuPxtmQcBjiP1/PMeywGI3fH8N+RQAoUXrTp66hWFApGnt/yv2wiBTCG0fPTgzQHHW3A7eSaSQ0PVqvm77BeGQc9ltrzxnUoBSh9y/HajDsIF2W56+mjUhEKTKPh8blnHgU1jdTy0HwvBSF0xPDglEQKElux6eyrWRUJQ5vd88FwJAQug8/z1YY2BRxqvu3mnEwODVKp5e+zYRsGOpPX88p3KgUmecnw3Y4/CBVhtuvqpVMSC0mh4PK9aiAFM4nS89GAMQYfccLv45dGCxFYrufur1sYB0CY3PLEcycFKoDN8tiIOQgZZ7rs56BODwxPpuPxtmQdBTiP1/PMey4FI3bH8d+RQQkUXbPq66hWFApGnt/yv2wiBTCG0PPTgzUGHm3A7eSaSQ0PVKzm77BeGQc9ltrzyHQpBSh9y/HajDwIF2S46+mjUhEKTKPh8blnHwU1jdTy0H4wBiF0xPDglEQKElux6eyrWhQJQ5vd88NvJAUtg87y1oY3BRxqvu3mnEwODVKp5PC1YRsHOpHY88p3LAUlecnw3Y8/CBVhtuvqpVMSC0mh4PK9aiAFM4nS89GBMgUfccLv45dGDRBYrufur1sYB0CX2/PEcycFKoDN8tiKOggZZ7vs56BOEQxPpuPxt2MdBTeP1/PMey4FI3bH8d+RQQsUXbPq66hWFApGnt/yv2wiBTCG0PPTgzUGHm3A7eSaSQ0PVKzm77BeGQc9ltrzyHUpBSh9y/HajDwIF2S46+mjUhEKTKPh8blnHwU1jdTy0H4wBiF0xPDglEQKElux6eyrWhQJQ5vd88NvJAUtg87y1oY3BRxqvu3mnEwODVKp5PC1YRsHOpHY88p3LAUlecnw3Y8/CBVhtuvqpVMSC0mh4PK9aiAFM4nS89GBMgUfccLv45dGDRBYrufur1sYB0CX2/PEcycFKoDN8tiKOggZZ7vs56BOEQxPpuPxt2MdBTeP1/PMey4FI3bH8d+RQQsUXbPq66hWFApGnt/yv2wiBTCG0PPTgzUGHm3A7eSaSQ0PVKzm77BeGQc9ltrzyHUpBSh9y/HajDwIF2S46+mjUhEKTKPh8blnHwU1jdTy0H4wBiF0xPDglEQKElux6eyrWhQJQ5vd88NvJAUtg87y1oY3BRxqvu3mnEwODQ==');
    
    // Auto-start if enabled
    if (autoStart) {
      setTimeLeft(duration);
      setIsActive(true);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsActive(false);
      if (!isMuted && audioRef.current) {
        audioRef.current.play();
      }
      onComplete();
    }

    if (!isActive || timeLeft === null) return;

    const interval = setInterval(() => {
      setTimeLeft((time) => (time !== null ? time - 1 : null));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isActive, onComplete, isMuted]);

  const startTimer = () => {
    setTimeLeft(duration);
    setIsActive(true);
  };

  const stopTimer = () => {
    setTimeLeft(null);
    setIsActive(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isActive && timeLeft === null) {
    return (
      <button
        onClick={startTimer}
        className="flex items-center gap-1 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
      >
        <Timer size={16} />
        <span>Start Rest Timer ({formatTime(duration)})</span>
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="text-sm font-medium">
        Rest: {timeLeft !== null ? formatTime(timeLeft) : formatTime(duration)}
      </div>
      <button
        onClick={toggleMute}
        className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
      <button
        onClick={stopTimer}
        className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
      >
        Cancel
      </button>
    </div>
  );
}

export default RestTimer;