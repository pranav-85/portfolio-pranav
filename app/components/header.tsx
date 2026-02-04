"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "./nav-link";
import { useActiveSection } from "@/hooks/use-active-section";

const SECTIONS = [
  { href: "#about", label: "About", id: "about" },
  { href: "#skills", label: "Skills", id: "skills" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#contact", label: "Contact", id: "contact" },
] as const;

export function Header() {
  const activeSection = useActiveSection(SECTIONS.map((s) => s.id));
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <header
      className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
      role="banner"
    >
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <NavLink
          href="#hero"
          onClick={handleClose}
          className="
            inline-flex items-center justify-center
            h-8 px-2 rounded-md
            font-mono text-base font-semibold
            transition-transform hover:scale-105
          "
        >
          <span className="flex items-center gap-0.5 text-lg">
            <span className="text-accent">&lt;</span>
            SP
            <span className="text-accent">/&gt;</span>
          </span>
        </NavLink>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-6 lg:flex">
          {SECTIONS.map(({ href, label }) => {
            const isActive = activeSection === href;

            return (
              <li key={href}>
                <NavLink
                  href={href}
                  className="
                    relative text-base transition-colors
                    text-muted-foreground hover:text-foreground
                  "
                >
                  {label}

                  {/* Underline */}
                  <span
                    className={`
                      absolute -bottom-1 left-0 h-[2px] w-full
                      bg-accent
                      transition-transform duration-300
                      origin-left
                      ${isActive ? "scale-x-100" : "scale-x-0"}
                    `}
                  />
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Mobile / tablet menu button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-border p-1.5 text-muted-foreground hover:text-foreground lg:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mobile / tablet nav list */}
      {isOpen && (
        <div className="border-t border-border bg-background/95 lg:hidden">
          <ul className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-3">
            {SECTIONS.map(({ href, label }) => {
              const isActive = activeSection === href;

              return (
                <li key={href}>
                  <NavLink
                    href={href}
                    onClick={handleClose}
                    className={`block py-1.5 text-sm transition-colors ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
