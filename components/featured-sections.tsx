import { BookOpen, FolderGit2, Shield, GitPullRequest, ExternalLink } from "lucide-react"
import Link from "next/link"

export function FeaturedSections() {
  const sections = [
    {
      icon: BookOpen,
      title: "Technical Blog",
      description: "Deep dives into smart contract security, vulnerability analysis",
      href: "/blogs",
      stats: "3 blogs",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: FolderGit2,
      title: "Projects",
      description: "Built in demand projects by using Solidity, Rust 🦀, Move",
      href: "/projects",
      stats: "10+ live projects",
      gradient: "from-purple-500 to-pink-500",
    },
    //@note for future use for audit portfolio
    // {
    //   icon: Shield,
    //   title: "Audit Portfolio",
    //   description: "Professional security audits across DeFi protocols, NFT platforms, and blockchain infrastructure",
    //   href: "/audits",
    //   stats: "50+ audits completed",
    //   gradient: "from-green-500 to-emerald-500",
    // },
    {
      icon: GitPullRequest,
      title: "Open Source Contributions",
      description: "My contributions to the blockchain protocols in the web3 ecosystem",
      href: "/opensource",
      stats: "5 contributions",
      gradient: "from-orange-500 to-red-500",
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent text-center">
          My Work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <Link
              key={index}
              href={section.href}
              className="group p-6 rounded-xl border border-border bg-card hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <section.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{section.title}</h3>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-cyan-500 transition-colors" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{section.description}</p>
                  <p className="text-xs text-cyan-500 font-medium">{section.stats}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
