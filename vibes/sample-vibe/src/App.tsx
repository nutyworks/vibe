function App() {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-50 flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="max-w-2xl w-full text-center">
        <header className="mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter mb-4 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
            Sample Vibe
          </h1>
          <p className="text-slate-400 text-lg sm:text-xl">A fresh start for a new experiment.</p>
        </header>

        <main className="p-6 sm:p-8 bg-slate-900/50 border border-slate-800 rounded-3xl">
          <p className="text-slate-300 text-sm sm:text-base mb-8">
            This vibe is ready for your creative touch.
          </p>
          <a
            href="/"
            className="inline-flex px-6 sm:px-8 py-2.5 sm:py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold rounded-full transition-all text-sm sm:text-base"
          >
            ← Back to Hub
          </a>
        </main>
      </div>
    </div>
  );
}

export default App;
