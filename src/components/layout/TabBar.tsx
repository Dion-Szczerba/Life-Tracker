import type { LucideIcon } from "lucide-react";
import {
  Calendar,
  ChartNoAxesColumn,
  House,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = {
  label: string;
  icon: LucideIcon;
};

const TABS: Tab[] = [
  { label: "Home", icon: House },
  { label: "Calendar", icon: Calendar },
  { label: "Stats", icon: ChartNoAxesColumn },
  { label: "Settings", icon: SlidersHorizontal },
];

type TabBarProps = {
  active: string;
};

export function TabBar({ active }: TabBarProps) {
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 border-t border-line bg-nav pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md"
    >
      <ul className="grid grid-cols-4 gap-1 px-3 pt-2">
        {TABS.map(({ label, icon: Icon }) => {
          const isActive = label === active;
          return (
            <li key={label}>
              <button
                type="button"
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative flex min-h-11 w-full flex-col items-center justify-center gap-0.5 text-[11px]",
                  isActive
                    ? "bg-nav-active/10 font-semibold text-nav-active"
                    : "font-medium text-muted-foreground hover:text-foreground",
                )}
              >
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute -top-[9px] h-[3px] w-7 bg-nav-active shadow-glow-tap"
                  />
                )}
                <Icon aria-hidden="true" className="size-6" strokeWidth={1.8} />
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
