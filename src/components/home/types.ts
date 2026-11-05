// Everything the home screen shows, already worked out. The components only
// display these values; calculating them from the stored records is PR 3.

export type HabitItem = {
  id: string;
  name: string;
  /** Days in a row this habit has been done, including today if done. */
  run: number;
  done: boolean;
};

export type TodoItem = {
  id: string;
  name: string;
  done: boolean;
};

export type WeekDay = {
  date: Date;
  habitsDone: number;
  status: "past" | "today" | "future";
};

export type WeekTotals = {
  habitsDone: number;
  /** Habits that could have been done so far this week, up to today. */
  habitsPossible: number;
  tasksDone: number;
  /** Days on which every habit was done. */
  perfectDays: number;
};

export type HomeData = {
  now: Date;
  /** ISO 8601 week number. */
  weekNumber: number;
  /** Share of today that has passed, from 0 to 1. */
  dayProgress: number;
  minutesLeft: number;
  /** Days in a row with every habit done, including today once it is complete. */
  streak: number;
  habitsTotal: number;
  habitsDoneToday: number;
  habits: HabitItem[];
  todos: TodoItem[];
  /** Monday to Sunday of the current week. */
  week: WeekDay[];
  weekTotals: WeekTotals;
};
