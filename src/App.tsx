import { useRef, useEffect } from 'react';
import Timer from './components/Timer';
import TaskList from './components/TaskList';
import SoundMixer from './components/SoundMixer';
import BackgroundWaves from './components/BackgroundWaves';
import { Coffee } from 'lucide-react';
import gsap from 'gsap';

function App() {
  const footerLineRef = useRef<HTMLDivElement>(null);
  const footerTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    
    // Subtle breathing animation for the footer line
    tl.to(footerLineRef.current, {
      width: '65%',
      duration: 4,
      ease: 'sine.inOut',
    });

    // Always-on rim glow + continuous rim sweep (GSAP only)
    gsap.set('.card-rim', {
      boxShadow: '0 0 16px rgba(59, 130, 246, 0.22)',
      borderColor: 'rgba(59, 130, 246, 0.38)'
    });

    gsap.to('.card-rim', {
      '--rim-angle': '360deg',
      duration: 18,
      repeat: -1,
      ease: 'none',
      stagger: { each: 0.6, from: 'random' }
    });

    // Fade in text on load
    gsap.fromTo(footerTextRef.current, 
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power2.out' }
    );
  }, []);

  return (
    <div className="min-h-screen bg-transparent p-6 md:p-12 font-sans selection:bg-bluelabs-primary/30 flex flex-col relative">
      <BackgroundWaves />
      <div className="max-w-6xl mx-auto w-full flex-1 relative z-10">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-2xl shadow-bluelabs-primary/20 border border-white/10 group hover:scale-105 transition-transform duration-500">
              <img src="/logo.webp" alt="FocusForge Logo" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-white tracking-tight flex items-center">
                <span className="font-serif italic mr-1 text-5xl text-bluelabs-primary bg-gradient-to-br from-blue-400 to-bluelabs-primary bg-clip-text text-transparent">ƒ</span>ocus
              </h1>
              <p className="text-bluelabs-muted text-sm font-medium tracking-wide">Your distraction-free workspace</p>
            </div>
          </div>
          
          <a 
            href="https://buymeacoffee.com/shangobashi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="card-rim flex items-center gap-2 px-5 py-2.5 bg-bluelabs-surface/50 hover:bg-bluelabs-primary/10 text-bluelabs-text/80 rounded-xl border border-white/5 transition-all text-sm hover:text-white hover:border-bluelabs-primary/30 shadow-lg backdrop-blur-md"
          >
            <Coffee size={18} className="text-bluelabs-primary" />
            <span className="font-medium">Buy Dev a Coffee</span>
          </a>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left Column: Timer & Ambiance */}
          <div className="lg:col-span-7 space-y-8">
            <Timer />
            <SoundMixer />
          </div>

          {/* Right Column: Tasks */}
          <div className="lg:col-span-5 h-[600px]">
            <TaskList />
          </div>
        </div>
      </div>

      <footer className="mt-auto pt-12 pb-6 flex flex-col items-center justify-center gap-4 relative z-10">
        <div 
          ref={footerLineRef}
          className="h-px bg-gradient-to-r from-transparent via-bluelabs-primary/50 to-transparent w-3/5"
        />
        <div ref={footerTextRef} className="text-bluelabs-muted text-sm font-light tracking-[0.2em] uppercase">
          &copy; 2026 By SHANGO
        </div>
      </footer>
    </div>
  );
}

export default App;
