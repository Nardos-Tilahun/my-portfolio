"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaDocker, FaDatabase } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiMysql, SiPostgresql, SiFirebase, SiDjango, SiRedis, SiTypescript, SiGraphql, SiWebpack, SiKubernetes, SiJenkins, SiNginx, SiVercel } from "react-icons/si";

// Define the props interface for TechnicalSkills
interface TechnicalSkillsProps {
  id: string; // Add id to the props interface
}

// Update the function signature to accept id prop
export default function TechnicalSkills({ id }: TechnicalSkillsProps) {
  const skills = [
    {
      category: "Frontend Development",
      items: [
        { name: "HTML5", description: "Mastery of semantic, accessible markup.", icon: <FaHtml5 className="text-orange-500" /> },
        { name: "CSS3", description: "Knowledge of responsive design with Flexbox and Grid.", icon: <FaCss3Alt className="text-blue-500" /> },
        { name: "JavaScript (ES6+)", description: "Core language skills, including modern syntax and features.", icon: <FaJs className="text-yellow-500" /> },
        { name: "React.js", description: "Leading library for building UI components.", icon: <FaReact className="text-cyan-500" /> },
        { name: "Next.js", description: "Framework for server-side rendering and static site generation.", icon: <SiNextdotjs className="text-black" /> },
        { name: "ShadCN Components", description: "Pre-styled, accessible components tailored for modern web apps, using Tailwind CSS.", icon: <SiTailwindcss className="text-teal-500" /> },
        { name: "Responsive Design", description: "Expertise in creating layouts for various screen sizes.", icon: <FaCss3Alt className="text-blue-400" /> },
        { name: "Tailwind CSS", description: "Utility-first CSS framework for rapid UI development.", icon: <SiTailwindcss className="text-teal-500" /> },
        { name: "TypeScript", description: "Enhances JavaScript with static typing for larger projects.", icon: <SiTypescript className="text-blue-600" /> },
        { name: "Webpack/Vite", description: "Bundlers for optimizing frontend assets.", icon: <SiWebpack className="text-blue-400" /> },
      ],
    },
    {
      category: "Backend Development",
      items: [
        { name: "Node.js", description: "Key runtime for JavaScript on the server-side.", icon: <FaNodeJs className="text-green-500" /> },
        { name: "Express.js", description: "Lightweight web application framework for Node.js.", icon: <FaNodeJs className="text-gray-700" /> },
        { name: "RESTful API Development", description: "Designing scalable APIs.", icon: <FaNodeJs className="text-gray-500" /> },
        { name: "GraphQL", description: "API query language for flexible data fetching.", icon: <SiGraphql className="text-pink-500" /> },
        { name: "Django", description: "Python framework for rapid backend development.", icon: <SiDjango className="text-green-800" /> },
        { name: "Authentication/Authorization", description: "Secure implementation using OAuth and JWT.", icon: <FaGitAlt className="text-orange-600" /> },
        { name: "Asynchronous Programming", description: "Using Promises and Async/Await effectively.", icon: <FaNodeJs className="text-gray-700" /> },
        { name: "Error Handling", description: "Comprehensive debugging and exception handling.", icon: <FaNodeJs className="text-gray-600" /> },
        { name: "Caching", description: "Using Redis or similar tools for optimizing performance.", icon: <SiRedis className="text-red-500" /> },
      ],
    },
    {
      category: "Database Management",
      items: [
        { name: "MongoDB", description: "NoSQL database for flexible and scalable storage.", icon: <SiMongodb className="text-green-500" /> },
        { name: "MySQL", description: "Reliable relational database for structured data.", icon: <SiMysql className="text-blue-500" /> },
        { name: "PostgreSQL", description: "Advanced SQL features and scalability.", icon: <SiPostgresql className="text-blue-600" /> },
        { name: "Redis", description: "In-memory data structure store for caching.", icon: <SiRedis className="text-red-600" /> },
        { name: "Firebase", description: "Real-time database with backend-as-a-service capabilities.", icon: <SiFirebase className="text-yellow-500" /> },
        { name: "Database Normalization", description: "Optimizing database schema design.", icon: <FaDatabase className="text-gray-500" /> },
      ],
    },
    {
      category: "Integration & Deployment",
      items: [
        { name: "Git/GitHub", description: "Version control for collaborative coding.", icon: <FaGitAlt className="text-orange-500" /> },
        { name: "Docker", description: "Containerizing applications for consistent environments.", icon: <FaDocker className="text-blue-500" /> },
        { name: "Kubernetes", description: "Orchestrating containerized applications.", icon: <SiKubernetes className="text-blue-600" /> },
        { name: "Jenkins", description: "Automating builds, tests, and deployments.", icon: <SiJenkins className="text-gray-700" /> },
        { name: "GitHub Actions", description: "CI/CD pipelines directly integrated with repositories.", icon: <FaGitAlt className="text-gray-500" /> },
        { name: "AWS (EC2, S3)", description: "Cloud services for hosting and storage.", icon: <FaDatabase className="text-yellow-600" /> },
        { name: "Vercel/Netlify", description: "Platforms for frontend hosting and serverless functions.", icon: <SiVercel className="text-black" /> },
        { name: "Nginx", description: "Reverse proxy and web server configuration.", icon: <SiNginx className="text-green-700" /> },
      ],
    },
  ];

  return (
    <section id={id} className="relative w-full pb-12 md:py-24 lg:pb-32 overflow-hidden"> {/* Use id prop here */}
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>

      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent"></div>

      <div className="relative container px-4 md:px-6 py-16 md:py-0">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 text-center mb-12">
          Technical Skills
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill) => (
            <Card
              key={skill.category}
              className="group relative overflow-hidden backdrop-blur-lg bg-white/10 border-0 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-500 hover:-translate-y-2"
            >
              {/* Card gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <CardHeader className="relative z-10">
                <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  {skill.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <ul className="space-y-4">
                  {skill.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-start space-x-3 group/item hover:bg-white/5 p-2 rounded-lg transition-colors duration-300"
                    >
                      <div className="flex-shrink-0 text-2xl transform group-hover/item:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-100 group-hover/item:text-emerald-300 transition-colors duration-300">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-400 group-hover/item:text-gray-300 transition-colors duration-300">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Additional floating elements for depth */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
    </section>
  );
}