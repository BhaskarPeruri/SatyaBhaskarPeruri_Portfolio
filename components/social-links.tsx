import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter, Mail, FileText, MessageSquare } from "lucide-react"

const socials = [

   {
    name: "LinkedIn",
    username: "Satya Bhaskar Peruri",
    description: "",
    icon: Linkedin,
    link: "https://www.linkedin.com/in/satya-bhaskar-peruri-b84521242/",
    color: "text-blue-600",
  },

   {
    name: "Email",
    username: "bhaskarperuri266@gmail.com",
    description: "",
    icon: Mail,
link: "mailto:bhaskarperuri266@gmail.com",
    color: "text-red-500",
  },

  {
    name: "GitHub",
    username: "@BhaskarPeruri",
    description: "",
    icon: Github,
    link: "https://github.com/BhaskarPeruri",
    color: "text-gray-500 dark:text-gray-400",
  },
  {
    name: "Twitter",
    username: "@y0xPSB",
    description: "",
    icon: Twitter,
    link: "https://x.com/0xPSB",
    color: "text-blue-500",
  },
 
 

    {
    name: "Medium",
    username: "@satyabhaskarperuri",
    description: "",
    icon: FileText,
    link: "https://medium.com/@satyabhaskarperuri",
    color: "text-gray-700 dark:text-gray-300",
  },
  // {
  //   name: "Discord",
  //   username: "yourusername#1234",
  //   description: "",
  //   icon: MessageSquare,
  //   link: "https://discord.com/users/yourid",
  //   color: "text-indigo-500",
  // },
]

export function SocialLinks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {socials.map((social, index) => (
        <Card key={index} className="border-border/50 hover:border-primary/50 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div
                className={`h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform ${social.color}`}
              >
                <social.icon className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-xl mb-1">{social.name}</h3>
                <p className="text-sm text-primary mb-2 font-mono">{social.username}</p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{social.description}</p>
                <Button asChild variant="outline" size="sm" className="gap-2 bg-transparent">
                  <a href={social.link} target="_blank" rel="noopener noreferrer">
                    Connect
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
