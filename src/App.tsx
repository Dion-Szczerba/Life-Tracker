import { AppShell } from "@/components/layout/AppShell";

function App() {
  return (
    <AppShell>
      <h1 className="font-heading text-4xl text-date">Life Tracker</h1>
      <div className="mt-6 flex flex-col gap-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="h-32 border border-line bg-panel backdrop-blur-sm"
          />
        ))}
      </div>
    </AppShell>
  );
}

export default App;
