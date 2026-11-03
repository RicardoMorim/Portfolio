"use client";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import RecommendationsSection from "@/components/RecommendationsSection";
import { useTranslation } from "@/context/LanguageContext";
import SceneLayer from "./story/SceneLayer";
import Hero from "./story/Hero";
import StoryChapters from "./story/StoryChapters";
import ProjectsReel from "./story/ProjectsReel";
import Education from "./story/Education";

/**
 * The page reads as one story: who Ricardo is now, the chapters that led here, the work,
 * the toolkit, what others say, the foundations, and an open invitation to talk.
 * A single fixed 3D core morphs between scenes as each `[data-scene]` anchor scrolls past.
 */
export default function ClientPage() {
  const { getSkills, getContact } = useTranslation();

  return (
    <>
      <SceneLayer />
      <main className="story-main">
        <Hero />
        <StoryChapters />
        <ProjectsReel />
        <SkillsSection {...getSkills()} />
        <RecommendationsSection />
        <Education />
        <ContactSection {...getContact()} />
      </main>
    </>
  );
}
