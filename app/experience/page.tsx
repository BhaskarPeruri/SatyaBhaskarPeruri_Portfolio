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
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Professional Experience
            </h1>
            <p className="text-lg text-muted-foreground">My career journey in blockchain development and security</p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card
                key={exp.id}
                className="p-8 border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/20">
                    <Briefcase className="w-8 h-8 text-primary" />
                  </div>

                  <div className="flex-1">
                    <div className="mb-4">
                      <h2 className="text-2xl font-bold mb-2">{exp.position}</h2>
                      <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-3">
                        <a
                          href={exp.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg text-primary hover:underline font-semibold flex items-center gap-1"
                        >
                          {exp.company}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {exp.startDate} - {exp.endDate} 
                        </span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-6 text-lg">{exp.description}</p>

                    <div className="mb-6">
                      <h3 className="font-semibold mb-3 text-foreground">Key Responsibilities:</h3>
                      <ul className="space-y-2">
                        {exp.responsibilities.map((responsibility, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                            <span className="text-primary mt-1">•</span>
                            <span>{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3 text-foreground">Technologies & Skills:</h3>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 text-sm rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
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
