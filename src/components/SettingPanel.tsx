import { type ChangeEvent, type Dispatch, type SetStateAction } from 'react';
import type { MarqueeSettings } from '../types';

interface Props {
  settings: MarqueeSettings;
  setSettings: Dispatch<SetStateAction<MarqueeSettings>>;
  setIsMenuOpen: (open: boolean) => void;
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

const SettingPanel = ({ settings, setSettings }: Props) => {

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
    <div className="absolute top-0 left-0 w-full md:w-80 h-full bg-[#0d0d12]/95 backdrop-blur-xl text-white z-[90] p-6 pt-20 md:shadow-[0_0_80px_rgba(0,0,0,0.9)] flex flex-col gap-6 overflow-y-auto border-r border-white/5">
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
        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Message
        </label>
        <textarea 
          name="text" 
          value={settings.text} 
          onChange={handleChange} 
          className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl outline-none h-20 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none text-sm placeholder:text-zinc-600 text-zinc-200"
          placeholder="Enter your text..."
        />
      </div>

      {/* Font Selection */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Typography
        </label>
        <div className="grid grid-cols-3 gap-2">
          {FONT_OPTIONS.map((font) => (
            <button 
              key={font.id} 
              onClick={() => updateSetting('fontFamily', font.id)} 
              style={{ fontFamily: font.id.includes(' ') ? font.id.split(',')[0].replace(/'/g, '') : font.id }} 
              className={`px-2 py-3 rounded-lg border text-xs transition-all duration-200 ${
                settings.fontFamily === font.id 
                  ? 'bg-violet-600/30 border-violet-500/50 text-white' 
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
        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Direction
        </label>
        <div className="flex bg-zinc-900/60 p-1 rounded-xl border border-zinc-800">
          <button 
            onClick={() => updateSetting('direction', 'horizontal')} 
            className={`flex-1 py-2.5 rounded-lg transition-all text-sm font-medium flex items-center justify-center gap-2 ${
              settings.direction === 'horizontal' 
                ? 'bg-violet-600 text-white' 
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Horizontal
          </button>
          <button 
            onClick={() => updateSetting('direction', 'vertical')} 
            className={`flex-1 py-2.5 rounded-lg transition-all text-sm font-medium flex items-center justify-center gap-2 ${
              settings.direction === 'vertical' 
                ? 'bg-violet-600 text-white' 
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Vertical
          </button>
        </div>
      </div>

      {/* Speed */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Speed
        </label>
        <div className="flex bg-zinc-900/60 p-1 rounded-xl border border-zinc-800">
          {[
            { v: 5, l: 'Slow' },
            { v: 7, l: 'Normal' },
            { v: 10, l: 'Fast' }
          ].map((opt) => (
            <button 
              key={opt.v} 
              onClick={() => updateSetting('speed', opt.v)} 
              className={`flex-1 py-2 rounded-lg transition-all text-sm font-medium ${
                settings.speed === opt.v 
                  ? 'bg-violet-600 text-white' 
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
        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Size
        </label>
        <div className="flex bg-zinc-900/60 p-1 rounded-xl border border-zinc-800">
          {[
            { v: 200, l: 'Small' },
            { v: 300, l: 'Medium' },
            { v: 600, l: 'Large' }
          ].map((opt) => (
            <button 
              key={opt.v} 
              onClick={() => updateSetting('fontSize', opt.v)} 
              className={`flex-1 py-2 rounded-lg transition-all text-sm font-medium ${
                settings.fontSize === opt.v 
                  ? 'bg-violet-600 text-white' 
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {opt.l}
            </button>
          ))}
        </div>
      </div>

      {/* Color Controls */}
      <div className="flex flex-col gap-3 pt-2 border-t border-white/5">
        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Colors
        </label>
        
        <div className="flex flex-col gap-2">
          {/* Text Color */}
          <div className="flex items-center justify-between bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/50">
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-400 w-20">Text</span>
              <input 
                name="textColor" 
                type="color" 
                value={settings.textColor} 
                onChange={handleChange} 
                className="w-7 h-7 cursor-pointer bg-transparent border-2 border-zinc-700 rounded-lg overflow-hidden" 
              />
              <span className="text-[10px] font-mono text-zinc-500">{settings.textColor}</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input name="isTextRainbow" type="checkbox" checked={settings.isTextRainbow} onChange={handleChange} className="sr-only peer" />
              <div className="w-9 h-5 bg-zinc-800 rounded-full peer peer-checked:bg-violet-600 transition-all after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
            </label>
          </div>

          {/* Background Color */}
          <div className="flex items-center justify-between bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/50">
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-400 w-20">Background</span>
              <input 
                name="bgColor" 
                type="color" 
                value={settings.bgColor} 
                onChange={handleChange} 
                className="w-7 h-7 cursor-pointer bg-transparent border-2 border-zinc-700 rounded-lg overflow-hidden" 
              />
              <span className="text-[10px] font-mono text-zinc-500">{settings.bgColor}</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input name="isBgRainbow" type="checkbox" checked={settings.isBgRainbow} onChange={handleChange} className="sr-only peer" />
              <div className="w-9 h-5 bg-zinc-800 rounded-full peer peer-checked:bg-violet-600 transition-all after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
            </label>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 text-center">
        <p className="text-[10px] text-zinc-600">v1.0</p>
      </div>
    </div>
  );
};

export default SettingPanel;