import type { IconType } from "react-icons";
import { FaAws, FaBrain, FaBug, FaCodePullRequest, FaJava, FaRobot, FaShieldHalved, FaShieldVirus } from "react-icons/fa6";
import { SiDocker, SiFastapi, SiPytorch, SiPython, SiReact, SiSpringboot, SiTerraform, SiTypescript } from "react-icons/si";

/** The skills worth a spotlight, keyed by their English name in the translations. */
export const SKILL_ICONS: Record<string, IconType> = {
  Python: SiPython,
  PyTorch: SiPytorch,
  FastAPI: SiFastapi,
  "Agentic Workflows": FaRobot,
  "LLM Integration": FaBrain,
  "AI Security": FaShieldHalved,
  "AI PR Review": FaCodePullRequest,
  "Vulnerability Management": FaShieldVirus,
  DAST: FaBug,
  React: SiReact,
  TypeScript: SiTypescript,
  Java: FaJava,
  "Spring Boot": SiSpringboot,
  AWS: FaAws,
  Terraform: SiTerraform,
  Docker: SiDocker,
};
