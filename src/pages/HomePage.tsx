import { HomeHeader } from "@/components/home/HomeHeader";
import { SAMPLE_HOME } from "@/components/home/sample-data";
import { TodayCard } from "@/components/home/TodayCard";

export function HomePage() {
  const data = SAMPLE_HOME;

  return (
    <div className="flex flex-col gap-[18px]">
      <HomeHeader weekNumber={data.weekNumber} />
      <TodayCard
        date={data.now}
        dayProgress={data.dayProgress}
        minutesLeft={data.minutesLeft}
        streak={data.streak}
        habitsLeft={data.habitsTotal - data.habitsDoneToday}
      />
    </div>
  );
}
