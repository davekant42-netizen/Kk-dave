import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DOBInput from "@/components/DOBInput";
import VedicGrid from "@/components/VedicGrid";
import PredictionModal from "@/components/PredictionModal";
import { calculateVedicGrid, VedicResult } from "@/lib/vedic-grid";
import { langData } from "@/lib/lang";
import { numberToPlanet } from "@/lib/planets";

const Index = () => {
  const [result, setResult]   = useState<VedicResult | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [showPrediction, setShowPrediction] = useState(false);
  const [mode, setMode] = useState<"prediction" | "name" | "match">("prediction");
  const [count, setCount] = useState<number>(0);

  const [lang, setLang] = useState<"en" | "hi">(() => {
    return (localStorage.getItem("lang") as "en" | "hi") || "hi";
  });

  useEffect(() => { localStorage.setItem("lang", lang); }, [lang]);

  // 🔢 Fake counter
  useEffect(() => {
    const startDateKey = "app_start_date";
    const baseCountKey = "base_count";
    const startDate = localStorage.getItem(startDateKey);
    const baseCount = localStorage.getItem(baseCountKey);

    if (!startDate) {
      localStorage.setItem(startDateKey, new Date().toISOString());
      const initial = Math.floor(Math.random() * 10) + 5;
      localStorage.setItem(baseCountKey, String(initial));
      setCount(initial);
      return;
    }

    const diffTime   = new Date().getTime() - new Date(startDate).getTime();
    const daysPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    let growth = 0;
    if (daysPassed <= 2)      growth = daysPassed * 2;
    else if (daysPassed <= 7) growth = 4 + (daysPassed - 2) * 3;
    else                      growth = 20 + (daysPassed - 7) * 5;

    setCount(Number(baseCount) + growth);
  }, []);

  const handleDOB = (name: string, day: number, month: number, year: number) => {
    setUserName(name);
    setResult(calculateVedicGrid(day, month, year));
    // smooth scroll to results
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const greeting = lang === "hi" ? "नमस्ते" : "Hello";

  return (
    <div className="min-h-screen relative overflow-hidden text-white" style={{ background: "#070914" }}>

      {/* ── Ambient background ─────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top-left amber glow */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-amber-500/15 blur-[120px]" />
        {/* Bottom-right purple glow */}
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-purple-600/15 blur-[120px]" />
        {/* Center subtle glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-orange-500/[0.06] blur-[100px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* ── Top Bar ────────────────────────────────────────────────── */}
      <header className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-lg shadow-lg shadow-amber-500/20">
            🔮
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] uppercase tracking-[0.2em] text-amber-300/60">Vedic</span>
            <span className="text-sm font-semibold text-white">Grid Insights</span>
          </div>
        </div>

        <button
          onClick={() => setLang(lang === "hi" ? "en" : "hi")}
          className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 backdrop-blur text-xs font-medium transition"
        >
          <span className="text-amber-300/70">⏿</span>
          <span>{lang === "hi" ? "English" : "हिंदी"}</span>
        </button>
      </header>

      {/* ── Main ───────────────────────────────────────────────────── */}
      <main className="relative z-10 max-w-md mx-auto px-5 sm:px-8 pt-10 pb-16">

        {/* Mode pills */}
        <div className="flex gap-2 mb-10 justify-center">
          {([
            { key: "prediction", to: null },
            { key: "name",       to: "/name-correction" },
            { key: "match",      to: "/match-making" },
          ] as const).map(({ key, to }) => {
            const active = mode === key;
            const baseCls =
              "px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition border-2 inline-block";
            const activeCls =
              "bg-white text-black border-white shadow-lg shadow-white/20";
            const inactiveCls =
              "bg-white/10 text-white border-white/20 hover:bg-white/20";

            if (to) {
              return (
                <Link
                  key={key}
                  to={to}
                  className={`${baseCls} ${inactiveCls}`}
                >
                  {langData[lang][key]}
                </Link>
              );
            }
            return (
              <button
                key={key}
                onClick={() => setMode(key)}
                className={`${baseCls} ${active ? activeCls : inactiveCls}`}
              >
                {langData[lang][key]}
              </button>
            );
          })}
        </div>

        {/* Prediction Mode */}
        {mode === "prediction" && (
          <>
            {/* Hero */}
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-300 mb-3 font-semibold">
                {lang === "hi" ? "आपकी अंक यात्रा" : "Your Numerology"}
              </p>
              <h1 className="text-[44px] sm:text-[56px] leading-[1.05] font-bold tracking-tight text-white">
                {langData[lang].title}
              </h1>
              <p className="text-base text-white/75 mt-4 max-w-sm mx-auto leading-relaxed">
                {langData[lang].subtitle}
              </p>
            </div>

            {/* Input card */}
            <div className="relative">
              {/* glow ring */}
              <div className="absolute -inset-px rounded-[26px] bg-gradient-to-br from-amber-400/30 via-transparent to-purple-500/30 opacity-60 blur-sm" />
              <div className="relative rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-2xl border border-white/10 p-6 sm:p-7 shadow-2xl">
                <DOBInput onSubmit={handleDOB} lang={lang} />
              </div>
            </div>

            {/* Results */}
            {result && (
              <div id="results" className="mt-12 space-y-6 animate-[fadeUp_0.6s_ease-out]">

                {/* Personalized greeting */}
                <div className="text-center">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-amber-300/70 mb-1.5">
                    {greeting}
                  </p>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-300 via-orange-300 to-amber-300 bg-clip-text text-transparent">
                    {userName}
                  </h2>
                  <p className="text-xs text-white/40 mt-2">
                    {lang === "hi"
                      ? "यह रहा आपका वैदिक विश्लेषण"
                      : "Here is your Vedic analysis"}
                  </p>
                </div>

                {/* Numbers */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Root */}
                  <div className="group relative rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 p-5 text-center overflow-hidden hover:border-amber-400/30 transition">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/10 opacity-0 group-hover:opacity-100 transition" />
                    <p className="relative text-[10px] uppercase tracking-[0.2em] text-amber-300/70 mb-2">
                      {langData[lang].root}
                    </p>
                    <p className="relative text-5xl font-bold leading-none mb-2 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                      {result.rootNumber}
                    </p>
                    <p className="relative text-xs text-white/60">
                      {numberToPlanet[result.rootNumber][lang].emoji}{" "}
                      {numberToPlanet[result.rootNumber][lang].name}
                    </p>
                  </div>

                  {/* Destiny */}
                  <div className="group relative rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 p-5 text-center overflow-hidden hover:border-purple-400/30 transition">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/10 opacity-0 group-hover:opacity-100 transition" />
                    <p className="relative text-[10px] uppercase tracking-[0.2em] text-purple-300/70 mb-2">
                      {langData[lang].destiny}
                    </p>
                    <p className="relative text-5xl font-bold leading-none mb-2 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                      {result.destinyNumber}
                    </p>
                    <p className="relative text-xs text-white/60">
                      {numberToPlanet[result.destinyNumber][lang].emoji}{" "}
                      {numberToPlanet[result.destinyNumber][lang].name}
                    </p>
                  </div>
                </div>

                {/* Grid */}
                <div className="rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 p-5">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-amber-300/70 text-center mb-4">
                    {lang === "hi" ? "वैदिक ग्रिड" : "Vedic Grid"}
                  </p>
                  <VedicGrid gridCounts={result.gridCounts} />
                </div>

                {/* Predict button */}
                <button
                  onClick={() => setShowPrediction(true)}
                  className="group relative w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 bg-[length:200%_100%] hover:bg-[position:100%_0] text-white font-bold tracking-wide transition-all duration-700 shadow-xl shadow-purple-500/20 active:scale-[0.99]"
                >
                  <span className="text-base">
                    🔮 {lang === "hi" ? `${userName} की भविष्यवाणी` : `Reveal ${userName}'s Future`}
                  </span>
                </button>
              </div>
            )}

            {/* Modal */}
            {result && (
              <PredictionModal
                open={showPrediction}
                onOpenChange={setShowPrediction}
                rootNumber={result.rootNumber}
                destinyNumber={result.destinyNumber}
                lang={lang}
              />
            )}
          </>
        )}

        {/* Other modes placeholder */}
        {mode !== "prediction" && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <div className="text-4xl mb-3 opacity-40">✨</div>
            <p className="text-white/60 text-sm">
              {lang === "hi" ? "जल्द आ रहा है" : "Coming Soon"}
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 pb-8 text-center">
        <p className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-white/70">
          <span className="text-amber-400 text-base">🔥</span>
          {lang === "hi" ? `${count} लोगों ने उपयोग किया` : `Trusted by ${count} users`}
        </p>
      </footer>

      {/* Floating Call Button — speak directly to admin */}
      <a
        href="tel:+918839855243"
        aria-label={lang === "hi" ? "एडमिन को कॉल करें" : "Call admin"}
        className="group fixed bottom-6 right-6 z-40 flex items-center gap-2.5 pl-4 pr-5 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold text-sm shadow-2xl shadow-emerald-500/40 hover:shadow-emerald-500/60 hover:scale-[1.03] active:scale-[0.97] transition-all"
      >
        {/* pulse ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping opacity-60" aria-hidden />
        {/* Icon badge */}
        <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white text-emerald-600 shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
            aria-hidden
          >
            <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.05-.24 11.36 11.36 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.58 1 1 0 0 1-.24 1.05l-2.21 2.16Z" />
          </svg>
        </span>
        <span className="relative whitespace-nowrap text-base">
          {lang === "hi" ? "कॉल करें" : "Call Us"}
        </span>
      </a>

      {/* Animations */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Index;
