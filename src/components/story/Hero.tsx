"use client";
import { useCallback, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useTranslation } from "@/context/LanguageContext";
import RoleTicker from "./RoleTicker";
import { setShielded } from "./stage/store";
import useHeroIntro from "./useHeroIntro";

const SOCIAL_ICONS: Record<string, ReactNode> = { github: <FaGithub />, linkedin: <FaLinkedin /> };
const SOCIAL_LABELS: Record<string, string> = { github: "GitHub", linkedin: "LinkedIn" };

export default function Hero() {
  const { getHero, getStory, getFooter } = useTranslation();
  const hero = getHero();
  const story = getStory();
  const [first, ...rest] = getFooter().brand.name.split(" ");
  const [role, setRole] = useState(0);
  const [pinned, setPinned] = useState<boolean | null>(null);
  const handleRole = useCallback((index: number) => setRole(index), []);
  const { intro, skipIntro } = useHeroIntro();

  // The second role is the security one: the scene and the tagline follow it, or the cursor.
  const shielded = pinned ?? role === 1;
  useEffect(() => setShielded(shielded), [shielded]);

  return (
    <section id="hero" className="hero" data-scene="0" data-intro={intro} onFocus={skipIntro}>
      <div className="shell hero-inner">
        <div className="hero-lead">
          <p className="kicker" data-rise style={{ "--i": 0 } as CSSProperties}>
            <span className="kicker-dot" /> {story.heroKicker}
          </p>

          <h1 className="hero-name">
            <span data-rise style={{ "--i": 1 } as CSSProperties}>{first}</span>{" "}
            <span data-rise style={{ "--i": 2 } as CSSProperties}>{rest.join(" ")}</span>
          </h1>

          <p className="hero-tagline" data-rise style={{ "--i": 3 } as CSSProperties}>
            <span
              className={shielded ? "" : "is-lit"}
              onPointerEnter={() => setPinned(false)}
              onPointerLeave={() => setPinned(null)}
            >
              {story.tagline}
            </span>{" "}
            <em
              className={shielded ? "is-lit" : ""}
              onPointerEnter={() => setPinned(true)}
              onPointerLeave={() => setPinned(null)}
            >
              {story.taglineAccent}
            </em>
          </p>
        </div>

        <div className="hero-rest">
          <div className="hero-meta">
            <RoleTicker roles={hero.skills} onRole={handleRole} />
            <p className="hero-summary">{hero.summary}</p>
          </div>

          <div className="hero-actions">
            <a href="#career" className="btn btn-primary">
              {story.readStory} <span aria-hidden="true">↓</span>
            </a>
            <a href={`/${hero.resume_url}`} download className="btn btn-ghost">
              {hero.resumeButton} <span aria-hidden="true">↗</span>
            </a>
            <div className="hero-socials">
              {hero.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-link"
                  aria-label={SOCIAL_LABELS[social.platform] ?? social.platform}
                >
                  {SOCIAL_ICONS[social.platform]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-cue" aria-hidden="true">
        <span>{story.scrollCue}</span>
        <span className="scroll-cue-line" />
      </div>
    </section>
  );
}
