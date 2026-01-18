import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain } from 'lucide-react';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play notification sound here if desired
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const switchMode = (newMode: 'focus' | 'break') => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(newMode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = mode === 'focus' 
    ? ((25 * 60 - timeLeft) / (25 * 60)) * 100 
    : ((5 * 60 - timeLeft) / (5 * 60)) * 100;

  return (
    <div className="card-rim bg-bluelabs-surface/40 backdrop-blur-xl p-8 rounded-2xl border border-white/5 flex flex-col items-center justify-center relative overflow-hidden group">
      {/* Background Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-bluelabs-primary to-blue-400 transition-all duration-1000 shadow-[0_0_20px_rgba(59,130,246,0.5)]" 
        style={{ width: `${progress}%` }}
      />
      
      <div className="flex gap-4 mb-10 z-10">
        <button 
          onClick={() => switchMode('focus')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${mode === 'focus' ? 'bg-bluelabs-primary text-white shadow-lg shadow-bluelabs-primary/25 ring-2 ring-bluelabs-primary/50' : 'bg-white/5 text-bluelabs-muted hover:bg-white/10 hover:text-white'}`}
        >
          <Brain size={18} /> Focus
        </button>
        <button 
          onClick={() => switchMode('break')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${mode === 'break' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-500/50' : 'bg-white/5 text-bluelabs-muted hover:bg-white/10 hover:text-white'}`}
        >
          <Coffee size={18} /> Break
        </button>
      </div>

      <div className="text-9xl font-bold font-sans text-white mb-10 tracking-tight drop-shadow-2xl tabular-nums">
        {formatTime(timeLeft)}
      </div>

      <div className="flex gap-8 z-10">
        <button 
          onClick={toggleTimer}
          className="w-20 h-20 rounded-full bg-white text-bluelabs-dark flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 shadow-2xl shadow-white/10"
        >
          {isActive ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" className="ml-1" />}
        </button>
        <button 
          onClick={resetTimer}
          className="w-20 h-20 rounded-full bg-white/5 text-slate-300 flex items-center justify-center hover:bg-white/10 hover:text-white hover:rotate-180 transition-all duration-500 border border-white/10 backdrop-blur-sm"
        >
          <RotateCcw size={28} />
        </button>
      </div>
    </div>
  );
};

export default Timer;
