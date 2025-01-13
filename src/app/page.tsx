import ClientPage from "@/components/ClientPage"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects | Ricardo Morim',
  description: 'Showcase of my software development projects'
}

// Server Component
export default function Page() {
  return <ClientPage />
}