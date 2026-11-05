type SectionHeaderProps = {
  /** Id for the heading, so the section can point to it with aria-labelledby. */
  id: string;
  title: string;
  meta: string;
};

export function SectionHeader({ id, title, meta }: SectionHeaderProps) {
  return (
    <div className="flex items-baseline justify-between">
      <h2
        id={id}
        className="font-heading text-[19px] leading-[1.3] font-semibold text-balance"
      >
        {title}
      </h2>
      <span className="text-sm text-muted-foreground">{meta}</span>
    </div>
  );
}
