import { describe, expect, it } from "vitest";
import { habitRun, overallStreak } from "./streak";
import type { DateKey } from "./dates";

const TODAY = "2026-11-09";
const done = (completedOn: DateKey, habitId = "read") => ({
  habitId,
  completedOn,
});
describe("habitRun", () => {
  it("stops counting when a day is missed", () => {
    const completions = [done(TODAY), done("2026-11-08"), done("2026-11-06")];
    expect(habitRun(completions, "read", TODAY)).toBe(2);
  });
  it("ignores other habits", () => {
    expect(habitRun([done(TODAY, "water")], "read", TODAY)).toBe(0);
  });
  it("counts from yesterday when today isn't done yet", () => {
    const completions = [done("2026-11-08"), done("2026-11-07")];
    expect(habitRun(completions, "read", TODAY)).toBe(2);
  });
  it("returns zero if the list is empty", () => {
    expect(habitRun([], "read", "2026-11-09")).toBe(0);
  });
  it("returns 1 when done today only", () => {
    expect(
      habitRun(
        [{ habitId: "read", completedOn: "2026-11-09" }],
        "read",
        "2026-11-09",
      ),
    ).toBe(1);
  });
  it("returns 2 when done today and yesterday", () => {
    expect(
      habitRun(
        [
          { habitId: "read", completedOn: "2026-11-09" },
          { habitId: "read", completedOn: "2026-11-08" },
        ],
        "read",
        "2026-11-09",
      ),
    ).toBe(2);
  });
});

describe("overallStreak", () => {
  it("counts the number of consecutive days all habits were completed", () => {
    const habits = [
      { id: "read", startedOn: "2026-11-01", archivedOn: null },
      { id: "exercise", startedOn: "2026-11-01", archivedOn: null },
    ];
    const completions = [
      { habitId: "read", completedOn: "2026-11-09" },
      { habitId: "exercise", completedOn: "2026-11-09" },
      { habitId: "read", completedOn: "2026-11-08" },
      { habitId: "exercise", completedOn: "2026-11-08" },
      { habitId: "read", completedOn: "2026-11-07" },
      // Missing exercise on 2026-11-07
    ];
    expect(overallStreak(habits, completions, "2026-11-09")).toBe(2);
  });
  it("counts from yesterday when today isn't done yet", () => {
    const habits = [
      { id: "read", startedOn: "2026-11-01", archivedOn: null },
      { id: "exercise", startedOn: "2026-11-01", archivedOn: null },
    ];
    const completions = [
      { habitId: "read", completedOn: "2026-11-08" },
      { habitId: "exercise", completedOn: "2026-11-08" },
    ];
    expect(overallStreak(habits, completions, "2026-11-09")).toBe(1);
  });
  it("returns 0 if there are no habits", () => {
    expect(overallStreak([], [], "2026-11-09")).toBe(0);
  });
  it("a habit started today only counts today", () => {
    const habits = [
      { id: "read", startedOn: TODAY, archivedOn: null },
      { id: "exercise", startedOn: TODAY, archivedOn: null },
    ];
    const completions = [
      { habitId: "read", completedOn: TODAY },
      { habitId: "exercise", completedOn: TODAY },
    ];
    expect(overallStreak(habits, completions, "2026-11-09")).toBe(1);
  });
  it("a habit that was archived yesterday does not count today", () => {
    const habits = [
      { id: "read", startedOn: "2026-11-01", archivedOn: "2026-11-08" },
      { id: "exercise", startedOn: "2026-11-01", archivedOn: null },
    ];
    const completions = [{ habitId: "exercise", completedOn: "2026-11-09" }];
    expect(overallStreak(habits, completions, "2026-11-09")).toBe(1);
  });
});
