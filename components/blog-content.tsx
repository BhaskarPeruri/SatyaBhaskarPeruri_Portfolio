"use client"

import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Blog } from "@/lib/blog-data"

interface BlogContentProps {
  blog: Blog
}

export function BlogContent({ blog }: BlogContentProps) {
  return (
    <article className="mx-auto max-w-4xl">
      <Button asChild variant="ghost" className="mb-8 gap-2">
        <Link href="/blogs">
          <ArrowLeft className="h-4 w-4" />
          Back to Blogs
        </Link>
      </Button>

      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{blog.title}</h1>

        <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{blog.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{blog.readTime}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {blog.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-md bg-primary/10 text-primary text-sm font-medium">
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || "")
              return !inline && match ? (
                <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" {...props}>
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
          }}
        >
          {blog.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}
