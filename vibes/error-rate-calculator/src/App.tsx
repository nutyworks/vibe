import { useState, useMemo } from 'react';

function App() {
  const [theory, setTheory] = useState<string>('');
  const [measured, setMeasured] = useState<string>('');

  const result = useMemo(() => {
    const t = parseFloat(theory);
    const m = parseFloat(measured);

    if (isNaN(t) || isNaN(m) || t === 0) return null;

    const error = Math.abs(t - m) / Math.abs(t);
    return {
      decimal: error.toFixed(6),
      percentage: (error * 100).toFixed(4),
    };
  }, [theory, measured]);

  return (
    <div className="min-h-screen w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col items-center justify-center p-6 sm:p-12 font-sans transition-colors duration-300">
      <div className="max-w-3xl w-full relative z-10">
        <header className="mb-16">
          <div className="inline-block px-3 py-1 border-2 border-zinc-900 dark:border-zinc-100 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
            Module_03 // Error_Analysis
          </div>
          <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
            ERROR<br/>RATE.
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg font-medium max-w-md leading-snug tracking-tight">
            Calculate the relative deviation between theoretical and measured values.
          </p>
        </header>

        <main>
          <div className="bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-100 p-8 sm:p-20 relative mb-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-16">
              <div className="space-y-4">
                <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  Theoretical_Value
                </label>
                <input
                  type="number"
                  value={theory}
                  onChange={(e) => setTheory(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-transparent border-b-2 border-zinc-200 dark:border-zinc-800 focus:border-zinc-900 dark:focus:border-zinc-100 py-4 text-4xl font-black outline-none transition-colors"
                />
              </div>
              <div className="space-y-4">
                <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  Measured_Value
                </label>
                <input
                  type="number"
                  value={measured}
                  onChange={(e) => setMeasured(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-transparent border-b-2 border-zinc-200 dark:border-zinc-800 focus:border-zinc-900 dark:focus:border-zinc-100 py-4 text-4xl font-black outline-none transition-colors"
                />
              </div>
            </div>

            <div className="text-center">
              <div className="font-mono text-[9px] font-bold uppercase tracking-[0.4em] mb-6 opacity-40">Relative_Deviation</div>
              <div className="text-6xl sm:text-8xl font-black text-zinc-900 dark:text-white tracking-tighter mb-6">
                {result ? `${result.percentage}%` : '---%'}
              </div>
              {result && (
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-1 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                  Coefficient: {result.decimal}
                </div>
              )}
            </div>
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
