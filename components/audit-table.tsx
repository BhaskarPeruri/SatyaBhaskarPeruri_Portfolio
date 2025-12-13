import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

const audits = [
  {
    name: "DeFi Yield Aggregator",
    platform: "Code4rena",
    date: "2024-01-20",
    findings: { high: 2, medium: 5, low: 8 },
    link: "https://code4rena.com/reports/example",
  },
  {
    name: "Cross-Chain Bridge Protocol",
    platform: "Sherlock",
    date: "2024-01-15",
    findings: { high: 1, medium: 3, low: 6 },
    link: "https://sherlock.xyz/audits/example",
  },
  {
    name: "NFT Marketplace V2",
    platform: "Code4rena",
    date: "2024-01-10",
    findings: { high: 3, medium: 7, low: 12 },
    link: "https://code4rena.com/reports/example",
  },
  {
    name: "Lending Pool Upgrade",
    platform: "Immunefi",
    date: "2024-01-05",
    findings: { high: 1, medium: 2, low: 4 },
    link: "https://immunefi.com/bounty/example",
  },
  {
    name: "Staking Contract",
    platform: "Code4rena",
    date: "2023-12-28",
    findings: { high: 2, medium: 4, low: 7 },
    link: "https://code4rena.com/reports/example",
  },
  {
    name: "Governance Token",
    platform: "Sherlock",
    date: "2023-12-20",
    findings: { high: 1, medium: 3, low: 5 },
    link: "https://sherlock.xyz/audits/example",
  },
]

export function AuditTable() {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Contest Name</TableHead>
            <TableHead className="font-semibold">Platform</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="font-semibold">Findings</TableHead>
            <TableHead className="font-semibold text-right">Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {audits.map((audit, index) => (
            <TableRow key={index} className="hover:bg-muted/30 transition-colors">
              <TableCell className="font-medium">{audit.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{audit.platform}</Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{audit.date}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {audit.findings.high > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {audit.findings.high} High
                    </Badge>
                  )}
                  {audit.findings.medium > 0 && (
                    <Badge className="bg-orange-500 hover:bg-orange-600 text-xs">{audit.findings.medium} Medium</Badge>
                  )}
                  {audit.findings.low > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {audit.findings.low} Low
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button asChild variant="ghost" size="sm" className="gap-2">
                  <a href={audit.link} target="_blank" rel="noopener noreferrer">
                    View
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
