import { useState, ChangeEvent, Dispatch, SetStateAction } from 'react';

interface InputProps {
  setDisplayText: Dispatch<SetStateAction<string>>;
}

function Input({ setDisplayText }: InputProps) {
  const [input, setInput] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setDisplayText(value);
  };

  const text = input || "Type to start the loop...";

  return (
    <div className="flex flex-col gap-10 p-6 max-w-2xl mx-auto">
      <input 
        className="border-2 border-slate-300 p-3 rounded-lg focus:border-blue-500 outline-none" 
        onChange={handleChange} 
        placeholder="Type here..."
      />

      {/* --- HORIZONTAL INFINITE LOOP --- */}
      <div className="relative flex overflow-hidden bg-slate-900 text-white py-4 rounded-xl border-4 border-slate-800">
        {/* Container 1 */}
        <div className="flex animate-[marquee_10s_linear_infinite] whitespace-nowrap min-w-full shrink-0">
          <span className="text-3xl font-black uppercase px-4">{text}</span>
          <span className="text-3xl font-black uppercase px-4">{text}</span>
        </div>
        {/* Container 2 (Mirrors the first to create the seamless gap fill) */}
        <div className="flex animate-[marquee_10s_linear_infinite] whitespace-nowrap min-w-full shrink-0">
          <span className="text-3xl font-black uppercase px-4">{text}</span>
          <span className="text-3xl font-black uppercase px-4">{text}</span>
        </div>
      </div>

      {/* --- VERTICAL INFINITE LOOP --- */}
      <div className="h-32 relative overflow-hidden bg-blue-600 text-white rounded-xl border-4 border-blue-500">
        <div className="flex flex-col animate-[marqueeVertical_5s_linear_infinite] h-full">
          <span className="h-32 flex items-center justify-center text-2xl font-bold shrink-0">{text}</span>
          <span className="h-32 flex items-center justify-center text-2xl font-bold shrink-0">{text}</span>
        </div>
      </div>
    </div>
  );
}

export default Input;