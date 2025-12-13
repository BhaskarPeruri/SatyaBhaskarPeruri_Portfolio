import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    title: "NFT Staking Platform",
    description:
      "Stake NFTs to earn ERC20 rewards, with staking management and security protections for users and the protocol",
    image: "nftstaking.png",
    github: "https://github.com/BhaskarPeruri/NFTStaking",
    tags: ["Solidity", "DeFi", "Smart Contracts", "Staking", "NFT", "Foundry"],
  },
  {
    title: "StableCoin_DSC",
    description:
      "A decentralized stablecoin system with WETH/WBTC collateral backing DSC tokens pegged to USD.",
    image: "/stablecoindsc.png",
    github: "https://github.com/BhaskarPeruri/StableCoin_DSC",
    tags: ["Solidity", "ERC20", "Foundry", "StableCoin", "DSC"],
  },
  // {
  //   title: "Cross-Chain Bridge",
  //   description:
  //     "Secure bridge protocol enabling asset transfers between Ethereum and Layer 2 networks. Implements Merkle proofs for verification, optimistic rollup pattern, and emergency withdrawal mechanisms.",
  //   image: "/blockchain-bridge-network.jpg",
  //   github: "https://github.com/yourusername/cross-chain-bridge",
  //   tags: ["Layer 2", "Bridge", "Security"],
  // },
  {
    title: "Dynamic and Static NFTs",
    description:"A collection of ERC721 contracts: BasicNFT for static URIs and MoodNFT for toggleable emotions and dynamic metadata",   
     image: "/nft.png",
    github: "https://github.com/BhaskarPeruri/Dynamic_and_Static_NFTs",
    tags: ["Solidity", "DeFi", "Smart Contracts", "Staking", "NFT", "Foundry"],
  },
  {
    title: "Account Abstraction Ethereum",
    description:"This is a minimal implementation of an ERC-4337 Account Abstraction smart contract wallet. It provides basic account functionality that allows users to execute transactions through the Account Abstraction infrastructure while maintaining ownership control.",
    image: "/aa.png",
    github: "https://github.com/BhaskarPeruri/AccountAbstraction_Ethereum",
    tags: ["Solidity", "DeFi", "Smart Contracts", "Account Abstraction", "Ethereum", "Foundry"],
  },
  {
    title: "TrustSig Wallet",
    description:"The TrustSig contract is a minimal, secure, and gas-efficient multi-signature wallet that allows a group of trusted owners to collaboratively manage and execute transactions",
    image: "/trustsig.png",
    github: "https://github.com/BhaskarPeruri/TrustSig_Wallet",
    tags: ["Wallet", "Multi-Signature", "Security", "Ethereum", "Foundry"],
  },
  {
    title: "Raffle Aptos",
    description:"A decentralized raffle system built on the Aptos blockchain that allows users to purchase tickets and randomly selects a winner who receives the entire prize pool.",
    image: "/rafffle.png",
    github: "https://github.com/BhaskarPeruri/aptos-raffle",
    tags: ["Move", "Aptos", "Raffle"],
  },
]

export function ProjectList() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {projects.map((project, index) => (
        <Card
          key={index}
          className="border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden group"
        >
          <div className="relative h-48 overflow-hidden bg-muted">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <CardContent className="p-6">
            <h3 className="font-semibold text-2xl mb-3">{project.title}</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              <Button asChild variant="default" size="sm" className="gap-2">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  View Code
                </a>
              </Button>
              {/* <Button asChild variant="outline" size="sm" className="gap-2 bg-transparent">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              </Button> */}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
