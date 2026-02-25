import { useState, useRef, useEffect } from "react";
import SettingPanel from './components/SettingPanel';
import type { MarqueeSettings } from './types';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(200);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  
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

  useEffect(() => {
    const calculateFontSize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const textLength = settings.text.length;
      const isVertical = settings.direction === 'vertical' || isMobile;
      
      const baseSize = isVertical ? vh * 0.4 : vw * 0.3;
      const lengthFactor = Math.max(1, textLength / 10);
      const sizeMultiplier = settings.fontSize / 300;
      const newSize = Math.max(32, Math.min((baseSize / lengthFactor) * sizeMultiplier, 400));
      
      setFontSize(newSize);
    };

    calculateFontSize();
    const resize = () => {
      setIsMobile(window.innerWidth < 768);
      calculateFontSize();
    };

    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [settings.text, settings.direction, settings.fontSize, isMobile]);

  const duration = (11 - settings.speed) * 1.5;

  const useVertical = settings.direction === 'vertical' || isMobile;

return (
  <div 
    className={`relative w-screen h-[100dvh] overflow-hidden transition-colors duration-700
      ${settings.isBgRainbow ? 'animate-gradient-rainbow' : ''}`}
    style={{ backgroundColor: settings.isBgRainbow ? undefined : settings.bgColor }}
  >
    <div ref={marqueeRef} className="marquee-visual-layer pointer-events-none">
      <div 
        key={settings.direction + (isMobile ? '-m' : '')} 
        className={`marquee-strip ${
          useVertical ? 'animate-marquee-v' : 'animate-marquee-h'
        }`}
        style={{ animationDuration: `${duration}s` }}
      >
        <h1 
          className={`inline-block font-black select-none ${settings.isTextRainbow ? 'animate-text-rainbow' : ''}`}
          style={{ 
            color: settings.textColor,
            fontFamily: settings.fontFamily,
            fontSize: `${fontSize}px`,
          }}
        >
          {settings.text}
        </h1>
      </div>
    
      </div>

      <div className="ui-layer">
        {/* Menu Button - enhanced style */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="absolute top-4 left-4 md:top-6 md:left-6 z-[120] p-3 rounded-2xl font-medium text-sm 
            bg-zinc-900/90 border border-zinc-700/50 text-white backdrop-blur-xl 
            hover:bg-zinc-800/90 hover:border-zinc-500/50 hover:scale-105 
            transition-all duration-200 active:scale-95 
            shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30
            min-w-[48px] min-h-[48px] flex items-center justify-center"
        >
          {isMenuOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {isMenuOpen && (
          <div className="settings-panel-mobile-container">
            <SettingPanel 
              settings={settings} 
              setSettings={setSettings} 
              setIsMenuOpen={setIsMenuOpen}
            />
          </div>
        )}
      </div>

      {/* Footer - subtle and modern */}
      <footer className="absolute bottom-6 right-6 z-50 hidden md:flex flex-col items-end gap-0.5">
        <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-zinc-700">Created by</span>
        <a 
          href="https://github.com/tony-nlc" 
          target="_blank" 
          rel="noreferrer" 
          className="text-sm font-semibold text-zinc-500 hover:text-fuchsia-400 transition-colors duration-200"
        >
          tony-nlc
        </a>
      </footer>
    </div>
  );
}

export default App;
