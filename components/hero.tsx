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



          <h1 className="text-xl md:text-2xl mb-3 font-semibold heading-gradient">
            Senior Blockchain Developer &amp; Security Researcher
          </h1>

          <p className="text-base text-muted-foreground max-w-2xl mb-8 leading-relaxed">
          Building institutional-grade blockchain solutions, from secure smart contracts and RWA tokenization to compliant trading infrastructure and stablecoin payment systems. Experienced in smart contract security research, exploit analysis, and full-stack Web3 development, with a growing focus on Canton Network, DAML, and AI-driven security.
          </p>



          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <Button asChild size="lg" variant="outline" className="border-primary/20 hover:border-primary/40 bg-transparent">
              <Link href="/projects">
                <FolderCode className="h-4 w-4" />
                See Projects
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/20 hover:border-primary/40 bg-transparent">
              <Link href="/blogs">
                <FileText className="h-4 w-4" />
                Read Blogs
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
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
