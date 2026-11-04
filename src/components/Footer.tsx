'use client'
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useTranslation } from '@/context/LanguageContext';
import { CONTACT_EMAIL, localePath } from '@/content/site';

const Footer = () => {
  const { getFooter, getStory, locale } = useTranslation();
  const footer = getFooter();

  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div>
          <p className="footer-name">{footer.brand.name}</p>
          <p className="footer-role">{footer.brand.role} · {footer.brand.location}</p>
        </div>
        <div className="footer-links">
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-link">{CONTACT_EMAIL}</a>
          <a href="https://github.com/RicardoMorim" target="_blank" rel="noopener noreferrer" className="icon-link" aria-label={footer.social.github}>
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/ricardo-morim-208368251/" target="_blank" rel="noopener noreferrer" className="icon-link" aria-label={footer.social.linkedin}>
            <FaLinkedin />
          </a>
          <Link href={localePath(locale)} className="text-link">{getStory().backToTop} ↑</Link>
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
