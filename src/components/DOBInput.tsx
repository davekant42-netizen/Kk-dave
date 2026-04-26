import { useState } from "react";

interface DOBInputProps {
  onSubmit: (name: string, day: number, month: number, year: number) => void;
  lang: "en" | "hi";
}

const labels = {
  en: { name: "Your Name", dob: "Date of Birth", placeholder: "Enter your name", submit: "Reveal My Grid" },
  hi: { name: "आपका नाम", dob: "जन्म तिथि", placeholder: "नाम लिखें", submit: "मेरा ग्रिड दिखाएं" },
};

const DOBInput = ({ onSubmit, lang }: DOBInputProps) => {
  const [name, setName]   = useState("");
  const [day, setDay]     = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear]   = useState("");

  const t = labels[lang];

  const valid =
    name.trim().length >= 2 &&
    +day >= 1 && +day <= 31 &&
    +month >= 1 && +month <= 12 &&
    +year >= 1000 && +year <= 9999;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (valid) onSubmit(name.trim(), +day, +month, +year);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Name */}
      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-[0.2em] text-amber-300 font-semibold">
          {t.name}
        </label>
        <input
          type="text"
          autoComplete="off"
          placeholder={t.placeholder}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-4 rounded-xl bg-white/[0.08] border-2 border-white/20 text-white text-lg placeholder-white/50 focus:outline-none focus:border-amber-400 focus:bg-white/[0.12] transition"
        />
      </div>

      {/* DOB row */}
      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-[0.2em] text-amber-300 font-semibold">
          {t.dob}
        </label>
        <div className="flex gap-2 items-center">
          <input
            type="number" min={1} max={31} placeholder="DD"
            value={day} onChange={(e) => setDay(e.target.value)}
            className="flex-1 min-w-0 px-2 py-4 rounded-xl bg-white/[0.08] border-2 border-white/20 text-white text-center text-xl font-bold placeholder-white/50 focus:outline-none focus:border-amber-400 focus:bg-white/[0.12] transition"
          />
          <span className="text-white/40 font-light text-xl">/</span>
          <input
            type="number" min={1} max={12} placeholder="MM"
            value={month} onChange={(e) => setMonth(e.target.value)}
            className="flex-1 min-w-0 px-2 py-4 rounded-xl bg-white/[0.08] border-2 border-white/20 text-white text-center text-xl font-bold placeholder-white/50 focus:outline-none focus:border-amber-400 focus:bg-white/[0.12] transition"
          />
          <span className="text-white/40 font-light text-xl">/</span>
          <input
            type="number" min={1000} max={9999} placeholder="YYYY"
            value={year} onChange={(e) => setYear(e.target.value)}
            className="flex-[1.4] min-w-0 px-2 py-4 rounded-xl bg-white/[0.08] border-2 border-white/20 text-white text-center text-xl font-bold placeholder-white/50 focus:outline-none focus:border-amber-400 focus:bg-white/[0.12] transition"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!valid}
        className="group relative w-full mt-2 py-5 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-[length:200%_100%] hover:bg-[position:100%_0] disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold text-lg tracking-wide transition-all duration-700 active:scale-[0.98] shadow-xl shadow-amber-500/30"
      >
        {t.submit}
        <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
      </button>
    </form>
  );
};

export default DOBInput;
