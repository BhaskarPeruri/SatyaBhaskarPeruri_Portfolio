import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, GitPullRequest } from "lucide-react"

const contributions = [
  {
    protocol: "SecondSwap",
    date: "2024-12-20",
    language: "Solidity",
    type: "Security Fix",
    link: "https://code4rena.com/audits/2024-12-secondswap/submissions/S-587",
  },
  {
    protocol: "Bluefin Perp Audit Contest",
    date: "2025-06-18",
    language: "Move",
    type: "Low/Informational",
    link: "https://hackenproof.com/hackers/0xpsb9?tab=programs",
  },
  {
    protocol: "SuiDeX Audit Contest",
    date: "2025-07-07",
    language: "Move",
    type: "Low/Informational",
    link: "https://hackenproof.com/hackers/0xpsb9?tab=programs",
  },
  {
    protocol: "Hybra Finance",
    date: "2025-10-17",
    language: "Solidity",
    type: "Security Fix",
    link: "https://code4rena.com/@0xPSB",
  },
  // {
  //   protocol: "FlashVerse",
  //   date: "2025-10-11",
  //   language: "Solidity",
  //   type: "Featuers and Security Fixes",
  //   link: "https://www.linkedin.com/company/flashverse/posts/?feedView=all",
  // },
  // {
  //   protocol: "Ethers.js",
  //   date: "2023-12-15",
  //   language: "TypeScript",
  //   type: "Feature",
  //   link: "https://github.com/ethers-io/ethers.js/pull/example",
  // },
  // {
  //   protocol: "Slither",
  //   date: "2023-12-10",
  //   language: "Python",
  //   type: "Detector",
  //   link: "https://github.com/crytic/slither/pull/example",
  // },
  // {
  //   protocol: "Compound",
  //   date: "2023-12-05",
  //   language: "Solidity",
  //   type: "Security Fix",
  //   link: "https://github.com/compound-finance/compound-protocol/pull/example",
  // },
]

export function OpenSourceTable() {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Protocol Name</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="font-semibold">Language</TableHead>
            <TableHead className="font-semibold">Type</TableHead>
            <TableHead className="font-semibold text-right">Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contributions.map((contribution, index) => (
            <TableRow key={index} className="hover:bg-muted/30 transition-colors">
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <GitPullRequest className="h-4 w-4 text-primary" />
                  {contribution.protocol}
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{contribution.date}</TableCell>
              <TableCell>
                <Badge variant="outline">{contribution.language}</Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={
                    contribution.type === "Security Fix"
                      ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                      : contribution.type === "Feature"
                        ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                        : ""
                  }
                >
                  {contribution.type}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button asChild variant="ghost" size="sm" className="gap-2">
                  <a href={contribution.link} target="_blank" rel="noopener noreferrer">
                    
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
