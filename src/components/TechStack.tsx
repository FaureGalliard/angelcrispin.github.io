const stack = [
  "TypeScript",
  "Next.js",
  "React",
  "Python",
  "C++",
  "Go",
  "Docker",
  "PostgreSQL",
  "ESP32",
  "Raspberry Pi",
];

export default function TechStack() {
  return (
    <section id="stack" className="py-24 px-6 bg-zinc-900/40">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold">Tech Stack</h2>

        <div className="mt-8 flex flex-wrap gap-3">
          {stack.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 rounded-xl border border-zinc-700 text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
