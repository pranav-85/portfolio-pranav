"use client";

import { useEffect, useRef, useState } from "react";

const ROLES = ["Software Developer", "AI/ML Engineer"] as const;

const TYPE_DELAY = 80;
const DELETE_DELAY = 70;
const HOLD_AFTER_TYPE = 1800;
const HOLD_BETWEEN_ROLES = 500;

export function TypingRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const role = ROLES[roleIndex];

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Typing
    if (!deleting && text.length < role.length) {
      timeoutRef.current = setTimeout(() => {
        setText(role.slice(0, text.length + 1));
      }, TYPE_DELAY);
      return;
    }

    // Pause after typing
    if (!deleting && text.length === role.length) {
      timeoutRef.current = setTimeout(() => {
        setDeleting(true);
      }, HOLD_AFTER_TYPE);
      return;
    }

    // Deleting
    if (deleting && text.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setText((t) => t.slice(0, -1));
      }, DELETE_DELAY);
      return;
    }

    // Switch role
    if (deleting && text.length === 0) {
      timeoutRef.current = setTimeout(() => {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % ROLES.length);
      }, HOLD_BETWEEN_ROLES);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, deleting, role, roleIndex]);

  return (
    <>
      {/* Screen reader friendly text */}
      <p className="sr-only" aria-live="polite">
        {role}
      </p>

      {/* Visual typing text */}
      <p className="mt-4 text-lg text-muted-foreground sm:text-2xl">
        <span>{text}</span>
        <span
          className={`ml-0.5 inline-block h-[1em] w-0.5 bg-muted-foreground align-baseline ${
            !deleting ? "animate-pulse" : ""
          }`}
          aria-hidden
        />
      </p>
    </>
  );
}
