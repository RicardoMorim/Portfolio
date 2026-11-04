import Link from "next/link";

export default function NotFound() {
  return (
    <main className="project-page">
      <div className="shell">
        <p className="kicker"><span className="kicker-dot" /> 404</p>
        <h1 className="section-title">Page not found</h1>
        <p className="section-lead"><Link href="/" className="text-link">ricardomorim.com</Link></p>
      </div>
    </main>
  );
}
