import { useState, useRef } from "react";
import SettingPanel from './components/SettingPanel';
import type { MarqueeSettings } from './types';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  const [settings, setSettings] = useState<MarqueeSettings>({
    text: "Enter Your Text",
    fontFamily: 'sans-serif',
    fontSize: 200,
    bgColor: '#000000',
    isBgRainbow: false,
    textColor: '#ffffff',
    isTextRainbow: false,
    direction: 'horizontal',
    speed: 5
  });

  const duration = (11 - settings.speed) * 1.5; // Slightly faster scaling

return (
  <div 
    className={`relative w-screen h-[100dvh] overflow-hidden transition-colors duration-700
      ${settings.isBgRainbow ? 'animate-gradient-rainbow' : ''}`}
    style={{ backgroundColor: settings.isBgRainbow ? undefined : settings.bgColor }}
  >
    <div ref={marqueeRef} className="marquee-visual-layer pointer-events-none">
      <div 
        // Force re-render on direction change to reset keyframes
        key={settings.direction} 
        className={`marquee-strip ${
          settings.direction === 'horizontal' ? 'animate-marquee-h' : 'animate-marquee-v'
        }`}
        style={{ animationDuration: `${duration}s` }}
      >
        <h1 
          className={`inline-block font-black select-none ${settings.isTextRainbow ? 'animate-text-rainbow' : ''}`}
          style={{ 
            color: settings.textColor,
            fontFamily: settings.fontFamily,
            fontSize: `${settings.fontSize}px`,
            paddingRight: settings.direction === 'horizontal' ? '100vw' : '0',
            paddingBottom: settings.direction === 'vertical' ? '100vh' : '0'
          }}
        >
          {settings.text}
        </h1>
      </div>
    
      </div>

      <div className="ui-layer">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="absolute top-6 left-6 z-[120] px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.2em] bg-white/10 border border-white/20 text-white backdrop-blur-xl hover:bg-white/20 transition-all active:scale-95 shadow-2xl"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        {isMenuOpen && (
          <div className="settings-panel-mobile-container">
            <SettingPanel 
              settings={settings} 
              setSettings={setSettings} 
              setIsMenuOpen={setIsMenuOpen}
              marqueeRef={marqueeRef}
            />
          </div>
        )}
      </div>

      <footer className="absolute bottom-6 right-8 z-50 hidden md:flex flex-col items-end">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Created by</span>
        <a href="https://github.com/tony-nlc" target="_blank" rel="noreferrer" className="text-sm font-bold text-white/80 hover:text-blue-400">
          TONY-NLC
        </a>
      </footer>
    </div>
  );
}

export default App;