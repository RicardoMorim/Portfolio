"use client";
import { useEffect, useState } from "react";

interface RoleTickerProps {
  roles: string[];
  /** Fires when a new role starts typing, so the hero scene can follow the words. */
  onRole?: (index: number) => void;
}

const TYPE_MS = 70;
const HOLD_MS = 3000;

/** Typewriter for the hero roles; isolated so its ticks never re-render the rest of the page. */
export default function RoleTicker({ roles, onRole }: RoleTickerProps) {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const role = roles[index % roles.length] ?? "";

  useEffect(() => onRole?.(index), [index, onRole]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLength(role.length);
      return;
    }
    const done = !deleting && length === role.length;
    const delay = done ? HOLD_MS : deleting ? TYPE_MS / 2 : TYPE_MS;
    const timer = window.setTimeout(() => {
      if (done) {
        setDeleting(true);
      } else if (deleting && length === 0) {
        setDeleting(false);
        setIndex((value) => (value + 1) % roles.length);
      } else {
        setLength((value) => value + (deleting ? -1 : 1));
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [deleting, length, role, roles.length]);

  return (
    <span className="role-ticker">
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden="true">
        {role.slice(0, length)}
        <span className="role-caret" />
      </span>
    </span>
  );
}
