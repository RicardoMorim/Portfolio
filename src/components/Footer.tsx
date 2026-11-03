'use client'
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useTranslation } from '@/context/LanguageContext';

const Footer = () => {
  const { getFooter, getStory } = useTranslation();
  const footer = getFooter();

  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div>
          <p className="footer-name">{footer.brand.name}</p>
          <p className="footer-role">{footer.brand.role} · {footer.brand.location}</p>
        </div>
        <div className="footer-links">
          <a href="mailto:ricardomorim05@gmail.com" className="text-link">ricardomorim05@gmail.com</a>
          <a href="https://github.com/RicardoMorim" target="_blank" rel="noopener noreferrer" className="icon-link" aria-label={footer.social.github}>
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/ricardo-morim-208368251/" target="_blank" rel="noopener noreferrer" className="icon-link" aria-label={footer.social.linkedin}>
            <FaLinkedin />
          </a>
          <Link href="#hero" className="text-link">{getStory().backToTop} ↑</Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <p>{footer.copyright}</p>
        <p>Next.js · Three.js · Framer Motion</p>
      </div>
    </footer>
  );
};

export default Footer;
