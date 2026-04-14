import { useState, useEffect } from "react";
import DOBInput from "@/components/DOBInput";
import VedicGrid from "@/components/VedicGrid";
import PredictionModal from "@/components/PredictionModal";
import { calculateVedicGrid, VedicResult } from "@/lib/vedic-grid";
import { langData } from "@/lib/lang";

const Index = () => {
  const [result, setResult] = useState<VedicResult | null>(null);
  const [showPrediction, setShowPrediction] = useState(false);
  const [mode, setMode] = useState<"prediction" | "name" | "match">("prediction");

  // ✅ Language with persistence
  const [lang, setLang] = useState<"en" | "hi">(() => {
    return (localStorage.getItem("lang") as "en" | "hi") || "hi";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const handleDOB = (day: number, month: number, year: number) => {
    const res = calculateVedicGrid(day, month, year);
    setResult(res);
    setShowPrediction(true);
  };

  return (
    <div className="min-h-screen bg-[var(--gradient-warm)] flex flex-col items-center justify-center px-4 py-12">

      {/* 🌐 Language Toggle with Flags */}
      <div className="w-full max-w-md flex justify-end mb-4">
        <button
          className="flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow border"
          onClick={() => setLang(lang === "hi" ? "en" : "hi")}
        >
          {lang === "hi" ? (
            <>
              🇬🇧 <span>English</span>
            </>
          ) : (
            <>
              🇮🇳 <span>हिंदी</span>
            </>
          )}
        </button>
      </div>

      {/* 🔘 Mode Switch */}
      <div className="flex gap-3 mb-6 justify-center">
        <button
          className={`px-4 py-2 rounded ${mode === "prediction" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setMode("prediction")}
        >
          {langData[lang].prediction}
        </button>

        <button
          className={`px-4 py-2 rounded ${mode === "name" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setMode("name")}
        >
          {langData[lang].name}
        </button>

        <button
          className={`px-4 py-2 rounded ${mode === "match" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setMode("match")}
        >
          {langData[lang].match}
        </button>
      </div>

      {/* 🔥 Prediction Mode */}
      {mode === "prediction" && (
        <>
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground tracking-wide">
              {langData[lang].title}
            </h1>
            <p className="mt-2 text-muted-foreground font-body text-sm tracking-wide">
              {langData[lang].subtitle}
            </p>
          </div>

          {/* DOB Input */}
          <div className="w-full max-w-md bg-card/60 backdrop-blur-sm rounded-2xl p-6 shadow-[var(--shadow-card)] border border-border mb-8">
            <DOBInput onSubmit={handleDOB} />
          </div>

          {/* Results */}
          {result && (
            <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">

              {/* Info */}
              <div className="flex justify-center gap-4 mb-6">
                <div className="bg-card rounded-full px-5 py-2 border border-border shadow-sm">
                  <span className="text-xs text-muted-foreground font-body">
                    {langData[lang].root}{" "}
                  </span>
                  <span className="font-heading font-bold text-primary text-lg">
                    {result.rootNumber}
                  </span>
                </div>

                <div className="bg-card rounded-full px-5 py-2 border border-border shadow-sm">
                  <span className="text-xs text-muted-foreground font-body">
                    {langData[lang].destiny}{" "}
                  </span>
                  <span className="font-heading font-bold text-accent text-lg">
                    {result.destinyNumber}
                  </span>
                </div>
              </div>

              {/* Grid */}
              <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 shadow-[var(--shadow-card)] border border-border">
                <VedicGrid gridCounts={result.gridCounts} />
              </div>
            </div>
          )}

          {/* Modal */}
          {result && (
            <PredictionModal
              open={showPrediction}
              onOpenChange={setShowPrediction}
              rootNumber={result.rootNumber}
              destinyNumber={result.destinyNumber}
              lang={lang}   // ✅ important
            />
          )}
        </>
      )}

      {/* 🔧 Name Mode */}
      {mode === "name" && (
        <div className="text-center text-lg">
          🚧 {langData[lang].name} Coming Soon
        </div>
      )}

      {/* 🔧 Match Mode */}
      {mode === "match" && (
        <div className="text-center text-lg">
          🚧 {langData[lang].match} Coming Soon
        </div>
      )}

    </div>
  );
};

export default Index;