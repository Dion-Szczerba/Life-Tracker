import { addDaysToKey, type DateKey } from "./dates";
import type { HabitCompletion } from "./records";

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
