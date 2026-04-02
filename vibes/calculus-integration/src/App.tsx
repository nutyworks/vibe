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
    <div className="min-h-screen w-full bg-slate-950 text-slate-50 flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="max-w-xl w-full">
        <header className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-2 bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
            Calculus Integration
          </h1>
          <p className="text-slate-400 text-lg">Master the art of anti-differentiation.</p>
        </header>

        <main className="relative">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 text-slate-700 font-mono text-sm">
              {currentIdx + 1} / {problems.length}
            </div>
            
            <div className="flex flex-col items-center justify-center min-h-[160px] mb-8">
              <span className="text-slate-500 text-sm font-mono mb-2 uppercase tracking-widest">Problem</span>
              <h2 className="text-5xl sm:text-6xl font-serif italic text-white drop-shadow-sm">
                {problem.question}
              </h2>
            </div>

            <div className={`transition-all duration-500 transform ${showAnswer ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
              <div className="flex flex-col items-center justify-center p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl mb-8">
                <span className="text-emerald-500 text-xs font-mono mb-1 uppercase tracking-widest">Answer</span>
                <p className="text-3xl font-serif italic text-emerald-400">{problem.answer}</p>
              </div>
            </div>

            {showHint && !showAnswer && (
              <div className="text-center p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl mb-8 animate-in fade-in slide-in-from-bottom-2">
                <p className="text-amber-400 text-sm italic">{problem.hint}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowHint(!showHint)}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-2xl transition-all"
              >
                {showHint ? 'Hide Hint' : 'Hint'}
              </button>
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className={`px-6 py-3 font-bold rounded-2xl transition-all ${showAnswer ? 'bg-emerald-500 text-white' : 'bg-cyan-600 hover:bg-cyan-500 text-white'}`}
              >
                {showAnswer ? 'Done' : 'Show Answer'}
              </button>
              <button
                onClick={nextProblem}
                className="col-span-2 mt-2 px-6 py-4 bg-slate-100 hover:bg-white text-slate-900 font-black rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                Next Problem <span>→</span>
              </button>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <a href="/" className="text-slate-500 hover:text-slate-300 transition-colors text-sm font-medium">
              ← Back to Vibe Hub
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
