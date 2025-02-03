import { motion } from "framer-motion";
import SocialIcon from "./SocialIcon";

interface HeroLinksProps {
  resumeButton: string;
  resumeurl: string;
  socials: Array<{
    platform: string;
    url: string;
  }>;
}

const HeroLinks = ({ resumeButton, resumeurl, socials }: HeroLinksProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-6 mt-12 hero-socials"
    >
      <motion.a
        href={`/${resumeurl}`}
        download="Resume.pdf"
        className="resume-button"
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        <span>{resumeButton}</span>
      </motion.a>

      <div className="flex gap-4 social-links">
        {socials?.map((social, index) => (
          <motion.a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <SocialIcon platform={social.platform} />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default HeroLinks;
