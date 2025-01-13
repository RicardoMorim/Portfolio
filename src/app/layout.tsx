import { ThemeProvider } from '@/context/ThemeContext'
import "@/styles/globals.css"
import Navbar from '@/components/Navbar'
import Footer from "@/components/Footer"
import { Londrina_Shadow, Saira_Stencil_One, Special_Elite } from 'next/font/google'
import { LanguageProvider } from '@/context/LanguageContext';
import { Metadata } from 'next';

const londrinaShadow = Londrina_Shadow({
	weight: '400',
	subsets: ['latin'],
})

const sairaStencil = Saira_Stencil_One({
	weight: '400',
	subsets: ['latin'],
})

const specialElite = Special_Elite({
	weight: '400',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Ricardo Morim | Software Engineer',
	description: 'Full Stack Developer specialized in React, Next.js, and TypeScript. Looking for a software engineer? You came to the right place!',
	manifest: '/icons/site.webmanifest',
	icons: {
		icon: [
			{ url: '/icons/favicon.ico' },
			{ url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
		],
		apple: [
			{ url: '/icons/apple-touch-icon.png' },
		],
		other: [
			{ rel: 'mask-icon', url: '/icons/android-chrome-192x192.png', color: '#5bbad5' },
		],
	},
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://ricardoportfolio.vercel.app/',
		title: 'Ricardo Morim | Software Engineer',
		description: 'Full Stack Developer specialized in React, Next.js, and TypeScript',
		siteName: 'Ricardo Morim Portfolio',
		images: [{
			url: '/icons/android-chrome-512x512.png',
			width: 512,
			height: 512,
			alt: 'Ricardo Morim Portfolio'
		}],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Ricardo Morim | Software Engineer',
		description: 'Full Stack Developer specialized in React, Next.js, and TypeScript',
		images: ['/icons/android-chrome-512x512.png'],
	},
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#ffffff' },
		{ media: '(prefers-color-scheme: dark)', color: '#000000' },
	],
	robots: {
		index: true,
		follow: true
	}
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Ricardo Morim',
		url: 'https://ricardoportfolio.vercel.app',
		jobTitle: 'Software Developer',
		sameAs: [
			'https://github.com/RicardoMorim',
			'https://www.linkedin.com/in/ricardo-morim-208368251/'
		]
	}

	return (
		<html lang="en">
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/icons/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta name="theme-color" content="#ffffff" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
				/>
				<link rel="canonical" href="https://ricardoportfolio.vercel.app" />
			</head>
			<body>
				<ThemeProvider>
					<LanguageProvider>
						<div className={`app-container ${londrinaShadow.className} ${sairaStencil.className} ${specialElite.className}`}>
							<Navbar />
							{children}
							<Footer />
						</div>
					</LanguageProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}