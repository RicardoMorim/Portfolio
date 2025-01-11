'use client'
import Link from 'next/link';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
	title?: string;
}

const Navbar: React.FC<NavbarProps> = ({ title = 'My App' }) => {
	const { theme, toggleTheme } = useContext(ThemeContext);
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/contact', label: 'Contact' },
	];

	return (
		<nav
			className={`fixed w-full top-0 z-50 border-b transition-all duration-300 ${scrolled
					? 'backdrop-blur-lg border-[var(--border-color)] bg-[var(--nav-bg)]'
					: 'border-transparent bg-transparent'
				}`}
		>
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

						{/* Theme Toggle Button */}
						<motion.button
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							whileHover={{ scale: 1.1 }}
							onClick={toggleTheme}
							className="p-2.5 rounded-full bg-[var(--text-color)] text-[var(--bg-color)] hover:opacity-80 transition-opacity"
						>
							{theme === 'light' ? '🌙' : '☀️'}
						</motion.button>
					</div>

					{/* Rest of the code remains the same */}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;