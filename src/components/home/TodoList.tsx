import { useId } from "react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./SectionHeader";
import type { TodoItem } from "./types";

type TodoListProps = {
  todos: TodoItem[];
  onToggle?: (id: string) => void;
};

export function TodoList({ todos, onToggle }: TodoListProps) {
  const headingId = useId();
  const openCount = todos.filter((todo) => !todo.done).length;

  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-1">
      <SectionHeader
        id={headingId}
        title="To-do"
        meta={openCount === 0 ? "All clear" : `${openCount} open`}
      />
      <ul className="flex flex-col">
        {todos.map((todo) => (
          <li key={todo.id}>
            <button
              type="button"
              aria-pressed={todo.done}
              onClick={() => onToggle?.(todo.id)}
              className="flex min-h-[46px] w-full items-center gap-[15px] border-b border-divider text-left text-base font-medium hover:brightness-118"
            >
              {/* A square turned 45°: an outline when open, filled and glowing when done */}
              <span
                aria-hidden="true"
                className={cn(
                  "mx-1 size-4 flex-none rotate-45 transition-[background-color,box-shadow] duration-200",
                  todo.done
                    ? "bg-todo shadow-glow-tap"
                    : "border-[1.5px] border-todo",
                )}
              />
              <span
                className={cn(
                  "min-w-0 leading-tight transition-colors duration-200",
                  todo.done &&
                    "text-muted-foreground line-through decoration-todo/80",
                )}
              >
                {todo.name}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
