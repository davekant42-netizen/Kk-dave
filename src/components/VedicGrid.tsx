import { VEDIC_GRID } from "@/lib/vedic-grid";

interface VedicGridProps {
  gridCounts: Record<number, number>;
}

const VedicGrid = ({ gridCounts }: VedicGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
      {VEDIC_GRID.flat().map((num, idx) => {
        const count = gridCounts[num] || 0;
        const isActive = count > 0;
        const display = isActive ? Array(count).fill(num).join(", ") : num;

        return (
          <div
            key={idx}
            className={`
              relative aspect-square flex items-center justify-center rounded-lg
              text-xl font-heading font-bold transition-all duration-500
              ${isActive
                ? "bg-primary text-primary-foreground shadow-[var(--shadow-gold)] scale-105 ring-2 ring-gold-light/50"
                : "bg-grid-inactive text-grid-inactive-foreground"
              }
            `}
          >
            {isActive && (
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-gold-light/20 to-transparent pointer-events-none" />
            )}
            <span className="relative z-10">{display}</span>
          </div>
        );
      })}
    </div>
  );
};

export default VedicGrid;
