import { Section } from "./section";

export function About() {
  return (
    <Section id="about" title="👋 About Me">
      <div className="max-w-3xl">
        <p className="text-muted-foreground leading-relaxed text-lg">
          I am a Computer Science undergraduate with hands-on experience building AI and software systems through research-driven and practical projects. My interests lie in <strong className="text-foreground">machine learning, retrieval-augmented generation (RAG), and system-level AI applications</strong>.
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed text-lg">
          I enjoy working on end-to-end solutions — from model design and experimentation to backend APIs and deployment — and I thrive in collaborative environments where complex technical problems need to be solved with clarity and precision.
        </p>
      </div>
    </Section>
  );
}
