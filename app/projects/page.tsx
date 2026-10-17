import { Header } from "@/components/header"
import { ProjectList } from "@/components/project-list"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 heading-gradient">Projects</h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Built in demand projects by using Solidity, Rust 🦀, Move
            </p>
          </div>
          <ProjectList />
        </div>
      </main>
    </div>
  )
}
