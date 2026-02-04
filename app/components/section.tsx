import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ id, title, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 py-16 md:py-24",
        className
      )}
      aria-labelledby={title ? `${id}-heading` : undefined}
    >
      <div className="mx-auto max-w-5xl px-6">
        {title && (
          <h2
            id={`${id}-heading`}
            className="mb-10 text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
          >
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
