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
  const [bands, setBands] = useState(['brown', 'black', 'red', 'gold']);

  const calculateResistance = () => {
    const digit1 = colors[bands[0]].value;
    const digit2 = colors[bands[1]].value;
    const multiplier = colors[bands[2]].multiplier;
    const tolerance = colors[bands[3]].tolerance;

    const value = (digit1 * 10 + digit2) * multiplier;
    
    let formattedValue = '';
    if (value >= 1000000) formattedValue = (value / 1000000) + ' MΩ';
    else if (value >= 1000) formattedValue = (value / 1000) + ' kΩ';
    else formattedValue = value + ' Ω';

    return { formattedValue, tolerance };
  };

  const { formattedValue, tolerance } = calculateResistance();

  const updateBand = (index: number, color: string) => {
    const newBands = [...bands];
    newBands[index] = color;
    setBands(newBands);
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col items-center justify-center p-4 sm:p-8 font-sans">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,#1a1a1a_0%,#050505_100%)] pointer-events-none"></div>

      <div className="max-w-2xl w-full relative z-10">
        <header className="mb-12 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 uppercase">
            Tool 02 • Components
          </div>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-4">Color Codes.</h1>
          <p className="text-slate-500 text-lg">Identify resistor values with visual precision.</p>
        </header>

        <main className="space-y-8">
          {/* Visual Resistor */}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-12 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-50"></div>
            
            <div className="relative w-full max-w-sm h-24 flex items-center justify-center mb-8">
              {/* Resistor Body */}
              <div className="absolute w-full h-1.5 bg-slate-800 rounded-full"></div>
              <div className="relative w-48 h-12 bg-[#d1b48c] rounded-2xl flex items-center justify-around px-4 shadow-xl border border-black/10">
                {bands.map((color, i) => (
                  <div 
                    key={i} 
                    className={`w-3 h-full ${colors[color].bg} ${i === 3 ? 'ml-4' : ''} shadow-inner`}
                  ></div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <div className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em] mb-2">Calculated Value</div>
              <div className="text-5xl sm:text-6xl font-black text-white tracking-tighter">
                {formattedValue}
              </div>
              <div className="text-slate-500 font-mono mt-1">± {tolerance}% Tolerance</div>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['1st Digit', '2nd Digit', 'Multiplier', 'Tolerance'].map((label, bandIdx) => (
              <div key={bandIdx} className="bg-white/5 border border-white/5 rounded-2xl p-4">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">{label}</div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(colors).map(([id, color]) => {
                    // Filter based on band position
                    if (bandIdx < 2 && (id === 'gold' || id === 'silver')) return null;
                    if (bandIdx === 3 && !color.tolerance) return null;
                    if (bandIdx === 2 && color.multiplier === undefined) return null;

                    return (
                      <button
                        key={id}
                        onClick={() => updateBand(bandIdx, id)}
                        className={`w-8 h-8 rounded-full ${color.bg} border-2 ${bands[bandIdx] === id ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'} transition-all cursor-pointer`}
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
