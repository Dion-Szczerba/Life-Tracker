type DateHeadingProps = {
  date: Date;
  minutesLeft: number;
};

export function DateHeading({ date, minutesLeft }: DateHeadingProps) {
  const day = String(date.getDate()).padStart(2, "0");
  const weekday = date.toLocaleDateString(undefined, { weekday: "long" });
  const monthYear = date.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  return (
    <h1 className="flex items-center gap-3.5 font-normal">
      <span className="font-heading text-[104px] leading-[0.84] font-bold tracking-[-4px] text-date text-shadow-glow-date">
        {day}
      </span>
      <span className="flex flex-col gap-1">
        <span className="font-heading text-[25px] leading-[1.05] font-semibold">
          {weekday}
        </span>
        <span className="text-base leading-tight text-muted-foreground">
          {monthYear}
        </span>
        <span className="font-heading text-[15px] leading-tight font-medium">
          {formatTimeLeft(minutesLeft)}
        </span>
      </span>
    </h1>
  );
}

function formatTimeLeft(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return hours > 0 ? `${hours} h ${rest} min left` : `${rest} min left`;
}
