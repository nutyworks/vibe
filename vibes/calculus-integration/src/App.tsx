import { useState, useEffect, useRef } from 'react';

// Use the global katex instance from the CDN
declare global {
  interface Window {
    katex: any;
  }
}

const problems = [
  { id: 1, question: '\\int x^n dx', answer: '\\frac{x^{n+1}}{n+1} + C', hint: 'Power Rule (n \\neq -1)' },
  { id: 2, question: '\\int \\frac{1}{x} dx', answer: '\\ln|x| + C', hint: 'Logarithmic Rule' },
  { id: 3, question: '\\int e^x dx', answer: 'e^x + C', hint: 'Exponential Rule' },
  { id: 4, question: '\\int a^x dx', answer: '\\frac{a^x}{\\ln(a)} + C', hint: 'General Exponential Rule' },
  { id: 5, question: '\\int \\sin(x) dx', answer: '-\\cos(x) + C', hint: 'Trig Rule' },
  { id: 6, question: '\\int \\cos(x) dx', answer: '\\sin(x) + C', hint: 'Trig Rule' },
  { id: 7, question: '\\int \\sec^2(x) dx', answer: '\\tan(x) + C', hint: 'Trig Rule' },
  { id: 8, question: '\\int \\csc^2(x) dx', answer: '-\\cot(x) + C', hint: 'Trig Rule' },
  { id: 9, question: '\\int \\sec(x)\\tan(x) dx', answer: '\\sec(x) + C', hint: 'Trig Rule' },
  { id: 10, question: '\\int \\csc(x)\\cot(x) dx', answer: '-\\csc(x) + C', hint: 'Trig Rule' },
  { id: 11, question: '\\int \\frac{1}{\\sqrt{1-x^2}} dx', answer: '\\arcsin(x) + C', hint: 'Inverse Trig' },
  { id: 12, question: '\\int \\frac{1}{1+x^2} dx', answer: '\\arctan(x) + C', hint: 'Inverse Trig' },
  { id: 13, question: '\\int tan(x) dx', answer: '\\ln|sec(x)| + C', hint: 'Trig Identity' },
  { id: 14, question: '\\int cot(x) dx', answer: '\\ln|sin(x)| + C', hint: 'Trig Identity' },
  { id: 15, question: '\\int ln(x) dx', answer: 'x ln(x) - x + C', hint: 'Integration by Parts' },
];

const MathText = ({ text, className = "" }: { text: string; className?: string }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const renderMath = () => {
      if (containerRef.current && window.katex) {
        window.katex.render(text, containerRef.current, {
          throwOnError: false,
          displayMode: false
        });
      }
    };

    if (window.katex) {
      renderMath();
    } else {
      const interval = setInterval(() => {
        if (window.katex) {
          renderMath();
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [text]);

  return <span ref={containerRef} className={className} />;
};

function App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const nextProblem = () => {
    setCurrentIdx((prev) => (prev + 1) % problems.length);
    setShowAnswer(false);
    setShowHint(false);
  };

  const problem = problems[currentIdx];

  return (
    <div className="min-h-screen w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col items-center justify-center p-6 sm:p-12 font-sans transition-colors duration-300">
      <div className="max-w-3xl w-full relative z-10">
        <header className="mb-16">
          <div className="inline-block px-3 py-1 border-2 border-zinc-900 dark:border-zinc-100 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
            Module_01 // Calculus_Training
          </div>
          <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
            INFINITE<br/>SUMS.
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg font-medium max-w-md leading-snug tracking-tight">
            Rigorous anti-differentiation training system. Precision required.
          </p>
        </header>

        <main>
          <div className="bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-100 p-8 sm:p-20 relative mb-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]">
            <div className="absolute top-6 right-8 font-mono text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              ID_{String(currentIdx + 1).padStart(2, '0')} // TOTAL_{String(problems.length).padStart(2, '0')}
            </div>

            <div className="flex flex-col items-center justify-center min-h-[180px] mb-12">
              <div className="text-6xl sm:text-8xl text-zinc-900 dark:text-white font-serif italic text-center">
                <MathText text={problem.question} />
              </div>
            </div>

            <div className={`transition-all duration-300 ${showAnswer ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
              <div className="flex flex-col items-center justify-center p-10 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-2 border-zinc-900 dark:border-zinc-100 mb-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]">
                <div className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] mb-6 opacity-50">Verified_Result</div>
                <div className="text-3xl sm:text-5xl font-serif italic text-center">
                  <MathText text={problem.answer} />
                </div>
              </div>
            </div>

            {showHint && !showAnswer && (
              <div className="text-center p-8 border-2 border-dashed border-zinc-300 dark:border-zinc-700 mb-12 animate-in fade-in slide-in-from-top-2 duration-300">
                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-bold uppercase tracking-wide">
                  Logic_Input: {problem.hint}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="h-16 border-2 border-zinc-900 dark:border-zinc-100 font-black uppercase text-xs hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] cursor-pointer"
                >
                  {showHint ? 'Hide_Logic' : 'Show_Logic'}
                </button>
                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className={`h-16 font-black uppercase text-xs transition-all active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] cursor-pointer ${showAnswer ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100' : 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-black dark:hover:bg-white'}`}
                >
                  {showAnswer ? 'Close_Tab' : 'Integrate'}
                </button>
              </div>
              
              <button
                onClick={nextProblem}
                className="h-20 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-black uppercase text-xl border-2 border-zinc-900 dark:border-zinc-100 hover:bg-black dark:hover:bg-white transition-all flex items-center justify-center gap-4 active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)] cursor-pointer group"
              >
                Proceed_Next 
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </button>
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
