import { useId } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./SectionHeader";
import type { HabitItem } from "./types";

type HabitListProps = {
  habits: HabitItem[];
  doneCount: number;
  total: number;
  onToggle?: (id: string) => void;
};

export function HabitList({
  habits,
  doneCount,
  total,
  onToggle,
}: HabitListProps) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-2">
      <SectionHeader
        id={headingId}
        title="Habits left today"
        meta={`${doneCount} of ${total} done`}
      />
      <ul className="flex flex-col gap-1.5">
        {habits.map((habit) => (
          <li
            key={habit.id}
            className={cn(
              "transition-[filter] duration-200",
              habit.done && "drop-shadow-glow-habit",
            )}
          >
            <HabitRow habit={habit} onToggle={() => onToggle?.(habit.id)} />
          </li>
        ))}
      </ul>
    </section>
  );
}

type HabitRowProps = {
  habit: HabitItem;
  onToggle: () => void;
};

function HabitRow({ habit, onToggle }: HabitRowProps) {
  const { name, run, done } = habit;

  return (
    // The outer button is the 1px frame; the inner span is the panel inside it.
    <button
      type="button"
      aria-pressed={done}
      onClick={onToggle}
      className={cn(
        "block w-full p-px text-left transition-colors duration-200 cut-corner hover:brightness-118",
        done ? "bg-habit" : "bg-habit-frame",
      )}
    >
      <span
        className={cn(
          "flex min-h-12 items-center gap-3.5 pr-4 pl-3 transition-colors duration-200 [--cut:13.5px] cut-corner",
          done ? "bg-habit-done" : "bg-panel",
        )}
      >
        <span
          className={cn(
            "flex-none transition-[filter] duration-200",
            done && "drop-shadow-glow-tap",
          )}
        >
          <span
            className={cn(
              "flex size-6 items-center justify-center cut-chip",
              done
                ? "bg-habit"
                : "hatch text-habit/55 inset-ring-[1.5px] inset-ring-habit/75",
            )}
          >
            {done && (
              <Check
                aria-hidden="true"
                className="size-4 text-background"
                strokeWidth={3.4}
              />
            )}
          </span>
        </span>
        <span className="min-w-0 flex-1 text-base leading-tight font-medium">
          {name}
        </span>
        <span
          className={cn(
            "flex flex-none items-baseline gap-1 transition-colors duration-200",
            done ? "text-habit" : "text-muted-foreground",
          )}
        >
          <span className="font-heading text-base font-semibold">{run}</span>
          <span className="text-[13px]">{run === 1 ? "day" : "days"}</span>
        </span>
      </span>
    </button>
  );
}
