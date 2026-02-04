import { Badge } from "@/components/ui/badge";
import { Section } from "./section";

const CATEGORIES = [
  {
    label: "Programming",
    items: ["Python", "C", "C++", "SQL"],
  },
  {
    label: "Web & Backend",
    items: [
      "FastAPI",
      "Node.js",
      "Express.js",
      "REST APIs",
      "HTML",
      "CSS",
      "JavaScript",
      "MySQL",
      "MongoDB",
    ],
  },
  {
    label: "Machine Learning & AI",
    items: [
      "Scikit-learn",
      "PyTorch",
      "TensorFlow",
      "Transformers (Hugging Face)",
      "LangChain",
      "OpenCV",
    ],
  },
  {
    label: "Tools & Platforms",
    items: ["Git", "Docker", "Azure", "Linux"],
  },
] as const;

export function Skills() {
  return (
    <Section id="skills" title="🧠 Skills">
      <div className="grid gap-6 md:grid-cols-2">
        {CATEGORIES.map((category) => (
          <div key={category.label} className="space-y-3">
            <h3 className="text-m font-semibold text-muted-foreground">
              {category.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="px-3 py-1 text-sm font-medium transition-colors hover:bg-secondary/80"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
