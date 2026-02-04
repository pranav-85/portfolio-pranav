"use client";

import { useCallback } from "react";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function NavLink({ href, children, className, onClick }: NavLinkProps) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const targetId = href.replace(/^#/, "");
      if (!targetId) return;
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        onClick?.();
      }
    },
    [href, onClick]
  );

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
