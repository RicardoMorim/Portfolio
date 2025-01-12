'use client'
import { ThemeProvider } from '@/context/ThemeContext'
import "@/styles/globals.css"
import Navbar from '@/components/Navbar'
import Footer from "@/components/Footer";


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
						<Footer />
					</div>
				</ThemeProvider>
				<style>
					{`@import url("https://fonts.googleapis.com/css2?family=Londrina+Shadow&family=Saira+Stencil+One&family=Special+Elite&display=swap");`}
					{`@import url("https://fonts.googleapis.com/css2?family=Special+Elite&display=swap");`}
				</style>
			</body>
		</html>
	)
}