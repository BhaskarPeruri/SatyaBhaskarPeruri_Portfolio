import Link from "next/link"
import { ArrowRight, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { experiences } from "@/lib/experience-data"

export function ExperiencePreview() {
  // Show only the first 2 experiences
  const featuredExperiences = experiences.slice(0, 2)

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Professional Experience
            </h2>
            <p className="text-muted-foreground">My journey in blockchain development</p>
          </div>
          <Button asChild variant="outline" className="border-primary/20 hover:border-primary/40 bg-transparent">
            <Link href="/experience">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          {featuredExperiences.map((exp) => (
            <Card
              key={exp.id}
              className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/20">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{exp.position}</h3>
                      <a
                        href={exp.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-medium"
                      >
                        {exp.company}
                      </a>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{exp.duration}</p>
                      <p className="text-sm text-muted-foreground">
                        {exp.startDate} - {exp.endDate}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{exp.location}</p>
                  <p className="text-muted-foreground mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
