import { type ChangeEvent, type Dispatch, type SetStateAction } from 'react';
import type { MarqueeSettings } from '../types';

interface Props {
  settings: MarqueeSettings;
  setSettings: Dispatch<SetStateAction<MarqueeSettings>>;
  setIsMenuOpen: (open: boolean) => void;
  marqueeRef: React.RefObject<HTMLDivElement>;
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
    <div className="absolute top-0 left-0 w-80 h-full bg-slate-950/80 backdrop-blur-3xl text-white z-[90] p-8 pt-28 shadow-[20px_0_50px_rgba(0,0,0,0.5)] flex flex-col gap-10 overflow-y-auto border-r border-white/5">
      <div className="relative">
        <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-none">Config</h2>
        <div className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
      </div>

      <div className="flex flex-col gap-3 group">
        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Current Message</label>
<textarea 
  autoFocus
  name="text" 
  value={settings.text} 
  onChange={handleChange} 
  className="p-4 bg-white/[0.03] border border-white/10 rounded-xl outline-none h-24 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none text-sm" 
  placeholder="Type something bold..." 
/>      </div>

      <div className="flex flex-col gap-3">
        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Typography Style</label>
        <div className="grid grid-cols-2 gap-2">
          {FONT_OPTIONS.map((font) => (
            <button key={font.id} onClick={() => updateSetting('fontFamily', font.id)} style={{ fontFamily: font.id }} className={`px-3 py-3 rounded-xl border text-sm transition-all ${settings.fontFamily === font.id ? 'bg-blue-600/20 border-blue-500/50 text-white' : 'bg-white/[0.02] border-white/5 text-slate-400'}`}>
              {font.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {[
          { label: 'Flow Direction', key: 'direction' as const, options: [{v: 'horizontal', l: 'Horizontal'}, {v: 'vertical', l: 'Vertical'}]},
          { label: 'Animation Speed', key: 'speed' as const, options: [{v: 5, l: 'Chilled'}, {v: 7, l: 'Steady'}, {v: 10, l: 'Turbo'}]},
          { label: 'Visual Scale', key: 'fontSize' as const, options: [{v: 200, l: 'Small'}, {v: 300, l: 'Large'}, {v: 600, l: 'Massive'}]}
        ].map((group) => (
          <div key={group.key} className="flex flex-col gap-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{group.label}</label>
            <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/5 shadow-inner">
              {group.options.map((opt) => (
                <button key={opt.v} onClick={() => updateSetting(group.key, opt.v)} className={`flex-1 py-2.5 rounded-xl transition-all text-[11px] font-black uppercase tracking-wider ${settings[group.key] === opt.v ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'text-slate-500 hover:text-white'}`}>
                  {opt.l}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-8 mb-8 border-t border-white/5 space-y-4">
        {[
          { label: 'Text Style', colorKey: 'textColor' as const, rainbowKey: 'isTextRainbow' as const },
          { label: 'Canvas Style', colorKey: 'bgColor' as const, rainbowKey: 'isBgRainbow' as const }
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between bg-white/[0.02] p-4 rounded-2xl border border-white/5 group">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
              <div className="flex items-center gap-3">
                <input name={item.colorKey} type="color" value={settings[item.colorKey]} onChange={handleChange} className="w-8 h-8 cursor-pointer bg-transparent border-none rounded-full" />
                <span className="text-[10px] font-mono opacity-40 uppercase">{settings[item.colorKey]}</span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input name={item.rainbowKey} type="checkbox" checked={settings[item.rainbowKey]} onChange={handleChange} className="sr-only peer" />
              <div className="w-11 h-6 bg-white/5 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-pink-500 peer-checked:to-orange-400 transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full shadow-inner"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingPanel;