import Link from "next/link";
import { Section } from "./section";
import { Mail, Github, Linkedin } from "lucide-react";

const LINKS = [
  { href: "mailto:msaipranav2004@gmail.com", label: "Email", icon: Mail },
  { href: "https://github.com/pranav-85", label: "GitHub", icon: Github },
  { href: "https://www.linkedin.com/in/sai-pranav-m-3340a0251/", label: "LinkedIn", icon: Linkedin },
] as const;

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <div className="flex flex-wrap items-center gap-6">
        {LINKS.map(({ href, label, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={label}
          >
            <Icon className="size-5" aria-hidden />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
