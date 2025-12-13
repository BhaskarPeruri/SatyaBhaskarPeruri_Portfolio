import { Header } from "@/components/header"
import { OpenSourceTable } from "@/components/opensource-table"

export default function OpenSourcePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Open Source Contributions
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My contributions to the blockchain protocols in the web3 ecosystem
            </p>
          </div>
          <OpenSourceTable />
        </div>
      </main>
    </div>
  )
}
