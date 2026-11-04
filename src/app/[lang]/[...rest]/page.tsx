import { notFound } from "next/navigation";

/** Anything the locale rewrite sends here has no page of its own. */
export default function CatchAll() {
  notFound();
}
