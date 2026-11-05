import type { HomeData } from "./types";

// Hard-coded stand-in until PR 3 works these values out from real records.
// It shows Thursday 5 November 2026 at 14:30.
export const SAMPLE_HOME: HomeData = {
  now: new Date(2026, 10, 5, 14, 30),
  weekNumber: 45,
  dayProgress: 870 / 1440,
  minutesLeft: 570,
  streak: 12,
  habitsTotal: 5,
  habitsDoneToday: 3,
  habits: [
    { id: "read", name: "Read 20 pages", run: 8, done: false },
    { id: "water", name: "Drink 2 litres of water", run: 4, done: true },
    { id: "stretch", name: "Stretch for 10 minutes", run: 12, done: false },
  ],
  todos: [
    { id: "rules", name: "Set up branch rules on GitHub", done: false },
    { id: "calendar", name: "Sketch the calendar screen", done: false },
    { id: "dentist", name: "Book a dentist appointment", done: true },
  ],
  week: [
    { date: new Date(2026, 10, 2), habitsDone: 5, status: "past" },
    { date: new Date(2026, 10, 3), habitsDone: 4, status: "past" },
    { date: new Date(2026, 10, 4), habitsDone: 5, status: "past" },
    { date: new Date(2026, 10, 5), habitsDone: 3, status: "today" },
    { date: new Date(2026, 10, 6), habitsDone: 0, status: "future" },
    { date: new Date(2026, 10, 7), habitsDone: 0, status: "future" },
    { date: new Date(2026, 10, 8), habitsDone: 0, status: "future" },
  ],
  weekTotals: {
    habitsDone: 17,
    habitsPossible: 20,
    tasksDone: 10,
    perfectDays: 2,
  },
};
