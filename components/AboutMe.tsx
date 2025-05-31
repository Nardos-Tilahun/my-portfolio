"use client";

// Define the props interface for AboutMe
interface AboutMeProps {
  id: string; // Add id to the props interface
}

// Update the function signature to accept id prop
export default function AboutMe({ id }: AboutMeProps) {
  return (
    <section
      id={id} // Use id prop here
      className="w-full py-12 md:py-16 lg:py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white relative"
    >
      <div className="container px-4 md:px-6 py-4 md:py-0">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
          About Me
        </h2>
        <div
          className="max-w-4xl mx-auto space-y-6 p-6 bg-gray-900/70 backdrop-blur-md rounded-lg shadow-lg animate-fade-in-up"
        >
          <p className="text-lg leading-relaxed">
            Hi! I'm a dedicated <span className="text-indigo-400">Full Stack Developer</span> and a{" "}
            <span className="text-green-400">Master's student in Computer Science at HiLcoE</span>, with a background that bridges technology and engineering. I spent <span className="text-purple-400">five years</span> as a civil engineer, working as a contractor and structural designer, where I developed software solutions for challenges in construction and design.
          </p>
          <p className="text-lg leading-relaxed">
            Over the past <span className="text-purple-400">two years</span>, I’ve expanded my expertise in web development, using frameworks like <span className="text-pink-400">React</span>, <span className="text-indigo-400">Next.js</span>, and <span className="text-yellow-400">Node.js</span>. I thrive on solving challenging problems through agile methodologies and building scalable, user-centric applications.
          </p>
          <p className="text-lg leading-relaxed">
            Beyond coding, I thrive on tackling <span className="text-indigo-400">data structures</span> and{" "}
            <span className="text-yellow-400">algorithms</span>, which sharpen my problem-solving skills. As a proud{" "}
            <span className="text-purple-400">ALX</span> and <span className="text-indigo-400">Evangadi Tech Boot Camp</span>{" "}
            student, I continuously refine my technical abilities and stay at the forefront of innovation. I also enjoy
            exploring low-level programming with <span className="text-pink-400">C</span> and{" "}
            <span className="text-yellow-400">Assembly language</span>, broadening my technical foundation.
          </p>
          <p className="text-lg leading-relaxed">
            In my free time, I dive into <span className="text-green-400">cutting-edge technologies</span>, experiment
            with <span className="text-pink-400">AI-powered tools</span>, and work on creative projects. With a passion
            for technology and an engineering mindset, I aim to create impactful solutions that drive progress and
            simplify lives. Let's build something remarkable together!
          </p>
        </div>
      </div>

      {/* Floating animation elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-r from-indigo-400 to-green-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
    </section>
  );
}