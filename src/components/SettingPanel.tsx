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

  const OptionButton = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button 
      onClick={onClick}
      className={`px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 ${
        active
          ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25'
          : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50 hover:text-zinc-200 border border-zinc-700/30'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-[#0a0a0f] text-white z-[90] p-5 pt-20 md:p-6 md:pt-20 md:w-80 md:shadow-2xl md:shadow-black/50 flex flex-col gap-5 overflow-y-auto">
      {/* Header with glow effect */}
      <div className="relative">
        <div className="absolute -top-2 -left-2 w-12 h-12 bg-violet-500/20 rounded-full blur-xl" />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
          Marquee
        </h2>
        <p className="text-xs text-zinc-500 mt-1">Customize your display</p>
      </div>

      {/* Message Input - elevated style */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
          Message
        </label>
        <textarea 
          name="text" 
          value={settings.text} 
          onChange={handleChange} 
          className="p-4 bg-zinc-900/60 border border-zinc-800/60 rounded-2xl outline-none h-24 focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10 transition-all resize-none text-sm placeholder:text-zinc-600 text-zinc-200 shadow-inner"
          placeholder="Enter your text..."
        />
      </div>

      {/* Font Selection - pill style */}
      <div className="flex flex-col gap-3">
        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
          Typography
        </label>
        <div className="flex flex-wrap gap-2">
          {FONT_OPTIONS.map((font) => (
            <button 
              key={font.id} 
              onClick={() => updateSetting('fontFamily', font.id)} 
              style={{ fontFamily: font.id.includes(' ') ? font.id.split(',')[0].replace(/'/g, '') : font.id }} 
              className={`px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                settings.fontFamily === font.id 
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25' 
                  : 'bg-zinc-800/40 border border-zinc-700/30 text-zinc-400 hover:bg-zinc-700/50 hover:text-zinc-200'
              }`}
            >
              {font.label}
            </button>
          ))}
        </div>
      </div>

      {/* Direction - segmented control style */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
          Direction
        </label>
        <div className="flex bg-zinc-900/80 p-1 rounded-2xl border border-zinc-800/60">
          <button 
            onClick={() => updateSetting('direction', 'horizontal')} 
            className={`flex-1 py-2.5 rounded-xl transition-all text-sm font-medium flex items-center justify-center gap-2 ${
              settings.direction === 'horizontal' 
                ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25' 
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            ↔ Horizontal
          </button>
          <button 
            onClick={() => updateSetting('direction', 'vertical')} 
            className={`flex-1 py-2.5 rounded-xl transition-all text-sm font-medium flex items-center justify-center gap-2 ${
              settings.direction === 'vertical' 
                ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25' 
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            ↕ Vertical
          </button>
        </div>
      </div>

      {/* Speed */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
          Speed
        </label>
        <div className="flex bg-zinc-900/80 p-1 rounded-2xl border border-zinc-800/60">
          {[
            { v: 5, l: '🐢 Slow' },
            { v: 7, l: '🚶 Normal' },
            { v: 10, l: '🚀 Fast' }
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
        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
          Size
        </label>
        <div className="flex bg-zinc-900/80 p-1 rounded-2xl border border-zinc-800/60">
          {[
            { v: 200, l: 'S' },
            { v: 300, l: 'M' },
            { v: 600, l: 'L' }
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

      {/* Color Controls - card style */}
      <div className="flex flex-col gap-3 pt-2 border-t border-zinc-800/50">
        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
          Colors
        </label>
        
        <div className="flex flex-col gap-2">
          {/* Text Color */}
          <div className="flex items-center justify-between bg-zinc-900/40 p-3 rounded-2xl border border-zinc-800/40">
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-400 w-20 font-medium">Text</span>
              <div className="relative group">
                <input 
                  name="textColor" 
                  type="color" 
                  value={settings.textColor} 
                  onChange={handleChange} 
                  className="w-8 h-8 cursor-pointer bg-transparent border-2 border-zinc-600 rounded-xl overflow-hidden shadow-lg" 
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
              </div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase">{settings.textColor}</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input name="isTextRainbow" type="checkbox" checked={settings.isTextRainbow} onChange={handleChange} className="sr-only peer" />
              <div className="w-11 h-6 bg-zinc-700 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-violet-600 peer-checked:to-fuchsia-600 transition-all after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full shadow-inner" />
            </label>
          </div>

          {/* Background Color */}
          <div className="flex items-center justify-between bg-zinc-900/40 p-3 rounded-2xl border border-zinc-800/40">
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-400 w-20 font-medium">Background</span>
              <div className="relative group">
                <input 
                  name="bgColor" 
                  type="color" 
                  value={settings.bgColor} 
                  onChange={handleChange} 
                  className="w-8 h-8 cursor-pointer bg-transparent border-2 border-zinc-600 rounded-xl overflow-hidden shadow-lg" 
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
              </div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase">{settings.bgColor}</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input name="isBgRainbow" type="checkbox" checked={settings.isBgRainbow} onChange={handleChange} className="sr-only peer" />
              <div className="w-11 h-6 bg-zinc-700 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-violet-600 peer-checked:to-fuchsia-600 transition-all after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full shadow-inner" />
            </label>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 text-center">
        <p className="text-[10px] text-zinc-600">v1.1 • Made with ✨</p>
      </div>
    </div>
  );
};

export default SettingPanel;
