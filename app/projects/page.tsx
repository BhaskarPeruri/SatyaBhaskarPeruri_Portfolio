import { Header } from "@/components/header"
import { ProjectList, projects } from "@/components/project-list"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both motion-reduce:animate-none">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-bold heading-gradient">Projects</h1>
              <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 font-mono text-xs font-medium text-primary">
                {projects.length} projects
              </span>
            </div>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Built in demand projects by using Solidity, Rust 🦀, Move
            </p>
            <div
              aria-hidden
              className="mt-6 h-px w-full bg-gradient-to-r from-primary/40 via-accent/30 to-transparent"
            />
          </div>
          <ProjectList />
        </div>
      </main>
    </div>
  )
}
