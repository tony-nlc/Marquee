import { type ChangeEvent, type Dispatch, type SetStateAction } from 'react';
import type { MarqueeSettings } from '../types';

interface Props {
  settings: MarqueeSettings;
  setSettings: Dispatch<SetStateAction<MarqueeSettings>>;
  setIsMenuOpen: (open: boolean) => void;
  marqueeRef: React.RefObject<HTMLDivElement>;
  isExporting?: boolean;
  exportProgress?: number;
  onExport?: () => void;
}

const FONT_OPTIONS = [
  { id: 'sans-serif', label: 'Modern' },
  { id: 'serif', label: 'Classic' },
  { id: 'monospace', label: 'Terminal' },
  { id: "'Arial Black', sans-serif", label: 'Impact' },
  { id: 'cursive', label: 'Script' },
  { id: "'Inter', sans-serif", label: 'Clean' },
  { id: "'Playfair Display', serif", label: 'Luxury' },
  { id: 'system-ui', label: 'System' },
  { id: "'Bebas Neue', sans-serif", label: 'Bold' },
  { id: "'Permanent Marker', cursive", label: 'Marker' },
  { id: "'Righteous', cursive", label: 'Neon' },
  { id: "'Orbitron', sans-serif", label: 'Sci-Fi' },
  { id: "'Abril Fatface', serif", label: 'Display' },
];

