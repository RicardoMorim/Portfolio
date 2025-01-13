'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { en } from '@/language/translations/en';
import { pt } from '@/language/translations/pt';
import {
	Translations,
	Locale,
	locales,
	Project,
	Milestone,
	Skills,
	Navigation,
	Contact,
	Footer,
	Hero,
	About,
	Theme
} from '@/language/config';

interface LanguageContextType {
	locale: Locale;
	setLocale: (locale: Locale) => void;
	getTitle: () => string;
	getProjects: () => { projects: Project };
	getMilestones: () => { title: string; items: Milestone[] };
	getSkills: () => Skills;
	getNavigation: () => Navigation;
	getContact: () => Contact;
	getFooter: () => Footer;
	getHero: () => Hero;
	getAbout: () => About;
	getTheme: () => Theme;
	getZoom: () => string;
}

const translations: Record<Locale, Translations> = { en, pt };

export const LanguageContext = createContext<LanguageContextType>({
	locale: 'en',
	setLocale: () => { },
	getTitle: () => '',
	getProjects: () => ({ projects: { title: '', items: [] } }),
	getMilestones: () => ({ title: '', items: [] }),
	getSkills: () => ({} as Skills),
	getNavigation: () => ({} as Navigation),
	getContact: () => ({} as Contact),
	getFooter: () => ({} as Footer),
	getHero: () => ({} as Hero),
	getAbout: () => ({} as About),
	getTheme: () => ({} as Theme),
	getZoom: () => '',
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
	const [locale, setLocale] = useState<Locale>('en');

	useEffect(() => {
		const savedLocale = localStorage.getItem('locale') as Locale;
		if (locales.includes(savedLocale)) {
			setLocale(savedLocale);
		}
	}, []);

	// Typed section getters
	const getProjects = () => ({
		projects: {
			title: translations[locale].projects.title,
			items: translations[locale].projects.items,
		}
	});

	const getMilestones = () => ({
		title: translations[locale].about.milestones.title,
		items: translations[locale].about.milestones.items
	});

	const getTitle = () => translations[locale].title

	const getSkills = () => translations[locale].skills;
	const getNavigation = () => translations[locale].nav;
	const getContact = () => translations[locale].contact;
	const getFooter = () => translations[locale].footer;
	const getHero = () => translations[locale].hero;
	const getAbout = () => translations[locale].about;

	const handleSetLocale = (newLocale: Locale) => {
		setLocale(newLocale);
		localStorage.setItem('locale', newLocale);
	};

	const getTheme = () => translations[locale].theme;

	const getZoom = () => translations[locale].zoom;

	return (
		<LanguageContext.Provider value={{
			locale,
			setLocale: handleSetLocale,
			getTitle,
			getProjects,
			getMilestones,
			getSkills,
			getNavigation,
			getContact,
			getFooter,
			getHero,
			getAbout,
			getTheme,
			getZoom
		}}>
			{children}
		</LanguageContext.Provider>
	);
}

export const useTranslation = () => useContext(LanguageContext);