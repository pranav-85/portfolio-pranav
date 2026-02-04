import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github } from "lucide-react";
import { Section } from "./section";

const PROJECTS = [
  {
    title: "Ingest AI - Document QA Chatbot",
    description:
      "A scalable retrieval-augmented generation (RAG) system that enables semantic search and contextual Q&A across multiple document formats.",
    tech: ["Python", "Pytorch", "Transformers", "Vector DB", "FastAPI", "Docker"],
    github: "https://github.com/pranav-85/ingestAI",
  },
  {
    title: "AI-Based Intrusion Detection System",
    description:
      "A deep learning–based intrusion detection system for identifying botnet traffic.",
    tech: ["Python", "PyTorch", "FastAPI", "Docker", "Network Security"],
    github: "https://github.com/pranav-85/ids_botnet",
  },
  {
    title: "Appointment Scheduler Service",
    description:
      "A backend service that automates appointment scheduling from text or image inputs.",
    tech: ["Node.js", "Express.js", "Docker", "Azure", "OCR", "Postman"],
    github: "https://github.com/pranav-85/scheduling_assistant",
  },
] as const;

export function Projects() {
  return (
    <Section id="projects" title="🚀 Projects">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <Card
            key={project.title}
            className="flex flex-col transition-colors hover:border-muted-foreground/30"
          >
            <CardHeader className="flex flex-col gap-1">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg">{project.title}</CardTitle>
                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Github className="size-5 mt-2" aria-hidden />
                  </Link>
                )}
              </div>
              <CardDescription className="mt-1 text-sm text-muted-foreground">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1" />
            <CardFooter className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <Badge key={t} variant="outline" className="text-xs">
                  {t}
                </Badge>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
  );
}
