import { describe, expect, it } from "vitest";
import { toDateKey } from "./dates";

describe("toDateKey", () => {
  it("uses the local date, not UTC", () => {
    expect(toDateKey(new Date(2027, 0o0, 0o1, 0, 30))).toBe("2027-01-01");
    expect(toDateKey(new Date(2026, 0o5, 0o5, 5, 30))).toBe("2026-06-05");
  });
});
