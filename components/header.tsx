"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-primary/20 bg-background/60 backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              {/* <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg blur-md opacity-0 group-hover:opacity-30 transition-opacity" /> */}
              {/* <Image
                src="/profile.png"
                alt="BlockchainDev"
                width={32}
                height={32}
                className="rounded-lg relative z-10 border border-primary/20"
              /> */}
            </div>
            <span className="font-mono font-semibold text-lg bg-gradient-to-r from-foreground to-primary bg-clip-text">
              Satya Bhaskar Peruri
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/#about"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/experience"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
            >
              Experience
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/blogs"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
            >
              Blogs
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/projects"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
            >
              Projects
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
            </Link>
            {/* commented for future use */}
            {/* <Link
              href="/audits"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
            >
              Audits
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
            </Link> */}
            <Link
              href="/opensource"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
            >
              Open Source Contributions
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/socials"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
            >
              Socials
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
            </Link>
          </nav>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-4 hover:bg-primary/10 border border-primary/20 hover:border-primary/40 transition-all"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-primary" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-primary" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
