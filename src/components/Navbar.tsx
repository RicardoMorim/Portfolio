'use client'
import Link from 'next/link';
import { useContext, useState, useEffect, useRef, memo } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMenu, IoClose } from "react-icons/io5";
import { useTranslation } from '@/context/LanguageContext';

interface NavbarProps {
  title?: string;
}

const ThemeSwitch = memo(({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) => (
  <div className="theme-switch-wrapper">
    <button
      onClick={toggleTheme}
      className="theme-switch"
      aria-label="Toggle theme"
    >
      <div className={`switch-track ${theme === 'dark' ? 'dark' : ''}`}>
        <div className="switch-thumb">
          <span className="switch-icon">
            {theme === 'light' ? '☀️' : '🌙'}
          </span>
        </div>
      </div>
    </button>
  </div>
));

ThemeSwitch.displayName = 'ThemeSwitch';

const LanguageSwitch = memo(({ locale, setLocale }: { locale: string; setLocale: (locale: string) => void }) => (
  <div className="language-switch-wrapper">
    <button
      onClick={() => setLocale(locale === 'en' ? 'pt' : 'en')}
      className="language-switch"
    >
      {locale === 'en' ? '🇵🇹' : '🇬🇧'}
    </button>
  </div>
));

LanguageSwitch.displayName = 'LanguageSwitch';

const Navbar: React.FC<NavbarProps> = () => {
	const { theme, toggleTheme } = useContext(ThemeContext);
	const { locale, setLocale, t } = useTranslation();
	const [scrolled, setScrolled] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const drawerRef = useRef<HTMLDivElement>(null);
  
	const navLinks = [
	  { href: '#hero', label: t('nav.home') },
	  { href: '#about', label: t('nav.about') },
	  { href: '#projects', label: t('nav.projects') },
	  { href: '#contact', label: t('nav.contact') }
	];
	
	const title = t('title')
	
	useEffect(() => {
		const handleScroll = () => {
		setScrolled(window.scrollY > 20);
	};
    
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    // Lock body scroll when drawer is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <nav
      className="fixed w-full top-0 z-50 transition-all duration-300"
    >
      <div className={`w-full border-b ${
        scrolled
          ? 'backdrop-blur-lg border-[var(--border-color)] bg-[var(--nav-bg)]'
          : 'border-transparent bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Title */}
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-[var(--text-color)]"
            >
              {title}
            </motion.h1>

            {/* Mobile Menu Button */}
			<div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[var(--text-color)] p-2"
                aria-label="Toggle menu"
              >
                {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
              </button>
            </div>
			
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Navigation Links */}
              <div className="flex space-x-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="nav-link relative text-[var(--text-color)] transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Theme and Laguage Toggle Button */}
              <div className="flex items-center space-x-4">
                <LanguageSwitch locale={locale} setLocale={setLocale} />
                <ThemeSwitch theme={theme} toggleTheme={toggleTheme} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Drawer */}
            <motion.div
              ref={drawerRef}
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween' }}
              className="fixed inset-y-0 right-0 w-64 bg-[var(--bg-color)] shadow-lg z-50 md:hidden"
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-[var(--text-color)]"
                aria-label="Close menu"
              >
                <IoClose size={24} />
              </button>

              <div className="flex flex-col h-full py-16 px-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="block py-4 text-[var(--text-color)] hover:opacity-70 transition-opacity"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Theme Toggle */}

				<div className="flex items-center space-x-4">
                <LanguageSwitch locale={locale} setLocale={setLocale} />
                <ThemeSwitch theme={theme} toggleTheme={toggleTheme} />
              </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};


export default memo(Navbar);