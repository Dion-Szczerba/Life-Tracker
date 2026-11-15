import { addDaysToKey, type DateKey } from "./dates";
import type { Habit, HabitCompletion } from "./records";

export function habitRun(
  completions: Pick<HabitCompletion, "habitId" | "completedOn">[],
  habitId: string,
  today: DateKey,
): number {
  const doneDays = new Set(
    completions.filter((c) => c.habitId === habitId).map((c) => c.completedOn),
  );
  let day = doneDays.has(today) ? today : addDaysToKey(today, -1);
  let count = 0;
  while (doneDays.has(day)) {
    count++;
    day = addDaysToKey(day, -1);
  }
  return count;
}

export function overallStreak(
  habits: Pick<Habit, "id" | "startedOn" | "archivedOn">[],
  completions: Pick<HabitCompletion, "habitId" | "completedOn">[],
  today: DateKey,
): number {
  let day = isDayComplete(today, habits, completions)
    ? today
    : addDaysToKey(today, -1);
  let count = 0;
  while (isDayComplete(day, habits, completions)) {
    count++;
    day = addDaysToKey(day, -1);
  }
  return count;
}

function isDayComplete(
  day: DateKey,
  habits: Pick<Habit, "id" | "startedOn" | "archivedOn">[],
  completions: Pick<HabitCompletion, "habitId" | "completedOn">[],
): boolean {
  let activeHabits = 0;
  for (const habit of habits) {
    if (
      habit.startedOn <= day &&
      (habit.archivedOn === null || habit.archivedOn > day)
    ) {
      if (
        !completions.some(
          (c) => c.habitId === habit.id && c.completedOn === day,
        )
      ) {
        return false;
      }
      activeHabits++;
    }
  }
  return activeHabits > 0;
}
