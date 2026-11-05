type HomeHeaderProps = {
  weekNumber: number;
};

export function HomeHeader({ weekNumber }: HomeHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <span className="flex items-center gap-[9px]">
        <span aria-hidden="true" className="flex gap-[3px]">
          <span className="h-4 w-[5px] -skew-x-22 bg-date" />
          <span className="h-4 w-[5px] -skew-x-22 bg-date-offset" />
        </span>
        <span className="font-heading text-base font-semibold tracking-[0.2px]">
          Life Tracker
        </span>
      </span>
      <span className="font-heading text-sm font-medium text-muted-foreground">
        Week {weekNumber}
      </span>
    </header>
  );
}
