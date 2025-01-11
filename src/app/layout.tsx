'use client'
import { ThemeProvider } from '@/context/ThemeContext'
import Navbar from '@/components/Navbar'
import "@/styles/globals.css"

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>
				<ThemeProvider>
					<div className="app-container">
						<Navbar />
						{children}
					</div>
				</ThemeProvider>
				<style>
					@import url('https://fonts.googleapis.com/css2?family=Londrina+Shadow&family=Saira+Stencil+One&family=Special+Elite&display=swap');
					@import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');
				</style>
			</body>
		</html>
	)
}