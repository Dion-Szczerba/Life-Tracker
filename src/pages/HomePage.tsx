import { HabitList } from "@/components/home/HabitList";
import { HomeHeader } from "@/components/home/HomeHeader";
import { SAMPLE_HOME } from "@/components/home/sample-data";
import { TodayCard } from "@/components/home/TodayCard";
import { TodoList } from "@/components/home/TodoList";
import { WeekStats } from "@/components/home/WeekStats";

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
      <HabitList
        habits={data.habits}
        doneCount={data.habitsDoneToday}
        total={data.habitsTotal}
      />
      <TodoList todos={data.todos} />
      <WeekStats
        week={data.week}
        habitsTotal={data.habitsTotal}
        totals={data.weekTotals}
      />
    </div>
  );
}
