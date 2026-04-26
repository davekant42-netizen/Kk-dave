import { useState } from "react";
import { generateUserCode } from "@/lib/access-code";

// ─────────────────────────────────────────────────────────────────────────────
//  ADMIN PANEL — only you (the owner) should know this URL
//  Access it at:  https://your-app.com/admin-panel
// ─────────────────────────────────────────────────────────────────────────────

const ADMIN_PIN = "kkdave123"; // change this to your own PIN

export default function AdminPanel() {
  // Auto-read user's name from URL: /admin-panel?user=Rahul
  const urlParams = new URLSearchParams(window.location.search);
  const userFromUrl = urlParams.get("user") ?? "";

  const [pin, setPin]           = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [copied, setCopied]     = useState(false);

  // Auto-generate code as soon as we have a name (from URL or typed)
  const userName    = userFromUrl.trim();
  const approveCode = userName ? generateUserCode(userName) : null;

  const checkPin = () => {
    if (pin === ADMIN_PIN) {
      setUnlocked(true);
    } else {
      setPinError(true);
      setTimeout(() => setPinError(false), 1500);
    }
  };

  const copyCode = () => {
    if (!approveCode) return;
    navigator.clipboard.writeText(approveCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] flex items-center justify-center px-4">
      <div className="w-full max-w-xs">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🛡️</div>
          <h1 className="text-3xl font-bold text-white">Admin</h1>
          <p className="text-white/40 text-sm mt-1">Vedic Grid Insights</p>
        </div>

        {!unlocked ? (
          /* ── PIN Gate ── large, simple ── */
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-7 shadow-2xl space-y-4">
            <p className="text-white text-lg text-center font-medium">Enter your PIN</p>
            <input
              type="password"
              inputMode="numeric"
              placeholder="• • • • • •"
              value={pin}
              autoFocus
              onChange={(e) => { setPin(e.target.value); setPinError(false); }}
              onKeyDown={(e) => e.key === "Enter" && checkPin()}
              className={`w-full px-5 py-4 rounded-2xl bg-white/10 border text-white text-2xl text-center tracking-[0.5em] focus:outline-none transition ${
                pinError
                  ? "border-red-400 bg-red-500/10"
                  : "border-white/20 focus:border-amber-400"
              }`}
            />
            {pinError && (
              <p className="text-red-400 text-base text-center font-medium">❌ Wrong PIN</p>
            )}
            <button
              onClick={checkPin}
              disabled={!pin.trim()}
              className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-black text-xl font-bold transition active:scale-95"
            >
              Open →
            </button>
          </div>

        ) : approveCode ? (
          /* ── APPROVAL SCREEN — shown when user name is in URL ── */
          <div className="space-y-4">

            {/* Who is requesting */}
            <div className="bg-white/5 border border-white/10 rounded-3xl px-6 py-5 text-center">
              <p className="text-white/50 text-sm mb-1">Access request from</p>
              <p className="text-white text-3xl font-bold">{userName}</p>
            </div>

            {/* The code — big and clear */}
            <div className="bg-amber-500/10 border-2 border-amber-500/40 rounded-3xl px-6 py-6 text-center">
              <p className="text-amber-400 text-sm mb-3">Send this code to {userName}</p>
              <p className="text-white font-mono font-black text-4xl tracking-[0.3em] mb-1">
                {approveCode}
              </p>
              <p className="text-white/30 text-xs mt-2">Expires at midnight</p>
            </div>

            {/* One big copy button */}
            <button
              onClick={copyCode}
              className={`w-full py-5 rounded-2xl text-xl font-bold transition active:scale-95 ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-amber-500 hover:bg-amber-400 text-black"
              }`}
            >
              {copied ? "✅ Copied! Paste in WhatsApp" : "📋 Copy Code"}
            </button>

            {copied && (
              <p className="text-white/50 text-sm text-center leading-relaxed">
                Now go to WhatsApp and reply to {userName} with the copied code.
              </p>
            )}

            <button
              onClick={() => { setUnlocked(false); setPin(""); }}
              className="w-full py-3 text-white/30 hover:text-white/50 text-sm transition"
            >
              Lock Panel
            </button>
          </div>

        ) : (
          /* ── NO USER IN URL — manual fallback ── */
          <div className="space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl px-5 py-4 text-blue-200 text-sm text-center leading-relaxed">
              No user link found.<br />
              The approval link from WhatsApp should open this page automatically.
            </div>
            <button
              onClick={() => { setUnlocked(false); setPin(""); }}
              className="w-full py-4 rounded-2xl bg-white/10 text-white text-base font-medium transition hover:bg-white/20"
            >
              ← Go Back
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

