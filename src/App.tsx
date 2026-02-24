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
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="absolute top-4 left-4 md:top-6 md:left-6 z-[120] p-3 md:p-3 rounded-xl font-medium text-sm bg-zinc-900/80 border border-zinc-700/50 text-white backdrop-blur-lg hover:bg-zinc-800/80 hover:border-zinc-600 transition-all active:scale-95 shadow-lg min-w-[48px] min-h-[48px] flex items-center justify-center"
        >
          {isMenuOpen ? '✕' : '☰'}
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

      <footer className="absolute bottom-6 right-8 z-50 hidden md:flex flex-col items-end">
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-600">Created by</span>
        <a href="https://github.com/tony-nlc" target="_blank" rel="noreferrer" className="text-sm font-semibold text-zinc-400 hover:text-fuchsia-400 transition-colors">
          TONY-NLC
        </a>
      </footer>
    </div>
  );
}

export default App;