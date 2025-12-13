import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { ExperiencePreview } from "@/components/experience-preview"
import { FeaturedSections } from "@/components/featured-sections"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <ExperiencePreview />
        <FeaturedSections />
      </main>
    </div>
  )
}
