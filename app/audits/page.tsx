import { Header } from "@/components/header"
import { AuditTable } from "@/components/audit-table"

export default function AuditsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Audit Portfolio
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Professional security audits and vulnerability findings across DeFi protocols
            </p>
          </div>
          <AuditTable />
        </div>
      </main>
    </div>
  )
}
