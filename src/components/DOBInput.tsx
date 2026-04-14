import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DOBInputProps {
  onSubmit: (day: number, month: number, year: number) => void;
}

const DOBInput = ({ onSubmit }: DOBInputProps) => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const d = parseInt(day), m = parseInt(month), y = parseInt(year);
    if (d >= 1 && d <= 31 && m >= 1 && m <= 12 && y >= 1000 && y <= 9999) {
      onSubmit(d, m, y);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <div className="flex gap-3 items-center">
        <div className="flex flex-col items-center gap-1">
          <label className="text-xs text-muted-foreground font-body uppercase tracking-wider">Din</label>
          <Input
            type="number"
            min={1} max={31}
            placeholder="DD"
            value={day}
            onChange={e => setDay(e.target.value)}
            className="w-20 text-center text-lg font-heading bg-card border-border focus:ring-primary"
          />
        </div>
        <span className="text-2xl text-muted-foreground mt-5">·</span>
        <div className="flex flex-col items-center gap-1">
          <label className="text-xs text-muted-foreground font-body uppercase tracking-wider">Mahina</label>
          <Input
            type="number"
            min={1} max={12}
            placeholder="MM"
            value={month}
            onChange={e => setMonth(e.target.value)}
            className="w-20 text-center text-lg font-heading bg-card border-border focus:ring-primary"
          />
        </div>
        <span className="text-2xl text-muted-foreground mt-5">·</span>
        <div className="flex flex-col items-center gap-1">
          <label className="text-xs text-muted-foreground font-body uppercase tracking-wider">Saal</label>
          <Input
            type="number"
            min={1000} max={9999}
            placeholder="YYYY"
            value={year}
            onChange={e => setYear(e.target.value)}
            className="w-24 text-center text-lg font-heading bg-card border-border focus:ring-primary"
          />
        </div>
      </div>
      <Button
        type="submit"
        className="px-8 py-2 font-heading tracking-wide bg-gradient-to-r from-primary to-saffron text-primary-foreground hover:opacity-90 transition-opacity"
      >
        Grid Dekhein
      </Button>
    </form>
  );
};

export default DOBInput;
