import Link from "next/link"
import { ArrowRight, Briefcase, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { experiences } from "@/lib/experience-data"

export function ExperiencePreview() {
  // Show only the first 2 experiences
  const featuredExperiences = experiences.slice(0, 2)

  return (
    <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 heading-gradient">Professional Experience</h2>
            <p className="text-muted-foreground">My journey in blockchain development</p>
          </div>
          <Button
            asChild
            variant="outline"
            className="w-fit border-primary/20 hover:border-primary/40 bg-transparent"
          >
            <Link href="/experience">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          {featuredExperiences.map((exp) => (
            <Card
              key={exp.id}
              className="p-5 sm:p-6 border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/20">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div className="min-w-0">
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
                    <div className="flex flex-wrap sm:flex-col sm:items-end gap-x-4 gap-y-1 text-sm text-muted-foreground sm:text-right flex-shrink-0">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {exp.startDate} - {exp.endDate}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
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
