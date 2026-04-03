import { useState } from 'react';

const problems = [
  { id: 1, question: '∫ x² dx', answer: 'x³/3 + C', hint: 'Power Rule: ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C' },
  { id: 2, question: '∫ sin(x) dx', answer: '-cos(x) + C', hint: 'Basic Trig: d/dx(cos(x)) = -sin(x)' },
  { id: 3, question: '∫ eˣ dx', answer: 'eˣ + C', hint: 'The easiest one!' },
  { id: 4, question: '∫ 1/x dx', answer: 'ln|x| + C', hint: 'Logarithmic Rule' },
  { id: 5, question: '∫ cos(x) dx', answer: 'sin(x) + C', hint: 'Basic Trig' },
];

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
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col items-center justify-center p-4 sm:p-8 font-sans">
      {/* Decorative Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      <div className="fixed inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-2xl w-full relative z-10">
        <header className="mb-12 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
            Module 01 • Integral Calculus
          </div>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-4 leading-tight">
            Infinite Sums.
          </h1>
          <p className="text-slate-500 text-lg max-w-md mx-auto">
            Practice anti-differentiation with elegance and precision.
          </p>
        </header>

        <main>
          <div className="relative group">
            {/* Background Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            <div className="relative bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 sm:p-16 overflow-hidden">
              <div className="absolute top-8 right-8 text-xs font-mono text-slate-800 tracking-tighter">
                SEQ_0{currentIdx + 1} // TOTAL_0{problems.length}
              </div>

              <div className="flex flex-col items-center justify-center min-h-[120px] mb-12">
                <h2 className="text-6xl sm:text-7xl font-serif italic text-white tracking-tight">
                  {problem.question}
                </h2>
              </div>

              <div className={`transition-all duration-700 ease-out transform ${showAnswer ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}`}>
                <div className="flex flex-col items-center justify-center p-8 bg-white/[0.02] border border-white/10 rounded-3xl mb-12">
                  <div className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.3em] mb-3">Result</div>
                  <p className="text-3xl sm:text-4xl font-serif italic text-emerald-400 tracking-wide">{problem.answer}</p>
                </div>
              </div>

              {showHint && !showAnswer && (
                <div className="text-center p-5 bg-amber-500/5 border border-amber-500/10 rounded-2xl mb-12 animate-in fade-in zoom-in-95 duration-500">
                  <p className="text-amber-500/80 text-sm leading-relaxed tracking-wide">
                    <span className="font-bold uppercase text-[10px] mr-2">Hint:</span>
                    {problem.hint}
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="h-14 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all border border-white/5 active:scale-95"
                  >
                    {showHint ? 'Hide Logic' : 'Show Logic'}
                  </button>
                  <button
                    onClick={() => setShowAnswer(!showAnswer)}
                    className={`h-14 font-bold rounded-2xl transition-all active:scale-95 ${showAnswer ? 'bg-emerald-500 text-black' : 'bg-white text-black hover:bg-slate-200'}`}
                  >
                    {showAnswer ? 'Dismiss' : 'Integrate'}
                  </button>
                </div>
                
                <button
                  onClick={nextProblem}
                  className="h-16 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-3 border border-white/5 active:scale-95 group/next"
                >
                  Proceed to Next 
                  <svg className="w-5 h-5 group-hover/next:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
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
