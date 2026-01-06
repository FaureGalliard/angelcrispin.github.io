'use client';

import { motion } from 'framer-motion';
import { easeOut } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};


const itemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: easeOut,
    },
  },
};

const Section = ({
  title,
  items,
}: {
  title: string;
  items: { name: string; icon: string }[];
}) => (
  <div className="flex flex-col gap-4">
    <h3 className="text-white text-center">{title}</h3>

    <div
      className="rounded-2xl border p-6 backdrop-blur-md bg-[rgba(13,14,15,0.9)]"
      style={{ borderColor: 'rgba(255,255,255,0.1)' }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {items.map((item) => (
          <motion.div
            key={item.name}
            variants={itemVariants}
            className="
              flex flex-col items-center justify-center
              h-16 gap
              rounded-lg
              transition-all duration-300 ease-in-out
              group
              hover:scale-105
              hover:rotate-3
            "
            style={{
              borderColor: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <i
              className={`
                ${item.icon} colored
                text-3xl
                filter-grayscale
                group-hover:filter-none
                group-hover:scale-110
                group-hover:rotate-6
                transition-all duration-300 ease-in-out
              `}
            />
            <span className="mt-2 text-xs text-gray-400 group-hover:text-white transition-colors duration-300">
              {item.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </div>
);

export default function TechStack() {
  return (
    <section id="techstack" className="py-20 bg-[rgba(16,17,17,1)]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-white mb-10">Tech Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Section
            title="Languages"
            items={[
              { name: "Python", icon: "devicon-python-plain colored" },
              { name: "C++", icon: "devicon-cplusplus-plain colored" },
              { name: "TypeScript", icon: "devicon-typescript-plain colored" },
              { name: "Java", icon: "devicon-java-plain colored" },
            ]}
          />
          <Section
            title="Backend & Systems"
            items={[
              { name: "Django", icon: "devicon-django-plain" },
              { name: "Flask", icon: "devicon-flask-original" },
              { name: "Node.js", icon: "devicon-nodejs-plain colored" },
              { name: "REST APIs", icon: "devicon-fastapi-plain colored" },
              { name: "Supabase", icon: "devicon-supabase-plain colored" },
            ]}
          />
          <Section
            title="Databases"
            items={[
              { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
              { name: "MySQL", icon: "devicon-mysql-plain colored" },
              { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
            ]}
          />
          <Section
            title="DevOps"
            items={[
              { name: "Git", icon: "devicon-git-plain colored" },
              { name: "Docker", icon: "devicon-docker-plain colored" },
              { name: "CI/CD", icon: "devicon-githubactions-plain colored" },
              { name: "Vercel", icon: "devicon-vercel-plain" },
              { name: "Cloudflare", icon: "devicon-cloudflare-plain colored" },
            ]}
          />
          <Section
            title="Frontend"
            items={[
              { name: "Next.js", icon: "devicon-nextjs-plain colored" },
              {
                name: "Tailwind CSS",
                icon: "devicon-tailwindcss-plain colored",
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}