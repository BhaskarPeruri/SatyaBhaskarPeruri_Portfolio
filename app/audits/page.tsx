import { Header } from "@/components/header"
import { AuditTable } from "@/components/audit-table"

export default function AuditsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 heading-gradient">Audit Portfolio</h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Professional security audits and vulnerability findings across DeFi protocols
            </p>
          </div>
          <AuditTable />
        </div>
      </main>
    </div>
  )
}
