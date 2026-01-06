const projects = [
  
  {
    title: "Automatización & Sistemas",
    description: "Integración de datos, sensores, backend y control.",
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-[rgba(16,17,17,1)]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold">Proyectos</h2>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <div
              key={p.title}
              className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900 hover:border-zinc-600 transition"
            >
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="mt-2 text-zinc-400">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
