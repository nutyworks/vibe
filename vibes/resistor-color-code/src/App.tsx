import { useState } from 'react';

type ColorData = {
  name: string;
  value: number;
  multiplier: number;
  tolerance?: number;
  bg: string;
  text: string;
};

const colors: Record<string, ColorData> = {
  black: { name: 'Black', value: 0, multiplier: 1, bg: 'bg-[#000000]', text: 'text-white' },
  brown: { name: 'Brown', value: 1, multiplier: 10, tolerance: 1, bg: 'bg-[#8B4513]', text: 'text-white' },
  red: { name: 'Red', value: 2, multiplier: 100, tolerance: 2, bg: 'bg-[#FF0000]', text: 'text-white' },
  orange: { name: 'Orange', value: 3, multiplier: 1000, bg: 'bg-[#FF8C00]', text: 'text-black' },
  yellow: { name: 'Yellow', value: 4, multiplier: 10000, bg: 'bg-[#FFFF00]', text: 'text-black' },
  green: { name: 'Green', value: 5, multiplier: 100000, tolerance: 0.5, bg: 'bg-[#008000]', text: 'text-white' },
  blue: { name: 'Blue', value: 6, multiplier: 1000000, tolerance: 0.25, bg: 'bg-[#0000FF]', text: 'text-white' },
  violet: { name: 'Violet', value: 7, multiplier: 10000000, tolerance: 0.1, bg: 'bg-[#EE82EE]', text: 'text-black' },
  grey: { name: 'Grey', value: 8, multiplier: 100000000, tolerance: 0.05, bg: 'bg-[#808080]', text: 'text-white' },
  white: { name: 'White', value: 9, multiplier: 1000000000, bg: 'bg-[#FFFFFF]', text: 'text-black' },
  gold: { name: 'Gold', value: -1, multiplier: 0.1, tolerance: 5, bg: 'bg-[#FFD700]', text: 'text-black' },
  silver: { name: 'Silver', value: -1, multiplier: 0.01, tolerance: 10, bg: 'bg-[#C0C0C0]', text: 'text-black' },
};

function App() {
  const [isFiveBand, setIsFiveBand] = useState(true);
  const [bands, setBands] = useState(['brown', 'black', 'black', 'red', 'gold']);

  const calculateResistance = () => {
    let value = 0;
    let tolerance = 0;

    if (isFiveBand) {
      const d1 = colors[bands[0]].value;
      const d2 = colors[bands[1]].value;
      const d3 = colors[bands[2]].value;
      const mult = colors[bands[3]].multiplier;
      tolerance = colors[bands[4]].tolerance || 0;
      value = (d1 * 100 + d2 * 10 + d3) * mult;
    } else {
      const d1 = colors[bands[0]].value;
      const d2 = colors[bands[1]].value;
      const mult = colors[bands[3]].multiplier; // Skip 3rd band for 4-band
      tolerance = colors[bands[4]].tolerance || 0;
      value = (d1 * 10 + d2) * mult;
    }
    
    let formattedValue = '';
    if (value >= 1000000) formattedValue = (Math.round(value / 10000) / 100) + ' MΩ';
    else if (value >= 1000) formattedValue = (Math.round(value / 10) / 100) + ' kΩ';
    else formattedValue = (Math.round(value * 100) / 100) + ' Ω';

    return { formattedValue, tolerance };
  };

  const { formattedValue, tolerance } = calculateResistance();

  const updateBand = (index: number, color: string) => {
    const newBands = [...bands];
    newBands[index] = color;
    setBands(newBands);
  };

  const toggleMode = () => {
    setIsFiveBand(!isFiveBand);
    // Reset or adjust bands if needed
  };

  const bandLabels = isFiveBand 
    ? ['1st Digit', '2nd Digit', '3rd Digit', 'Multiplier', 'Tolerance']
    : ['1st Digit', '2nd Digit', '(unused)', 'Multiplier', 'Tolerance'];

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col items-center justify-center p-4 sm:p-8 font-sans">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,#1a1a1a_0%,#050505_100%)] pointer-events-none"></div>

      <div className="max-w-2xl w-full relative z-10">
        <header className="mb-12 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            Tool 02 • Components
          </div>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-4 leading-tight">Resistor Codes.</h1>
          <p className="text-slate-500 text-lg mb-8">Identify values with visual precision.</p>
          
          <button 
            onClick={toggleMode}
            className="px-6 py-2 bg-slate-900 border border-white/10 rounded-full text-xs font-mono uppercase tracking-widest hover:bg-slate-800 transition-all cursor-pointer"
          >
            Mode: {isFiveBand ? '5-Band (Precision)' : '4-Band (Standard)'}
          </button>
        </header>

        <main className="space-y-6">
          {/* Visual Resistor */}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-10 sm:p-16 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-50"></div>
            
            <div className="relative w-full max-w-sm h-32 flex items-center justify-center mb-10">
              {/* Wire */}
              <div className="absolute w-full h-1 bg-slate-800 rounded-full shadow-lg"></div>
              {/* Body */}
              <div className="relative w-56 h-14 bg-[#d1b48c] rounded-[2rem] flex items-center justify-between px-6 shadow-2xl border border-black/10 overflow-hidden">
                <div className="flex justify-start gap-3 w-3/4 h-full items-center">
                  <div className={`w-3.5 h-full ${colors[bands[0]].bg} shadow-inner`}></div>
                  <div className={`w-3.5 h-full ${colors[bands[1]].bg} shadow-inner`}></div>
                  {isFiveBand && <div className={`w-3.5 h-full ${colors[bands[2]].bg} shadow-inner animate-in fade-in zoom-in duration-300`}></div>}
                  <div className={`w-3.5 h-full ${colors[bands[3]].bg} shadow-inner`}></div>
                </div>
                <div className={`w-3.5 h-full ${colors[bands[4]].bg} shadow-inner`}></div>
              </div>
            </div>

            <div className="text-center relative">
              <div className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.4em] mb-2 opacity-80">Resistance Value</div>
              <div className="text-5xl sm:text-7xl font-black text-white tracking-tighter mb-1 drop-shadow-md">
                {formattedValue}
              </div>
              <div className="text-slate-500 font-mono text-sm tracking-widest">
                TOLERANCE ± {tolerance}%
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bandLabels.map((label, bandIdx) => (
              <div 
                key={bandIdx} 
                className={`bg-[#0a0a0a] border border-white/5 rounded-3xl p-5 transition-opacity duration-300 ${!isFiveBand && bandIdx === 2 ? 'opacity-20 pointer-events-none' : ''}`}
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="text-[10px] font-mono text-blue-500 uppercase tracking-widest">{label}</div>
                  <div className={`w-3 h-3 rounded-full ${colors[bands[bandIdx]].bg} border border-white/10`}></div>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {Object.entries(colors).map(([id, color]) => {
                    // Validation logic for each band
                    if (bandIdx < 3 && (id === 'gold' || id === 'silver')) return null;
                    if (bandIdx === 4 && !color.tolerance) return null;
                    if (bandIdx === 3 && color.multiplier === undefined) return null;

                    return (
                      <button
                        key={id}
                        onClick={() => updateBand(bandIdx, id)}
                        className={`w-7 h-7 rounded-full ${color.bg} border-2 ${bands[bandIdx] === id ? 'border-white scale-110 ring-4 ring-blue-500/20' : 'border-transparent opacity-40 hover:opacity-100'} transition-all cursor-pointer`}
                        title={color.name}
                      ></button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-8">
            <a href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return to Hub
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
