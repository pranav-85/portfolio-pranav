"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, FolderGit2 } from "lucide-react";
import { TypingRole } from "./typing-role";
import { CodeStreamBackground } from "./code-stream-background";

export function Hero() {
  return (
    <section
      id="hero"
      className="
    relative
    flex
    min-h-screen
    flex-col
    items-center
    justify-center
    overflow-hidden
    px-6
    py-24
    text-center
  "
      aria-label="Introduction"
    >
      <CodeStreamBackground intensity={1.5} className="opacity-90 blur-[1px]" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="flex flex-col items-center gap-4 md:gap-6">
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              Sai Pranav
            </h1>
            <div className="relative h-20 w-20 md:h-28 md:w-28">
              <Image
                src="/portfolio-pranav/giyuu-gif.gif"
                alt="Playful avatar illustration"
                fill
                priority
                className="rounded-full object-cover"
              />
            </div>
          </div>

          <TypingRole />
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Designing and deploying AI-powered systems with real-world impact.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="min-w-[160px] transition-opacity hover:opacity-90"
          >
            <Link href="#projects">
              <FolderGit2 className="size-4" aria-hidden />
              View Projects
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="min-w-[160px] transition-opacity hover:opacity-90"
          >
            <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <FileText className="size-4" aria-hidden />
              Resume
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
