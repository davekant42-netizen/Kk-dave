import { Link } from "react-router-dom";

interface ComingSoonProps {
  title: string;
  description: string;
  lang: "en" | "hi";
}

/**
 * Shared placeholder shown for features that are scaffolded but not built yet.
 * Keeps a consistent look so future feature pages can drop straight in
 * by replacing the body of their corresponding page file.
 */
const ComingSoon = ({ title, description, lang }: ComingSoonProps) => {
  const back = lang === "hi" ? "← वापस जाएं" : "← Back to Home";
  const tag  = lang === "hi" ? "जल्द आ रहा है" : "Coming Soon";

  return (
    <div className="min-h-screen relative overflow-hidden text-white" style={{ background: "#070914" }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-amber-500/15 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-purple-600/15 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <main className="relative z-10 max-w-md mx-auto px-5 sm:px-8 pt-16 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-300/30 text-amber-200 text-xs font-semibold tracking-[0.2em] uppercase mb-6">
          ✨ {tag}
        </div>

        <h1 className="text-[40px] sm:text-[52px] leading-[1.05] font-bold tracking-tight text-white mb-4">
          {title}
        </h1>

        <p className="text-base text-white/70 leading-relaxed mb-10 max-w-sm mx-auto">
          {description}
        </p>

        <div className="relative mx-auto mb-10 w-full max-w-xs">
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-amber-400/30 via-transparent to-purple-500/30 opacity-60 blur-sm" />
          <div className="relative rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 p-8 backdrop-blur-2xl">
            <div className="text-6xl mb-3 opacity-80">🔮</div>
            <p className="text-sm text-white/60">
              {lang === "hi"
                ? "हम इस सुविधा पर काम कर रहे हैं"
                : "We are working on this feature"}
            </p>
          </div>
        </div>

        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-full bg-white text-black font-semibold text-sm tracking-wide hover:bg-amber-100 transition shadow-lg shadow-white/10"
        >
          {back}
        </Link>
      </main>
    </div>
  );
};

export default ComingSoon;
