import { Section } from "./section";

const EXPERIENCE = [
  {
    title: "Tata Consultancy Services Research — Pune",
    role: "Project Intern, Media & Entertainment Team",
    period: "May 2025 – July 2025",
  },
];

const EDUCATION = [
  {
    institute: "Indian Institute of Information Technology Design and Manufacturing, Kancheepuram",
    degree: "B.Tech in Computer Science Engineering",
    period: "2022 – 2026",
    extra: "CGPA: 8.16 / 10",
  },
  {
    institute: "Narayana Junior College, Hyderabad",
    degree: "Class 11 & 12",
    period: "2020 – 2022",
    extra: "Marks: 967 / 1000",
  },
  {
    institute: "Panineeya Mahavidyalaya Public School, Hyderabad",
    degree: "Class 10",
    period: "2019 – 2020",
    extra: "Marks: 461 / 500",
  },

];

function TimelineItem({
  title,
  subtitle,
  meta,
  timeline,
}: {
  title: string;
  subtitle: string;
  meta: string;
  timeline: string;
}) {
  return (
    <li className="relative pl-12">
      {/* Dot */}
      <span
        className="
          absolute left-[2px] top-2
          h-4 w-4
          rounded-full
          bg-accent
        "
      />

      <div className="text-sm">
        <div className="flex justify-between">
          <h3 className="font-medium text-lg text-foreground">
            {title}
          </h3>
          <p className="size-md">
            <i>{timeline}</i>
          </p>
        </div>
        <p className="text-muted-foreground">
          {subtitle}
        </p>
        <p className="text-muted-foreground">
          {meta}
        </p>
      </div>
    </li>
  );
}

export function Experience() {
  return (
    <>
      {/* ================= EXPERIENCE ================= */}
      <Section id="experience" title="🏢 Experience">
        <div className="relative">
          {/* Bold vertical line */}
          <div className="absolute left-[9px] top-0 h-full w-[2px] bg-accent/80" />

          <ul className="space-y-12">
            {EXPERIENCE.map((item) => (
              <TimelineItem
                key={item.title}
                title={item.title}
                subtitle={item.role}
                meta=""
                timeline={item.period}
              />
            ))}
          </ul>
        </div>
      </Section>

      {/* ================= EDUCATION ================= */}
      <Section id="education" title="🎓 Education">
        <div className="relative">
          {/* Bold vertical line */}
          <div className="absolute left-[9px] top-0 h-full w-[2px] bg-accent/80" />

          <ul className="space-y-12">
            {EDUCATION.map((item) => (
              <TimelineItem
                key={item.institute}
                title={item.institute}
                subtitle={item.degree}
                meta={item.extra}
                timeline={item.period}
              />
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