const SettingPanel = ({ settings, setSettings, isExporting, exportProgress, onExport }: Props) => {

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const val = isCheckbox ? (e.target as HTMLInputElement).checked : value;

    setSettings(prev => ({
      ...prev,
      [name]: (name === 'fontSize' || name === 'speed') ? Number(val) : val
    }));
  };

  const updateSetting = (name: keyof MarqueeSettings, value: number | string) => {
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="absolute top-0 left-0 w-full md:w-80 h-full bg-[#0d0d12]/95 backdrop-blur-xl text-white z-[90] p-6 pt-20 md:shadow-[0_0_80px_rgba(0,0,0,0.9)] flex flex-col gap-5 overflow-y-auto border-r border-white/5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Marquee</h2>
          <p className="text-xs text-zinc-500">Customize your text</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </div>
      </div>

      {/* Message Input */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-violet-500"></span>
          Message
        </label>
        <textarea 
          name="text" 
          value={settings.text} 
          onChange={handleChange} 
          className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-2xl outline-none h-20 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none text-sm placeholder:text-zinc-600 text-zinc-200"
          placeholder="Enter your text..."
        />
      </div>

      {/* Font Selection */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-fuchsia-500"></span>
          Typography
        </label>
        <div className="grid grid-cols-3 gap-2">
          {FONT_OPTIONS.map((font) => (
            <button 
              key={font.id} 
              onClick={() => updateSetting('fontFamily', font.id)} 
              style={{ fontFamily: font.id.includes(' ') ? font.id.split(',')[0].replace(/'/g, '') : font.id }} 
              className={`px-2 py-3 rounded-xl border text-xs transition-all duration-200 ${
                settings.fontFamily === font.id 
                  ? 'bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 border-violet-500/50 text-white shadow-[0_0_15px_rgba(139,92,246,0.15)]' 
                  : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:bg-zinc-800/60 hover:border-zinc-700 hover:text-zinc-300'
              }`}
            >
              {font.label}
            </button>
          ))}
        </div>
      </div>

      {/* Direction */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-cyan-500"></span>
          Direction
        </label>
        <div className="flex bg-zinc-900/60 p-1.5 rounded-2xl border border-zinc-800">
          <button 
            onClick={() => updateSetting('direction', 'horizontal')} 
            className={`flex-1 py-3 rounded-xl transition-all text-sm font-medium flex items-center justify-center gap-2 ${
              settings.direction === 'horizontal' 
                ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25' 
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Horizontal
          </button>
          <button 
            onClick={() => updateSetting('direction', 'vertical')} 
            className={`flex-1 py-3 rounded-xl transition-all text-sm font-medium flex items-center justify-center gap-2 ${
              settings.direction === 'vertical' 
                ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25' 
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v.01M12 16v.01M8 12h8M12 21a9 9 0 100-18 9 9 0 000 18z" />
            </svg>
            Vertical
          </button>
        </div>
      </div>

      {/* Speed */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-amber-500"></span>
          Speed
        </label>
        <div className="flex bg-zinc-900/60 p-1.5 rounded-2xl border border-zinc-800">
          {[
            { v: 5, l: 'Slow', icon: '🐢' },
            { v: 7, l: 'Normal', icon: '🚶' },
            { v: 10, l: 'Fast', icon: '🚀' }
          ].map((opt) => (
            <button 
              key={opt.v} 
              onClick={() => updateSetting('speed', opt.v)} 
              className={`flex-1 py-2.5 rounded-xl transition-all text-sm font-medium ${
                settings.speed === opt.v 
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25' 
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {opt.l}
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
          Size
        </label>
        <div className="flex bg-zinc-900/60 p-1.5 rounded-2xl border border-zinc-800">
          {[
            { v: 200, l: 'Small' },
            { v: 300, l: 'Medium' },
            { v: 600, l: 'Large' }
          ].map((opt) => (
            <button 
              key={opt.v} 
              onClick={() => updateSetting('fontSize', opt.v)} 
              className={`flex-1 py-2.5 rounded-xl transition-all text-sm font-medium ${
                settings.fontSize === opt.v 
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25' 
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {opt.l}
            </button>
          ))}
        </div>
      </div>

      {/* Color Controls */}
      <div className="flex flex-col gap-3 pt-2 border-t border-zinc-800/50">
        <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-pink-500"></span>
          Colors
        </label>
        
        {[
          { label: 'Text', colorKey: 'textColor' as const, rainbowKey: 'isTextRainbow' as const, icon: '🔤' },
          { label: 'Background', colorKey: 'bgColor' as const, rainbowKey: 'isBgRainbow' as const, icon: '🎨' }
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between bg-zinc-900/40 p-3 rounded-2xl border border-zinc-800/50 hover:border-zinc-700/50 transition-all">
            <div className="flex items-center gap-3">
              <span className="text-lg">{item.icon}</span>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-medium text-zinc-300">{item.label}</span>
                <div className="flex items-center gap-2">
                  <input 
                    name={item.colorKey} 
                    type="color" 
                    value={settings[item.colorKey]} 
                    onChange={handleChange} 
                    className="w-7 h-7 cursor-pointer bg-transparent border-2 border-zinc-700 rounded-lg overflow-hidden" 
                  />
                  <span className="text-[9px] font-mono text-zinc-600">{settings[item.colorKey]}</span>
                </div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input name={item.rainbowKey} type="checkbox" checked={settings[item.rainbowKey]} onChange={handleChange} className="sr-only peer" />
              <div className="w-11 h-6 bg-zinc-800 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-pink-500 peer-checked:to-amber-500 transition-all after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full shadow-inner" />
            </label>
          </div>
        ))}
      </div>

      {/* Export as GIF */}
      <div className="flex flex-col gap-2 pt-4 border-t border-zinc-800/50">
        <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-blue-500"></span>
          Export
        </label>
        <button
          onClick={onExport}
          disabled={isExporting}
          className={`w-full py-4 rounded-2xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
            isExporting
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-500 hover:to-cyan-500 shadow-lg shadow-blue-500/25'
          }`}
        >
          {isExporting ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Exporting... {exportProgress}%
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export as GIF
            </>
          )}
        </button>
        {isExporting && (
          <div className="w-full bg-zinc-800 rounded-full h-2 mt-1 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
              style={{ width: `${exportProgress}%` }}
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 text-center">
        <p className="text-[9px] text-zinc-600">v1.0 • Made by Tony</p>
      </div>
    </div>
  );
};

export default SettingPanel;
