import { Github, Linkedin, Twitter, Mail, FileText, FolderCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur-lg opacity-30" />
            <Image
              src="/profile.png"
              alt="BlockchainDev Profile"
              width={140}
              height={140}
              className="rounded-3xl relative z-10 border-4 border-background shadow-2xl"
            />
          </div>

          {/* <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            BlockchainDev
          </h1> */}

          <p className="text-xl md:text-2xl mb-3 font-medium bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Blockchain Security Researcher & Blockchain Developer
          </p>

          <p className="text-base text-muted-foreground/80 max-w-2xl mb-8 leading-relaxed">
            Building and securing the decentralized future through smart
            contract development, security audits, and vulnerability research.
            Specialized in EVM-based protocols, DeFi security, and end-to-end
            blockchain engineering.
          </p>

          {/* <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-muted-foreground">Available for audits</span>
            </div>
            <div className="text-muted-foreground">50+ Smart Contracts Audited</div>
            <div className="text-muted-foreground">15+ Contest Findings</div>
          </div> */}

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            {/* <Button asChild size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90">
              <Link href="/audits">View Audit Work</Link>
            </Button> */}
            {/* <Button asChild size="lg" variant="outline" className="hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
              <Link href="/audits">View Audit Work</Link>
            </Button> */}
            <Button asChild size="lg" variant="outline" className="hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
              <Link href="/projects">
              <FolderCode/>See Projects</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
              <Link href="/blogs">
                <FileText className="h-4 w-4 mr-2" />
                Read Blogs
              </Link>
            </Button>
          </div>
          

          <div className="flex items-center justify-center gap-3 mt-11">
            <a
              href="https://github.com/BhaskarPeruri"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            >
              <Github className="h-5 w-5" />
              <span className="text-sm">GitHub</span>
            </a>
            <a
              href="https://x.com/0xPSB"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            >
              <Twitter className="h-5 w-5" />
              <span className="text-sm">Twitter</span>
            </a>
            <a
              href="https://www.linkedin.com/in/satya-bhaskar-peruri-b84521242/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            >
              <Linkedin className="h-5 w-5" />
              <span className="text-sm">LinkedIn</span>
            </a>
            <a
              href="mailto:bhaskarperuri266@gmail.com"
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            >
              <Mail className="h-5 w-5" />
              <span className="text-sm">Email</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
