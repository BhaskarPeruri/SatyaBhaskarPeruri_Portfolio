export interface Experience {
  id: string
  company: string
  position: string
  location: string
  website: string
  // duration: string
  startDate: string
  endDate: string
  description: string
  responsibilities: string[]
  technologies: string[]
  logo?: string
}

export const experiences: Experience[] = [
  {
    id: "1",
    company: "Ryzer",
    position: "Senior Blockchain Developer",
    location: "Hyderabad, India",
    website: "https://www.ryzerx.com/",
    // duration: "2 y",
    startDate: "Aug 2025",
    endDate: "Present",
    description: "Leading the design and deployment of production-grade smart contracts for RWA tokenization and account abstraction",
    responsibilities: [
      "Develop and deploy Solidity smart contracts implementing ERC3643 (RWA tokenization) and ERC4337 (Account Abstraction) standards",
      "Built comprehensive testing suites using Hardhat and Foundry covering unit, integration, fuzz, and invariant tests",
      "Performed gas optimizations and implemented secure design patterns to reduce vulnerabilities and improve scalability",
      "Integrate smart contracts with frontend and backend systems, implemented blockchain API interactions, and built embedded wallets with stablecoin-based crypto payment flows for RWA token purchases.",
     
    ],
    technologies: ["Solidity","ERC3643","OnchainID", "ERC4337", "Hardhat", "Foundry", "React.js","Next.js", "web3.js", "Express.js", "Node.js", "TypeScript", "JavaScript", "Slither", "Mythril", "Echidna"],
  },
  {
    id: "2",
    company: "QuillAudits",
    position: "Web3 Security Researcher",
    location: "Remote",
    website: "https://www.quillaudits.com/",
    // duration: "1 year 8 months",
    startDate: "Aug 2024",
    endDate: "June 2025",
    description: "Audited smart contracts across Ethereum, BSC, and EVM-compatible chains while analyzing real-world exploits to develop preventive strategies, implementing fuzz testing with Foundry.",
    responsibilities: [
      "Audited Smart Contracts and mitigating potential vulnerabilities in them across Ethereum, BSC, and other EVM-compatible chains.",
      "Analyzed recent hacks and exploits to develop comprehensive audit checklists and preventive strategies, including root cause analysis and remediation planning.",
      "Implemented fuzz testing for smart contracts using tools like Echidna and Foundry to uncover edge-case vulnerabilities and unexpected behaviors under randomized inputs.",
      "Contributed to the ongoing development of QuillShield AI Agent, enhancing its ability to detect and report vulnerabilities."
    ],
    technologies: ["Solidity", "Fuzz Testing", "Slither", "Mythril", "Echidna", "Foundry", "Hardhat", "Exploit Analysis"],
  },
  {
    id: "3",
    company: "KryptoMerch",
    position: "Blockchain Developer Intern",
    location: "Remote",
    website: "https://kryptomerch.io/",
    // duration: "1 year 2 months",
    startDate: "Feb 2024",
    endDate: "March 2024",
    description: "",
    responsibilities: [
      "Assisted in maintaining stability and functionality of KryptoMerch’s NFT launchpad, marketplace, and merchandising protocol.",
      "Contributed to the coding, testing, and deployment of software updates and enhancements.",
      "Collaborated with cross-functional teams including developers, designers, and project managers to support project objectives.",
    ],
    technologies: ["Solidity",  "React", "web3.js", "Express.js", "Node.js", "TypeScript", "JavaScript", "MongoDB",]
  },
]
