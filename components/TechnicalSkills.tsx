import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TechnicalSkills() {
  const skills = [
    { category: "Frontend", items: ["React.js", "HTML5", "CSS3", "JavaScript"] },
    { category: "Backend", items: ["Node.js", "Express.js"] },
    { category: "Database", items: ["MongoDB"] },
    { category: "Other", items: ["Git", "API Development", "Responsive Design"] },
  ]

  return (
    <section id="skills" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Technical Skills</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill) => (
            <Card key={skill.category}>
              <CardHeader>
                <CardTitle>{skill.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside">
                  {skill.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

