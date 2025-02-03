'use client'
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaCode } from 'react-icons/fa';
import Link from 'next/link';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiCss3 } from 'react-icons/si';
import { useTranslation } from '@/context/LanguageContext';

const Footer = () => {
  const { getFooter } = useTranslation();
  const footer = getFooter();

  return (
    <motion.footer 
      className="footer-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <h3>{footer.brand.name}</h3>
            <p>{footer.brand.role}</p>
            <p className="footer-description">
              {footer.brand.description}
            </p>
            <div className="footer-location">
              <FaMapMarkerAlt />
              <span>{footer.brand.location}</span>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="footer-links">
            <h4>{footer.links.title}</h4>
            <nav>
              <Link href="#hero">{footer.links.home}</Link>
              <Link href="#about">{footer.links.about}</Link>
              <Link href="#projects">{footer.links.projects}</Link>
              <Link href="#contact">{footer.links.contact}</Link>
            </nav>
          </div>
          
          {/* Technologies */}
          <div className="footer-tech">
            <h4>{footer.tech.title}</h4>
            <div className="tech-tags">
              <span className="tech-tag"><SiNextdotjs /> Next.js</span>
              <span className="tech-tag"><SiTypescript /> TypeScript</span>
              <span className="tech-tag"><SiTailwindcss /> Tailwind CSS</span>
              <span className="tech-tag"><FaCode /> Framer Motion</span>
              <span className="tech-tag"><SiCss3 /> CSS3</span>
            </div>
          </div>

          {/* Contact */}
          <div className="footer-contact">
            <h4>{footer.contact.title}</h4>
            <a href="mailto:ricardomorim05@gmail.com" className="footer-email">
              <FaEnvelope />
              ricardomorim05@gmail.com
            </a>
            <div className="footer-social">
              <a 
                href="https://github.com/RicardoMorim" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label={footer.social.github}
              >
                <FaGithub />
              </a>
              <a 
                href="https://www.linkedin.com/in/ricardo-morim-208368251/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label={footer.social.linkedin}
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>{footer.copyright}</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;