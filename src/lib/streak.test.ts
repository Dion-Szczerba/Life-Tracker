import { describe, expect, it } from "vitest";
import { habitRun } from "./streak";
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
  it("return zero if the list is empty", () => {
    expect(habitRun([], "read", "2026-11-09")).toBe(0);
  });
  it("return 1 when done today only", () => {
    expect(
      habitRun(
        [{ habitId: "read", completedOn: "2026-11-09" }],
        "read",
        "2026-11-09",
      ),
    ).toBe(1);
  });
  it("return 2 when done today and yesterday", () => {
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
  it("stops counting when a day is missed", () => {
    expect(
      habitRun(
        [
          { habitId: "read", completedOn: "2026-11-09" },
          { habitId: "read", completedOn: "2026-11-08" },
          { habitId: "read", completedOn: "2026-11-06" },
        ],
        "read",
        "2026-11-09",
      ),
    ).toBe(2);
  });
});
