import type { DateKey } from "./dates";

export type Habit = {
  id: string;
  name: string;
  createdAt: Date;
  startedOn: DateKey;
  updatedAt: Date;
  archivedOn: DateKey | null;
};
export type HabitCompletion = {
  habitId: string;
  completedOn: DateKey;
  createdAt: Date;
};
export type Todo = {
  id: string;
  completedOn: DateKey | null;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};
