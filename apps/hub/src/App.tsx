function App() {
  const vibes = [
    { 
      name: 'Calculus Integration', 
      path: '/calculus-integration/', 
      description: 'The definitive practice module for mastering anti-differentiation.',
      tag: 'Academic'
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#020617] text-slate-100 flex flex-col items-center justify-center p-4 sm:p-8 selection:bg-cyan-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-3xl w-full relative z-10">
        <header className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 mb-6 group cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-cyan-500/80 text-[10px] font-mono uppercase tracking-[0.2em]">Deployment Active</span>
          </div>

          <h1 className="text-6xl sm:text-8xl font-black tracking-tighter mb-4 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
            Vibe Hub
          </h1>
          <p className="text-slate-400 text-xl font-light tracking-wide max-w-lg mx-auto leading-relaxed">
            A curated archive of experimental web experiences and interactive modules.
          </p>
        </header>

        <main className="space-y-6">
          <div className="text-xs font-mono text-slate-600 uppercase tracking-widest mb-4 ml-2">Available Modules</div>
          
          {vibes.map((vibe) => (
            <a
              key={vibe.path}
              href={vibe.path}
              className="group relative block p-8 bg-slate-900/40 border border-white/5 rounded-[2rem] hover:border-cyan-500/30 hover:bg-slate-900/60 transition-all duration-500 overflow-hidden"
            >
              {/* Card Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative flex items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-wider">
                      {vibe.tag}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {vibe.name}
                    </h2>
                  </div>
                  <p className="text-slate-500 text-lg leading-snug max-w-md">
                    {vibe.description}
                  </p>
                </div>
                
                <div className="h-14 w-14 rounded-2xl bg-slate-800/50 border border-white/5 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:border-cyan-500/40 group-hover:text-cyan-400 transition-all duration-500 transform group-hover:scale-110">
                  <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>

              <div className="absolute bottom-4 left-8 text-[10px] font-mono text-slate-700 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                vibe.nuty.works{vibe.path}
              </div>
            </a>
          ))}
        </main>

        <footer className="mt-20 text-center">
          <p className="text-slate-600 text-sm font-mono tracking-tighter">
            Build v1.0.4 • © 2026 NutyWorks
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
