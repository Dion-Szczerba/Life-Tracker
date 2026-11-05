import { cn } from "@/lib/utils";

const SEGMENTS = 14;

type StreakMeterProps = {
  streak: number;
  todayDone: boolean;
};

/** The streak number plus the last 14 days as slanted cells; the last cell is today. */
export function StreakMeter({ streak, todayDone }: StreakMeterProps) {
  const daysBeforeToday = todayDone ? streak - 1 : streak;
  const litBeforeToday = Math.min(daysBeforeToday, SEGMENTS - 1);

  return (
    <div className="flex items-center gap-3.5">
      <div className="flex flex-none flex-col gap-0.5">
        <span className="font-heading text-4xl leading-[0.9] font-bold text-streak text-shadow-glow-streak">
          {streak}
        </span>
        <span className="text-[13px] leading-tight text-muted-foreground">
          day streak
        </span>
      </div>
      <div
        role="img"
        aria-label={`${streak} day streak, ${todayDone ? "today included" : "today not done yet"}`}
        className="flex flex-1 gap-1 px-1"
      >
        {Array.from({ length: SEGMENTS }, (_, i) => {
          const isToday = i === SEGMENTS - 1;
          const lit = isToday ? todayDone : i >= SEGMENTS - 1 - litBeforeToday;

          return (
            <span
              key={i}
              className={cn(
                "h-6 flex-1 -skew-x-20 transition-shadow duration-200",
                lit && "shadow-glow-streak",
                !lit && isToday && "border-[1.5px] border-streak",
                !lit && !isToday && "border border-inactive",
              )}
            >
              {lit && (
                <span
                  className="block size-full bg-streak motion-safe:animate-charge"
                  style={{ animationDelay: `${i * 45}ms` }}
                />
              )}
              {!lit && isToday && (
                <span className="block size-full hatch text-streak/50" />
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
