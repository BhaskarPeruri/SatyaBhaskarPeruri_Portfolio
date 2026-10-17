import { Button } from "@/components/ui/button"
import { Github, ExternalLink, ArrowUpRight } from "lucide-react"
import Image from "next/image"

export const projects = [
  {
    title: "StableCoin_DSC",
    description:
      "A decentralized stablecoin system with WETH/WBTC collateral backing DSC tokens pegged to USD.",
    image: "/images/projects/stablecoindsc.png",
    github: "https://github.com/BhaskarPeruri/StableCoin_DSC",
    demo: null,
    tags: ["Solidity", "ERC20", "Foundry", "StableCoin", "DSC"],
  },
  {
    title: "Account Abstraction Ethereum",
    description:"This is a minimal implementation of an ERC-4337 Account Abstraction smart contract wallet. It provides basic account functionality that allows users to execute transactions through the Account Abstraction infrastructure while maintaining ownership control.",
    image: "/images/projects/aa.png",
    github: "https://github.com/BhaskarPeruri/AccountAbstraction_Ethereum",
    demo: null,
    tags: ["Solidity", "DeFi", "Smart Contracts", "Account Abstraction", "Ethereum", "Foundry"],
  },
  {
    title: "NFT Staking Platform",
    description:
      "Stake NFTs to earn ERC20 rewards, with staking management and security protections for users and the protocol",
    image: "/images/projects/nftstaking.png",
    github: "https://github.com/BhaskarPeruri/NFTStaking",
    demo: null,
    tags: ["Solidity", "DeFi", "Smart Contracts", "Staking", "NFT", "Foundry"],
  },
  {
    title: "Raffle Aptos",
    description:"A decentralized raffle system built on the Aptos blockchain that allows users to purchase tickets and randomly selects a winner who receives the entire prize pool.",
    image: "/images/projects/rafffle.png",
    github: "https://github.com/BhaskarPeruri/aptos-raffle",
    demo: null,
    tags: ["Move", "Aptos", "Raffle"],
  },
  {
    title: "Solana Voting Dapp",
    description:"A decentralized voting application built on Solana using the Anchor framework. This program supports proposal creation, voting, treasury initialization, token minting, and winner declaration, with clear on-chain state separation and event emission.",
    image: "/images/projects/solana_voting_dapp.png",
    github: "https://github.com/BhaskarPeruri/Voting_Dapp_Solana",
    demo: "https://voting-dapp-solanaa.vercel.app", // 🔁 Replace with your actual live demo URL
    tags: ["Solana", "Rust", "Anchor", "Voting", "Dapp"],
  },
  {
    title: "Dynamic and Static NFTs",
    description:"A collection of ERC721 contracts: BasicNFT for static URIs and MoodNFT for toggleable emotions and dynamic metadata",   
    image: "/images/projects/nft.png",
    github: "https://github.com/BhaskarPeruri/Dynamic_and_Static_NFTs",
    demo: null,
    tags: ["Solidity", "DeFi", "Smart Contracts", "Staking", "NFT", "Foundry"],
  },
  {
    title: "TrustSig Wallet",
    description:"The TrustSig contract is a minimal, secure, and gas-efficient multi-signature wallet that allows a group of trusted owners to collaboratively manage and execute transactions",
    image: "/images/projects/trustsig.png",
    github: "https://github.com/BhaskarPeruri/TrustSig_Wallet",
    demo: null,
    tags: ["Wallet", "Multi-Signature", "Security", "Ethereum", "Foundry"],
  },
  {
    title: "EthAssert",
    description:"EthAssert is a native ETH assertion market built on UMA Optimistic Oracle v3, providing a gas-optimized, production-grade interface for posting, disputing, and settling claims with ETH-backed bonds.",
    image: "/images/projects/ethAssert.png",
    github: "https://github.com/BhaskarPeruri/EthAssert",
    demo: null,
    tags: ["UMA", "Optimistic Oracle", "ETH", "Assertion Market"],
  },
]

export function ProjectList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {projects.map((project, index) => (
        <article
          key={project.title}
          style={{ animationDelay: `${index * 70}ms` }}
          className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500 motion-reduce:animate-none motion-reduce:transition-none"
        >
          {/* Accent line that lights up on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />

          {/* Cover image */}
          <div className="relative aspect-video overflow-hidden bg-muted">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent"
            />

            <span className="absolute left-4 top-4 rounded-md border border-white/15 bg-black/50 px-2 py-0.5 font-mono text-[11px] font-medium tracking-wider text-white/90 backdrop-blur-md">
              {String(index + 1).padStart(2, "0")}
            </span>

            {project.demo && (
              <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-black/50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300 backdrop-blur-md">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Live
              </span>
            )}
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <div className="mb-2 flex items-start justify-between gap-3">
              <h3 className="text-xl font-semibold leading-snug tracking-tight transition-colors duration-300 group-hover:text-primary">
                {project.title}
              </h3>
              <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground/60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
            </div>

            <p className="mb-5 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
              {project.description}
            </p>

            <div className="mb-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Footer actions */}
            <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-border/60 pt-4">
              <Button asChild variant="default" size="sm" className="gap-2 shadow-sm shadow-primary/20">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  View Code
                </a>
              </Button>
              {project.demo && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="gap-2 border-primary/20 bg-transparent hover:border-primary/40"
                >
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}