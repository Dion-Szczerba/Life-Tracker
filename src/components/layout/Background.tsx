export function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 bg-(image:--theme-bg-gradient)" />
      <div className="absolute -top-[170px] -left-[150px] size-[480px] bg-(image:--theme-glow-a)" />
      <div className="absolute top-[330px] -right-[190px] size-[500px] bg-(image:--theme-glow-b)" />
      <div className="absolute inset-0 bg-(image:--theme-streaks)" />
      <div className="absolute inset-x-0 bottom-0 h-[460px] bg-(image:--theme-grid) [mask-image:linear-gradient(to_bottom,transparent,black_75%)] bg-[length:26px_26px]" />
      <div className="absolute inset-0 bg-(image:--theme-scanlines)" />
    </div>
  );
}
