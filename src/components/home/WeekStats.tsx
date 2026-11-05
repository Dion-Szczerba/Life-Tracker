import { useId } from "react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./SectionHeader";
import type { WeekDay, WeekTotals } from "./types";

type WeekStatsProps = {
  /** Monday to Sunday. */
  week: WeekDay[];
  habitsTotal: number;
  totals: WeekTotals;
};

export function WeekStats({ week, habitsTotal, totals }: WeekStatsProps) {
  const headingId = useId();
  const first = week[0].date;
  const last = week[week.length - 1].date;
  const range = new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
  }).formatRange(first, last);
  const today = week.find((day) => day.status === "today");
  const todayName = today?.date.toLocaleDateString(undefined, {
    weekday: "long",
  });

  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-3">
      <SectionHeader id={headingId} title="This week" meta={range} />

      <div
        role="img"
        aria-label={`Habits completed each day this week${todayName ? `, up to ${todayName}` : ""}`}
        className="grid grid-cols-7 gap-2.5"
      >
        {week.map((day) => (
          <DayColumn
            key={day.date.getTime()}
            day={day}
            habitsTotal={habitsTotal}
          />
        ))}
      </div>

      <dl className="grid grid-cols-3 gap-3 border-t border-divider pt-3">
        <Stat
          label="Habits done"
          value={`${totals.habitsDone}/${totals.habitsPossible}`}
        />
        <Stat label="Tasks done" value={totals.tasksDone} />
        <Stat label="Perfect days" value={totals.perfectDays} />
      </dl>
    </section>
  );
}

type DayColumnProps = {
  day: WeekDay;
  habitsTotal: number;
};

/** One cell per habit, stacked and filled from the bottom, with the day's letter underneath. */
function DayColumn({ day, habitsTotal }: DayColumnProps) {
  const isToday = day.status === "today";
  // Top cell first, so the lit cells end up at the bottom.
  const cells = Array.from(
    { length: habitsTotal },
    (_, i) => habitsTotal - 1 - i < day.habitsDone,
  );

  return (
    <div className="flex flex-col gap-[7px]">
      <div className="flex flex-col gap-[3px] px-[3px]">
        {cells.map((lit, i) => (
          <span
            key={i}
            className={cn(
              "block h-2 -skew-x-20 transition-[background-color,box-shadow] duration-200",
              day.status === "future" && "border border-line",
              day.status !== "future" && !lit && "bg-cell-off",
              lit && isToday && "bg-week shadow-glow-today",
              lit && !isToday && "bg-week/50",
            )}
          />
        ))}
      </div>
      <span
        className={cn(
          "text-center text-[13px] leading-none",
          isToday ? "font-semibold text-today" : "text-muted-foreground",
        )}
      >
        {day.date.toLocaleDateString(undefined, { weekday: "narrow" })}
      </span>
    </div>
  );
}

type StatProps = {
  label: string;
  value: string | number;
};

function Stat({ label, value }: StatProps) {
  return (
    // dt (the label) comes first for screen readers; flex-col-reverse shows the value on top.
    <div className="flex flex-col-reverse gap-[3px]">
      <dt className="text-[13px] text-muted-foreground">{label}</dt>
      <dd className="font-heading text-[22px] leading-[1.05] font-semibold">
        {value}
      </dd>
    </div>
  );
}
