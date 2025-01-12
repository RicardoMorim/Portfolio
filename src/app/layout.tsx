import { ThemeProvider } from '@/context/ThemeContext'
import "@/styles/globals.css"
import Navbar from '@/components/Navbar'
import Footer from "@/components/Footer"
import { Londrina_Shadow, Saira_Stencil_One, Special_Elite } from 'next/font/google'
import { LanguageProvider } from '@/context/LanguageContext';


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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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