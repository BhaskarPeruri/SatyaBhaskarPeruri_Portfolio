import { Shield, Code, Terminal, Award, TestTubeDiagonal } from "lucide-react";

export function About() {
  const skills = [
    {
      icon: Code,
      title: "Development",
      items: ["Solidity", "Rust", "Move", "JavaScript/TypeScript", "web3.js"],
    },
    {
      icon: Shield,
      title: "Security",
      items: [
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
        "Ethereum",
        "Layer 2s",
        "Hardhat/Foundry",
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed mt-1">
              I'm a blockchain developer and security researcher who builds and
              secures production-grade smart contracts at Ryzer, specializing in
              advanced standards like <b>ERC3643</b> (RWA tokenization) and{" "}
              <b>ERC4337</b> (Account Abstraction).
            </p>
            <p className="text-muted-foreground leading-relaxed mt-1">
              My experience auditing contracts at QuillAudits across Ethereum
              and EVM-compatible chains taught me that the most secure systems
              are built by developers who understand both construction and
              exploitation
            </p>
            <p className="text-muted-foreground leading-relaxed mt-1">
              I've earned three-digit bounties validating AI-discovered
              vulnerabilities, identified medium-severity bugs in Code4rena
              contests, and ranked top 30 in Move language security competitions
              on HackenProof.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-1">
              With expertise spanning Solidity, Move, Rust, and comprehensive
              fuzz testing using Echidna and Foundry, I bridge the critical gap
              between development and security that most Web3 projects
              desperately need.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-1">
              I contribute to open source projects like Arthachain and
              Flashverse, compete in Web3 CTFs, and share technical writeups to
              strengthen the broader security community.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-1">
              Currently exploring <b> ZKP implementations</b> and scaling
              security practices for the next generation of decentralized
              protocols.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-6">Skills & Expertise</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-border bg-card hover:border-cyan-500/50 transition-colors"
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
                      <div className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
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
