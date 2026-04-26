import { useState } from "react";
import { isValidCode } from "@/lib/access-code";


const OWNER_WHATSAPP = "919826557089"; 
// ─────────────────────────────────────────
// User sends their name via WhatsApp.
// Admin looks up the code in /admin-panel
// by entering the user's name, then sends
// the code back. User never sees the code.
// ─────────────────────────────────────────

interface Props {
  onAccessGranted: () => void;
}

export default function AccessGate({ onAccessGranted }: Props) {
  // Restore name from sessionStorage so it survives the WhatsApp tab switch
  const [name, setName] = useState(
    () => sessionStorage.getItem("ag_name") ?? "",
  );
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [step, setStep] = useState<"request" | "code">(() =>
    sessionStorage.getItem("ag_name") ? "code" : "request",
  );
  const [shake, setShake] = useState(false);

  const openWhatsApp = () => {
    if (!name.trim()) return;
    sessionStorage.setItem("ag_name", name.trim());
    const approvalLink = `${window.location.origin}/admin-panel?user=${encodeURIComponent(name.trim())}`;
    const text = encodeURIComponent(
      `Hi, I want access to your Vedic Grid app.\nMy name is: ${name.trim()}\n\n👉 Tap to approve me:\n${approvalLink}`,
    );
    window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${text}`, "_blank");
    setStep("code");
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  const submitCode = () => {
    const storedName = sessionStorage.getItem("ag_name") ?? name;
    if (isValidCode(code, storedName)) {
      localStorage.setItem("app_access", "granted");
      sessionStorage.removeItem("ag_name");
      onAccessGranted();
    } else {
      setCodeError(true);
      triggerShake();
      setTimeout(() => setCodeError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo / Branding */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🔮</div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Vedic Grid Insights
          </h1>
          <p className="text-white/50 text-sm mt-1">
            Numerology · Astrology · Destiny
          </p>
        </div>

        {/* Card */}
        <div
          className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl transition-all ${shake ? "animate-shake" : ""}`}
        >
          {/* Lock icon + title */}
          <div className="flex flex-col items-center mb-5">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl mb-3">
              🔐
            </div>
            <h2 className="text-white font-semibold text-lg">
              Access Required
            </h2>
            <p className="text-white/50 text-xs text-center mt-1 leading-relaxed">
              This app requires owner approval.
              <br />
              Request access via WhatsApp.
            </p>
          </div>

          {/* ── STEP 1: Request via WhatsApp ── */}
          {step === "request" && (
            <div className="space-y-3">
              <div>
                <label className="text-white/60 text-xs mb-1 block">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && name.trim() && openWhatsApp()
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-amber-400/60 focus:bg-white/15 transition"
                />
              </div>

              <button
                onClick={openWhatsApp}
                disabled={!name.trim()}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-500 hover:bg-green-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition active:scale-95"
              >
                <span>💬</span> Request Access via WhatsApp
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-1">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-white/30 text-xs">already approved?</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <button
                onClick={() => setStep("code")}
                className="w-full py-2.5 rounded-xl bg-white/8 border border-white/10 text-white/60 hover:text-white hover:bg-white/15 text-sm transition"
              >
                Enter Access Code
              </button>
            </div>
          )}

          {/* ── STEP 2: Enter Code ── */}
          {step === "code" && (
            <div className="space-y-3">
              {/* Waiting state — no code shown to user */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 text-center space-y-1">
                <p className="text-green-300 text-sm font-medium">
                  ✅ Request sent!
                </p>
                <p className="text-white/40 text-xs leading-relaxed">
                  The owner will review your request
                  <br />
                  and send you an access code on WhatsApp.
                </p>
              </div>

              <div>
                <label className="text-white/60 text-xs mb-1 block">
                  Access Code
                </label>
                <input
                  type="text"
                  placeholder="Enter your code"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setCodeError(false);
                  }}
                  onKeyDown={(e) =>
                    e.key === "Enter" && code.trim() && submitCode()
                  }
                  className={`w-full px-4 py-2.5 rounded-xl bg-white/10 border text-white placeholder-white/30 text-sm focus:outline-none transition uppercase tracking-widest ${
                    codeError
                      ? "border-red-400/60 bg-red-500/10 focus:border-red-400"
                      : "border-white/15 focus:border-amber-400/60 focus:bg-white/15"
                  }`}
                />
                {codeError && (
                  <p className="text-red-400 text-xs mt-1">
                    ❌ Incorrect code. Try again.
                  </p>
                )}
              </div>

              <button
                onClick={submitCode}
                disabled={!code.trim()}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-semibold text-sm transition active:scale-95"
              >
                Unlock Access →
              </button>

              <button
                onClick={() => {
                  setStep("request");
                  setCode("");
                  setCodeError(false);
                  sessionStorage.removeItem("ag_name");
                }}
                className="w-full py-2 text-white/40 hover:text-white/60 text-xs transition"
              >
                ← Back to Request
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          Vedic Grid Insights · Private Access
        </p>
      </div>

      {/* Shake keyframe injected inline */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.5s ease-in-out; }
      `}</style>
    </div>
  );
}
