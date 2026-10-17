import { Header } from "@/components/header"
import { experiences } from "@/lib/experience-data"
import { Briefcase, Calendar, MapPin, ExternalLink } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function ExperiencePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 heading-gradient">Professional Experience</h1>
            <p className="text-base md:text-lg text-muted-foreground">
              My career journey in blockchain development and security
            </p>
          </div>

          <div className="space-y-6">
            {experiences.map((exp) => (
              <Card
                key={exp.id}
                className="p-5 sm:p-6 border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/20">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="mb-4">
                      <h2 className="text-xl md:text-2xl font-semibold mb-1.5">{exp.position}</h2>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
                        <a
                          href={exp.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base text-primary hover:underline font-medium inline-flex items-center gap-1"
                        >
                          {exp.company}
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                    </div>

                    {exp.description && (
                      <p className="text-muted-foreground mb-5 leading-relaxed">{exp.description}</p>
                    )}

                    <div className="mb-5">
                      <h3 className="text-sm font-semibold uppercase tracking-wide mb-2 text-foreground">
                        Key Responsibilities
                      </h3>
                      <ul className="space-y-1.5">
                        {exp.responsibilities.map((responsibility, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm md:text-base text-muted-foreground leading-relaxed">
                            <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                            <span>{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wide mb-2 text-foreground">
                        Technologies &amp; Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
