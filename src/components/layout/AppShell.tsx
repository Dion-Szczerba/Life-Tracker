import type { ReactNode } from "react";
import { Background } from "./Background";
import { TabBar } from "./TabBar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative isolate min-h-dvh">
      <Background />
      <main className="pt-[calc(env(safe-area-inset-top)+1.5rem)] pr-[max(1.25rem,env(safe-area-inset-right))] pb-[calc(env(safe-area-inset-bottom)+6rem)] pl-[max(1.25rem,env(safe-area-inset-left))]">
        {children}
      </main>
      <TabBar active="Home" />
    </div>
  );
}
