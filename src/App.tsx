import { useState, useRef, useEffect, useCallback } from "react";
import SettingPanel from './components/SettingPanel';
import type { MarqueeSettings } from './types';
import html2canvas from 'html2canvas';
import GIF from 'gif.js';

// Import worker properly for Vite
import gifWorkerUrl from 'gif.js/dist/gif.worker.js?url';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(200);
  
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

  // Calculate responsive font size based on viewport and text length
  useEffect(() => {
    const calculateFontSize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const textLength = settings.text.length;
      const isVertical = settings.direction === 'vertical';
      
      // Base calculation: fit text to screen width/height
      const baseSize = isVertical ? vh * 0.4 : vw * 0.3;
      // Adjust based on text length (longer text = smaller font)
      const lengthFactor = Math.max(1, textLength / 10);
      // Apply size multiplier from settings (200=S, 300=M, 600=L -> 0.7, 1.0, 1.5)
      const sizeMultiplier = settings.fontSize / 300;
      const newSize = Math.max(32, Math.min((baseSize / lengthFactor) * sizeMultiplier, 400));
      
      setFontSize(newSize);
    };

    calculateFontSize();
    window.addEventListener('resize', calculateFontSize);
    return () => window.removeEventListener('resize', calculateFontSize);
  }, [settings.text, settings.direction, settings.fontSize]);

  const duration = (11 - settings.speed) * 1.5;

  const exportAsGif = useCallback(async () => {
    if (!marqueeRef.current || isExporting) return;
    
    setIsExporting(true);
    setExportProgress(0);

    try {
      const container = marqueeRef.current;
      const width = container.offsetWidth || 800;
      const height = container.offsetHeight || 600;
      const frameCount = 120;
      const frameDelay = 50;
      
      const gif = new GIF({
        workers: 2,
        quality: 8,
        width,
        height,
        workerScript: gifWorkerUrl
      });

      const textElement = container.querySelector('.marquee-strip') as HTMLElement;
      
      if (!textElement) {
        throw new Error('Marquee text element not found');
      }

      // Store original styles to restore later
      const originalTransform = textElement.style.transform;
      const originalAnimation = textElement.style.animation;
      
      // Capture frames - position text at different offsets to simulate animation
      for (let i = 0; i < frameCount; i++) {
        setExportProgress(Math.round((i / frameCount) * 80));
        
        // Calculate horizontal offset: starts off-screen right, fully traverses, ends off-screen left
        const startOffset = width + 100; // Start past right edge (text width buffer)
        const endOffset = -300; // End past left edge
        const pixelOffset = startOffset + (i / frameCount) * (endOffset - startOffset);
        
        // Position the strip manually at calculated offset
        textElement.style.transform = `translateX(${pixelOffset}px)`;
        textElement.style.animation = 'none';
        
        // Wait for DOM to update
        await new Promise(r => setTimeout(r, 50));

        const canvas = await html2canvas(container, {
          width,
          height,
          scale: 1,
          backgroundColor: settings.isBgRainbow ? '#000000' : settings.bgColor,
          logging: false,
          useCORS: true,
          onclone: (clonedDoc) => {
            // Ensure the cloned element has same dimensions
            const clonedContainer = clonedDoc.querySelector('[ref="marqueeRef"]') || container;
            Object.assign(clonedContainer.style, {
              width: `${width}px`,
              height: `${height}px`
            });
          }
        });

        gif.addFrame(canvas, { delay: frameDelay, copy: true });
      }

      setExportProgress(90);

      gif.on('finished', (blob: Blob) => {
        setExportProgress(100);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `marquee-${Date.now()}.gif`;
        a.click();
        URL.revokeObjectURL(url);
        
        // Restore and restart animation after export
        textElement.style.transform = originalTransform;
        textElement.style.animation = originalAnimation;
        
        // Force reflow to restart animation
        void textElement.offsetWidth;
        
        setIsExporting(false);
        setExportProgress(0);
      });

      gif.render();
    } catch (err) {
      console.error('Export failed:', err);
      setIsExporting(false);
      setExportProgress(0);
    }
  }, [settings, isExporting]);

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
            fontSize: `${fontSize}px`,
            paddingRight: settings.direction === 'horizontal' ? '0' : '0',
            paddingBottom: settings.direction === 'vertical' ? '0' : '0'
          }}
        >
          {settings.text}
        </h1>
      </div>
    
      </div>

      <div className="ui-layer">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="absolute top-6 left-6 z-[120] p-3 rounded-2xl font-medium text-sm bg-zinc-900/60 border border-zinc-700/50 text-white backdrop-blur-xl hover:bg-zinc-800/80 hover:border-zinc-600 transition-all active:scale-95 shadow-lg"
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
              isExporting={isExporting}
              exportProgress={exportProgress}
              onExport={exportAsGif}
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