import { addDays } from "date-fns";
export type DateKey = string;

export function toDateKey(date: Date): DateKey {
  return (
    date.getFullYear().toString() +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getDate().toString().padStart(2, "0")
  );
}

export function fromDateKey(dateKey: DateKey): Date {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function addDaysToKey(key: DateKey, days: number): DateKey {
  return toDateKey(addDays(fromDateKey(key), days));
}
