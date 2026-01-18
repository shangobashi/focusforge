import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface SoundChannelProps {
  label: string;
  src: string;
  isActive: boolean;
  onToggle: () => void;
  volume: number;
  onVolumeChange: (val: number) => void;
  playbackRate?: number;
}

const SoundChannel: React.FC<SoundChannelProps> = ({ 
  label, src, isActive, onToggle, volume, onVolumeChange, playbackRate = 1.0 
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio object only once
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.loop = true;
      audioRef.current.preload = "auto";
    }

    // Apply playback rate if specified (pitch shifting)
    if (audioRef.current) {
        audioRef.current.playbackRate = playbackRate;
        // Re-apply on loop just in case browser resets it (rare but safer)
    }

    // Handle play/pause
    if (isActive) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Audio playback failed:", error);
        });
      }
    } else {
      audioRef.current.pause();
    }

    return () => {
      // Cleanup not strictly necessary for singleton components but good practice
    };
  }, [isActive, src, playbackRate]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className="flex items-center gap-5 bg-white/5 hover:bg-white/10 p-5 rounded-xl border border-white/5 transition-colors group">
      <button 
        className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 shadow-lg ${isActive ? 'bg-bluelabs-primary text-white shadow-bluelabs-primary/30 scale-110' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'}`}
        onClick={onToggle}
      >
        {isActive ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-slate-200 tracking-wide">{label}</h4>
      </div>
      <input 
        type="range" 
        min="0" 
        max="1" 
        step="0.01" 
        value={volume}
        onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
        className="w-28 accent-bluelabs-primary cursor-pointer h-1.5 bg-slate-700 rounded-lg appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md"
        disabled={!isActive}
      />
    </div>
  );
};

const SoundMixer = () => {
  const [channels, setChannels] = useState([
    { 
      id: '1', 
      label: 'Heavy Rain', 
      src: '/sounds/rain.ogg',
      active: false, 
      volume: 0.5,
      playbackRate: 1.0
    },
    { 
      id: '2', 
      label: 'Cosmic Void', 
      src: '/sounds/cosmic.mp3',
      active: false, 
      volume: 0.5,
      playbackRate: 1.0
    },
    { 
      id: '3', 
      label: 'Coffee Shop', 
      src: '/sounds/cafe.ogg',
      active: false, 
      volume: 0.5,
      playbackRate: 1.0
    },
  ]);

  const toggleChannel = (id: string) => {
    setChannels(prev => prev.map(ch => 
      ch.id === id ? { ...ch, active: !ch.active } : ch
    ));
  };

  const updateVolume = (id: string, vol: number) => {
    setChannels(prev => prev.map(ch => 
      ch.id === id ? { ...ch, volume: vol } : ch
    ));
  };

  return (
    <div className="card-rim bg-bluelabs-surface/40 backdrop-blur-xl p-8 rounded-2xl border border-white/5">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-white">
        <div className="p-2 bg-bluelabs-primary/20 rounded-lg text-bluelabs-primary">
          <Volume2 size={20} />
        </div>
        Ambient Focus
      </h2>
      <div className="space-y-3">
        {channels.map(ch => (
          <SoundChannel 
            key={ch.id}
            {...ch}
            isActive={ch.active}
            onToggle={() => toggleChannel(ch.id)}
            onVolumeChange={(v) => updateVolume(ch.id, v)}
            playbackRate={ch.playbackRate}
          />
        ))}
      </div>
    </div>
  );
};

export default SoundMixer;
