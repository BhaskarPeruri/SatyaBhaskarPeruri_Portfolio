import { Header } from "@/components/header"
import { BlogList } from "@/components/blog-list"

export default function BlogsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              CTF Writeups and Deep Dives 
            </p>
          </div>
          <BlogList />
        </div>
      </main>
    </div>
  )
}
