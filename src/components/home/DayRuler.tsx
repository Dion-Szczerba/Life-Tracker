import { cn } from "@/lib/utils";

const HOURS = Array.from({ length: 25 }, (_, hour) => hour);
const LABELS = ["00", "06", "12", "18", "24"];

type DayRulerProps = {
  /** Share of today that has passed, from 0 to 1. */
  progress: number;
};

export function DayRuler({ progress }: DayRulerProps) {
  const percent = `${progress * 100}%`;

  return (
    <div className="flex flex-col gap-[5px]">
      <div
        role="img"
        aria-label={`${Math.round(progress * 100)}% of today has passed`}
        className="relative h-3"
      >
        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-line" />
        <span
          className="absolute bottom-0 left-0 h-0.5 bg-ruler"
          style={{ width: percent }}
        />
        <span className="absolute inset-0 flex items-end justify-between">
          {HOURS.map((hour) => (
            <span
              key={hour}
              className={cn(
                "w-px",
                hour % 6 === 0 ? "h-2.5" : "h-[5px]",
                hour / 24 <= progress ? "bg-ruler/80" : "bg-inactive",
              )}
            />
          ))}
        </span>
        <span
          className="absolute bottom-0 -ml-px h-4 w-0.5 bg-now shadow-glow-tap"
          style={{ left: percent }}
        />
      </div>
      <div
        aria-hidden="true"
        className="flex justify-between text-[11px] leading-none text-muted-foreground"
      >
        {LABELS.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}
