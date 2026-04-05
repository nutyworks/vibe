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
  gold: { name: 'Gold', value: -1, multiplier: 0.1, tolerance: 5, bg: 'bg-[#D4AF37]', text: 'text-black' },
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
      const mult = colors[bands[3]].multiplier;
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
  };

  const bandLabels = isFiveBand 
    ? ['PRIMARY_DIGIT', 'SECONDARY_DIGIT', 'TERTIARY_DIGIT', 'MULTIPLIER', 'TOLERANCE']
    : ['PRIMARY_DIGIT', 'SECONDARY_DIGIT', '(UNUSED)', 'MULTIPLIER', 'TOLERANCE'];

  return (
    <div className="min-h-screen w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col items-center justify-center p-6 sm:p-12 font-sans transition-colors duration-300">
      <div className="max-w-3xl w-full relative z-10">
        <header className="mb-16">
          <div className="inline-block px-3 py-1 border-2 border-zinc-900 dark:border-zinc-100 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
            Module_02 // Resistor_Decoder
          </div>
          <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
            COLOR<br/>CODES.
          </h1>
          
          <button 
            onClick={toggleMode}
            className="mt-4 px-6 py-2 border-2 border-zinc-900 dark:border-zinc-100 font-bold uppercase text-[10px] tracking-widest hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-all cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
          >
            Mode: {isFiveBand ? '5_Band' : '4_Band'}
          </button>
        </header>

        <main>
          {/* Visual Resistor */}
          <div className="bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-100 p-8 sm:p-20 relative mb-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] flex flex-col items-center">
            <div className="relative w-full max-w-sm h-32 flex items-center justify-center mb-16">
              <div className="absolute w-full h-1 bg-zinc-900 dark:bg-zinc-100"></div>
              <div className="relative w-64 h-16 bg-[#e2d1c3] dark:bg-[#c2b2a3] border-2 border-zinc-900 dark:border-zinc-100 rounded-lg flex items-center justify-between px-8 overflow-hidden shadow-sm">
                <div className="flex justify-start gap-4 w-3/4 h-full items-center">
                  <div className={`w-4 h-full ${colors[bands[0]].bg} border-r border-black/10`}></div>
                  <div className={`w-4 h-full ${colors[bands[1]].bg} border-r border-black/10`}></div>
                  {isFiveBand && <div className={`w-4 h-full ${colors[bands[2]].bg} border-r border-black/10 animate-in fade-in zoom-in duration-300`}></div>}
                  <div className={`w-4 h-full ${colors[bands[3]].bg} border-r border-black/10`}></div>
                </div>
                <div className={`w-4 h-full ${colors[bands[4]].bg}`}></div>
              </div>
            </div>

            <div className="text-center">
              <div className="font-mono text-[9px] font-bold uppercase tracking-[0.4em] mb-4 opacity-40">Identified_Value</div>
              <div className="text-6xl sm:text-8xl font-black text-zinc-900 dark:text-white tracking-tighter mb-4">
                {formattedValue}
              </div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-1 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                Tolerance ±{tolerance}%
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {bandLabels.map((label, bandIdx) => (
              <div 
                key={bandIdx} 
                className={`bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-100 p-6 transition-all duration-300 ${!isFiveBand && bandIdx === 2 ? 'opacity-10 pointer-events-none grayscale' : 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]'}`}
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="font-mono text-[9px] font-bold uppercase tracking-widest">{label}</div>
                  <div className={`w-3 h-3 rounded-full ${colors[bands[bandIdx]].bg} border border-black/10`}></div>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {Object.entries(colors).map(([id, color]) => {
                    if (bandIdx < 3 && (id === 'gold' || id === 'silver')) return null;
                    if (bandIdx === 4 && !color.tolerance) return null;
                    if (bandIdx === 3 && color.multiplier === undefined) return null;

                    return (
                      <button
                        key={id}
                        onClick={() => updateBand(bandIdx, id)}
                        className={`w-7 h-7 border border-zinc-900 dark:border-zinc-100 ${color.bg} ${bands[bandIdx] === id ? 'scale-125 z-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]' : 'opacity-30 hover:opacity-100 hover:scale-110'} transition-all cursor-pointer`}
                        title={color.name}
                      ></button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="/" className="inline-block font-black uppercase text-[10px] tracking-widest hover:underline underline-offset-4 decoration-2">
              ← Return_To_Archive
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
