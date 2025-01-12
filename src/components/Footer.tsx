'use client'
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaCode } from 'react-icons/fa';
import Link from 'next/link';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiCss3 } from 'react-icons/si';

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
            <h3>Ricardo Morim</h3>
            <p>Software Developer</p>
            <p className="footer-description">
              Building digital experiences with passion and precision.
            </p>
            <div className="footer-location">
              <FaMapMarkerAlt />
              <span>Porto, Portugal</span>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <nav>
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>
          
          {/* Technologies */}
		<div className="footer-tech">
		  <h4>Technologies Used</h4>
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
            <h4>Get in Touch</h4>
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
              >
                <FaGithub />
              </a>
              <a 
                href="https://www.linkedin.com/in/ricardo-morim-208368251/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Ricardo Morim. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;