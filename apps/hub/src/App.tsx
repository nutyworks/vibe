function App() {
  const vibes = [
    { 
      name: 'Calculus Integration', 
      path: '/calculus-integration/', 
      description: 'Practice anti-differentiation with interactive problems.' 
    },
    { 
      name: 'Sample Vibe', 
      path: '/sample-vibe/', 
      description: 'A starter template for new experiments.' 
    },
  ];

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-50 flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="max-w-2xl w-full">
        <header className="mb-8 sm:mb-12 text-center">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Vibe Hub
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
            <span className="text-cyan-500/80 text-xs font-mono uppercase tracking-widest">Live Archive</span>
          </div>
          <p className="text-slate-400 text-lg sm:text-xl">The center of all experimental vibes.</p>
        </header>

        <main className="grid gap-3 sm:gap-4">
          {vibes.map((vibe) => (
            <a
              key={vibe.path}
              href={vibe.path}
              className="group p-5 sm:p-6 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-cyan-500/50 hover:bg-slate-900 transition-all duration-300 flex items-center justify-between"
            >
              <div>
                <h2 className="text-xl sm:text-2xl font-bold group-hover:text-cyan-400 transition-colors">
                  {vibe.name}
                </h2>
                <p className="text-slate-500 text-sm sm:text-base mb-1">{vibe.description}</p>
                <p className="text-slate-600 text-xs font-mono">vibe.nuty.works{vibe.path}</p>
              </div>
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-all shrink-0">
                →
              </div>
            </a>
          ))}
        </main>
      </div>
    </div>
  );
}

export default App;
