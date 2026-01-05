const Section = ({
  title,
  items,
}: {
  title: string;
  items: { name: string; icon: string }[];
}) => (
  <div>
    <h3 className="text-zinc-100 font-medium mb-4">{title}</h3>
    <div className="flex flex-wrap gap-4">
      {items.map((item) => (
        <div
          key={item.name}
          className="flex items-center gap-2 px-3 py-2 rounded-md border border-zinc-800 bg-zinc-900/40 hover:border-zinc-600 transition"
        >
          <i className={`${item.icon} text-lg`} />
          <span className="text-sm text-zinc-300">{item.name}</span>
        </div>
      ))}
    </div>
  </div>
);

export default function TechStack() {
  return (
    <section id="techstack" className="py-20">
      <div className="max-w-6xl mx-auto px-6 space-y-10">
        <h2 className="text-2xl font-semibold text-white">
          Tech Stack
        </h2>

        <Section
          title="Languages"
          items={[
            { name: "Python", icon: "devicon-python-plain" },
            { name: "C++", icon: "devicon-cplusplus-plain" },
             { name: "TypeScript", icon: "devicon-typescript-plain" },
            { name: "Java", icon: "devicon-java-plain" },
            
          ]}
        />

        <Section
          title="Backend & Systems"
          items={[
            { name: "Django", icon: "devicon-django-plain" },
            { name: "Flask", icon: "devicon-flask-original" },
            { name: "Node.js", icon: "devicon-nodejs-plain" },
            { name: "REST APIs", icon: "devicon-fastapi-plain" },
            { name: "Supabase", icon: "devicon-supabase-plain" },
          ]}
        />

        

        <Section
          title="Databases"
          items={[
            { name: "PostgreSQL", icon: "devicon-postgresql-plain" },
            { name: "MySQL", icon: "devicon-mysql-plain" },
            { name: "MongoDB", icon: "devicon-mongodb-plain" },
          ]}
        />

        <Section
          title="DevOps"
          items={[
            { name: "Git", icon: "devicon-git-plain" },
            { name: "Docker", icon: "devicon-docker-plain" },
            { name: "CI/CD", icon: "devicon-githubactions-plain" },
            { name: "AWS", icon: "devicon-amazonwebservices-original" },
            { name: "Vercel", icon: "devicon-vercel-original" },
            { name: "Cloudflare", icon: "devicon-cloudflare-plain" },
          ]}
        />

        <Section
          title="Frontend"
          items={[
            { name: "Next.js", icon: "devicon-nextjs-plain" },
            { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain" },
          ]}
        />
      </div>
    </section>
  );
}
