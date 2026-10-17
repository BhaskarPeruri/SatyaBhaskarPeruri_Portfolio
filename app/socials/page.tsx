import { Header } from "@/components/header"
import { SocialLinks } from "@/components/social-links"

export default function SocialsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 heading-gradient">Connect With Me</h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Let's collaborate on blockchain projects and security research
            </p>
          </div>
          <SocialLinks />
        </div>
      </main>
    </div>
  )
}
