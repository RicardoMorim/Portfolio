'use client'
import Link from 'next/link';
import { useContext, useState, useEffect, memo } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { IoMenu, IoClose } from "react-icons/io5";
import { useTranslation } from '@/context/LanguageContext';

const Navbar = () => {
	const { theme, toggleTheme } = useContext(ThemeContext);
	const { locale, setLocale, getNavigation, getTheme, getStory } = useTranslation();
	const { scrollYProgress } = useScroll();
	const [scrolled, setScrolled] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const nav = getNavigation();
	const themeLabels = getTheme();
	const navLinks = [
		{ href: '#career', label: getStory().navStory },
		{ href: '#projects', label: nav.projects },
		{ href: '#skills', label: nav.skills },
		{ href: '#recommendations', label: nav.recommendations },
		{ href: '#about', label: nav.about },
		{ href: '#contact', label: nav.contact },
	];

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 20);
		const handleKey = (event: KeyboardEvent) => event.key === 'Escape' && setIsOpen(false);
		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('keydown', handleKey);
		document.body.style.overflow = isOpen ? 'hidden' : '';
		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('keydown', handleKey);
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	const controls = (
		<div className="nav-controls">
			<button
				type="button"
				className="nav-toggle"
				onClick={() => setLocale(locale === 'en' ? 'pt' : 'en')}
				aria-label={locale === 'en' ? 'Mudar para português' : 'Switch to English'}
			>
				<span className={locale === 'en' ? 'is-on' : ''}>EN</span>
				<span className={locale === 'pt' ? 'is-on' : ''}>PT</span>
			</button>
			<button type="button" className="nav-toggle" onClick={toggleTheme}>
				<span className="theme-dot" aria-hidden="true" />
				{theme === 'light' ? themeLabels.dark : themeLabels.light}
			</button>
		</div>
	);

	return (
		<header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
			<div className="shell nav-inner">
				<Link href="#hero" className="nav-mark" aria-label="Ricardo Morim">
					RM<span className="nav-mark-dot" />
				</Link>

				<nav className="nav-links" aria-label="Primary">
					{navLinks.map((link, i) => (
						<Link key={link.href} href={link.href} className="nav-link">
							<span className="nav-index">{String(i + 1).padStart(2, '0')}</span>
							{link.label}
						</Link>
					))}
				</nav>

				<div className="nav-desktop-controls">{controls}</div>

				<button
					type="button"
					className="nav-burger"
					onClick={() => setIsOpen(!isOpen)}
					aria-label="Menu"
					aria-expanded={isOpen}
					aria-controls="mobile-menu"
				>
					{isOpen ? <IoClose size={22} /> : <IoMenu size={22} />}
				</button>
			</div>
			<motion.span className="nav-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />

			<AnimatePresence>
				{isOpen && (
					<motion.div
						id="mobile-menu"
						className="mobile-menu"
						initial={{ opacity: 0, y: -12 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -12 }}
						transition={{ duration: 0.25 }}
					>
						<nav aria-label="Mobile">
							{navLinks.map((link, i) => (
								<Link key={link.href} href={link.href} className="mobile-link" onClick={() => setIsOpen(false)}>
									<span className="nav-index">{String(i + 1).padStart(2, '0')}</span>
									{link.label}
								</Link>
							))}
						</nav>
						{controls}
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
};

export default memo(Navbar);
