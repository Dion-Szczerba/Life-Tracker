import { describe, expect, it } from "vitest";
import { fromDateKey, toDateKey } from "./dates";

describe("toDateKey", () => {
  it("uses the local year just after midnight on New Year's Day", () => {
    expect(toDateKey(new Date(2027, 0, 1, 0, 30))).toBe("2027-01-01");
  });
  it("uses the local date when UTC is still the previous day", () => {
    expect(toDateKey(new Date(2026, 5, 5, 5, 30))).toBe("2026-06-05");
  });
});

describe("fromDateKey", () => {
  it("parses a date key into a Date object", () => {
    expect(fromDateKey("2026-11-06")).toEqual(new Date(2026, 10, 6));
  });
});
