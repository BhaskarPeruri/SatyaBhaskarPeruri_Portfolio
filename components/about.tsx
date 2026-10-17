import { Shield, Code, Terminal, Award, TestTubeDiagonal } from "lucide-react";

export function About() {
  const skills = [
    {
      icon: Code,
      title: "Development",
      items: ["Solidity", "Rust", "Move", "DAML", "MERN", "web3.js"],
    },
    {
      icon: Shield,
      title: "Security",
      items: [
        "Hardhat/Foundry",
        "Smart Contract Audits",
        "Web3 CTFs",
        "Vulnerability Research",
        "Audit Contests Participation",
      ],
    },

    {
      icon: TestTubeDiagonal,
      title: "Tests",
      items: [
        "Unit tests",
        "Fuzz tests",
        "Fork tests",
        "Invariant tests",
        "Integration tests",
        "Mutation testing",
      ],
    },

    {
      icon: Terminal,
      title: "Technologies",
      items: [
        "EVM",
        "Canton",
        "Hyperledger",
        "IPFS",
        "Solana",
        "Sui",
        "Aptos",
      ],
    },
  ];

  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 heading-gradient">
            About Me
          </h2>
          <div className="space-y-4 text-base md:text-lg">
            <p className="text-muted-foreground leading-relaxed">
            I’m a Blockchain Developer focused on building secure, compliant, 
            and scalable blockchain infrastructure for real-world asset (RWA) tokenization 
            and digital financial markets.
            </p>
            <p className="text-muted-foreground leading-relaxed">
            My work spans smart contract engineering, RWA tokenization, DeFi, Web3 security, 
            and full-stack blockchain development. At RyzerX, I work on production-grade tokenization 
            infrastructure using standards such as ERC-3643 and ERC-4337, building solutions for real estate, 
            funds, bonds, compliant OTC trading, investor onboarding, settlement, custody, 
            and stablecoin-based payment rails.
            </p>
            <p className="text-muted-foreground leading-relaxed">
            Before moving into RWA infrastructure, I worked as a Web3 Security Researcher, 
            auditing smart contracts across EVM ecosystems and using Foundry 
            and Echidna for fuzzing, invariant testing, exploit analysis, and vulnerability research. 
            This security background strongly influences how I design and review production smart contracts.
            </p>
            <p className="text-muted-foreground leading-relaxed">
            I’m particularly interested in the intersection of blockchain, financial infrastructure, tokenization, privacy, interoperability, and AI. 
            I’m currently working with Canton Network, DAML, and Hyperledger, while exploring institutional blockchain architectures 
            and emerging AI technologies to understand how distributed systems can support the next generation of financial markets.
            </p>
            <p className="text-muted-foreground leading-relaxed">
            I enjoy building, researching, breaking, and securing blockchain systems — from smart contracts and protocols to complete tokenization platforms.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-6">Skills & Expertise</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                    <skill.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg">{skill.title}</h3>
                </div>
                <ul className="space-y-2">
                  {skill.items.map((item, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground flex items-center gap-2"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
