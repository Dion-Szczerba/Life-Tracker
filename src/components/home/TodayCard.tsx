import { cn } from "@/lib/utils";
import { DateHeading } from "./DateHeading";
import { DayRuler } from "./DayRuler";
import { HudPanel } from "./HudPanel";
import { StreakMeter } from "./StreakMeter";

type TodayCardProps = {
  date: Date;
  dayProgress: number;
  minutesLeft: number;
  streak: number;
  habitsLeft: number;
};

export function TodayCard({
  date,
  dayProgress,
  minutesLeft,
  streak,
  habitsLeft,
}: TodayCardProps) {
  const todayDone = habitsLeft === 0;

  return (
    <HudPanel
      aria-label="Today and streak"
      className="flex flex-col gap-3.5 px-[18px] pt-[18px] pb-4"
    >
      <DateHeading date={date} minutesLeft={minutesLeft} />
      <DayRuler progress={dayProgress} />
      <StreakMeter streak={streak} todayDone={todayDone} />
      <p
        aria-live="polite"
        className={cn(
          "text-[15px] leading-[1.3]",
          todayDone ? "text-streak" : "text-muted-foreground",
        )}
      >
        {todayDone
          ? `All habits done. Your streak is now ${streak} days.`
          : `Finish ${habitsLeft} more habit${habitsLeft === 1 ? "" : "s"} to keep your streak.`}
      </p>
    </HudPanel>
  );
}
