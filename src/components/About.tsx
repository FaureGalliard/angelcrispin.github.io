import Image from "next/image";

// ─── Colors ───────────────────────────────────────────────────────────────────
// bg:        #0e0e0e   text:      #e5e5e5   primary:   #4d9fff
// secondary: #4dfdb4   surface:   #1a1a1a   border:    #2a2a2a
// muted:     #6b7280

// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Window Controls ──────────────────────────────────────────────────────────
const WindowControls: React.FC<WindowControlsProps> = () => (
  <div className="flex gap-2">
    <div className="w-3 h-3 rounded-full bg-red-500" />
    <div className="w-3 h-3 rounded-full bg-yellow-400" />
    <div className="w-3 h-3 rounded-full bg-green-500" />
  </div>
);

// ─── Code Block Header ────────────────────────────────────────────────────────
const CodeBlockHeader: React.FC<{ filename?: string }> = ({ filename }) => (
  <div
    className="flex items-center px-4 py-3 rounded-t-lg border-b"
    style={{ backgroundColor: "#1a1a1a", borderColor: "#2a2a2a" }}
  >
    <WindowControls />
    {filename && (
      <span className="ml-4 text-xs font-mono" style={{ color: "#6b7280" }}>
        {filename}
      </span>
    )}
  </div>
);

// ─── Image Panel ──────────────────────────────────────────────────────────────
const ImagePanel: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <div className="relative overflow-hidden group">
    <Image
      src={src}
      alt={alt}
      width={800}
      height={600}
      priority
      className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transform group-hover:scale-105 transition-all duration-500"
    />
  </div>
);

// ─── Technologies ─────────────────────────────────────────────────────────────
const technologies = [
  "TypeScript",
  "React",
  "Node.js",
  "Docker",
];

// ─── AboutMe ──────────────────────────────────────────────────────────────────
export default function AboutMe() {
  return (
    <section
      id="about"
      className="py-24 relative"
      style={{ backgroundColor: "#0e0e0e" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* ── Image / Visual ── */}
          <div className="relative order-2 lg:order-1">

            {/* Available for hire badge */}
           

            {/* Code block container */}
            <div
              className="rounded-lg overflow-hidden shadow-2xl border"
              style={{ borderColor: "#2a2a2a" }}
            >
              <CodeBlockHeader filename="profile.img" />
              <ImagePanel
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/12d0d63973-40cfd2ed0460d3bf5207.png"
                alt="professional headshot of a software engineer, cinematic lighting, tech background, high quality photography"
              />
            </div>

            {/* Decorative corners */}
            <div
              className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 rounded-tl-lg pointer-events-none"
              style={{ borderColor: "rgba(77, 159, 255, 0.5)" }}
            />
            <div
              className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 rounded-br-lg pointer-events-none"
              style={{ borderColor: "rgba(77, 253, 180, 0.5)" }}
            />

            {/* 5+ Years Experience badge */}
            <div
              className="absolute -bottom-6 -right-6 p-4 rounded-lg shadow-xl flex items-center gap-3 animate-bounce border"
              style={{
                backgroundColor: "#1a1a1a",
                borderColor: "#2a2a2a",
                animationDuration: "3s",
              }}
            >
              <div
                className="p-2 rounded-full"
                style={{ backgroundColor: "rgba(77, 253, 180, 0.2)" }}
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  fill="#4dfdb4"
                >
                  <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                </svg>
              </div>
              <div>
                <div className="text-xs" style={{ color: "#6b7280" }}>
                  Years Experience
                </div>
                <div className="text-lg font-bold text-white">5+ Years</div>
              </div>
            </div>
          </div>

          {/* ── Content ── */}
          <div className="font-firacode order-1 lg:order-2 flex flex-col justify-center">

            {/* Heading */}
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-jetbrains text-3xl font-bold text-white">
                Sobre Mi
              </h2>
              <div
                className="h-[1px] flex-grow ml-4"
                style={{ backgroundColor: "#2a2a2a" }}
              />
            </div>

            {/* Bio */}
            <div
              className="text-sm space-y-6 leading-relaxed"
              style={{ color: "#6b7280" }}
            >
              <p>
                Hola, soy{" "}
                <span className="font-semibold" style={{ color: "#4d9fff" }}>
                  Ángel Gabriel Crispín Valdivia
                </span>
                . Me especializo en{" "}
                <span className="font-medium" style={{ color: "#4d9fff" }}>
                  desarrollo backend, APIs REST y automatización de procesos
                </span>
                . Mi enfoque está en construir sistemas eficientes que conecten
                plataformas, reduzcan tareas manuales y mejoren la trazabilidad
                de los procesos comerciales y operativos.
              </p>
              <p>
                He trabajado en el sector tecnológico y corporativo desarrollando{" "}
                <span className="font-medium" style={{ color: "#4d9fff" }}>
                  integraciones entre formularios web, CRM y herramientas de
                  automatización
                </span>
                , optimizando consultas SQL y diseñando flujos que han logrado
                reducir tareas manuales hasta en un{" "}
                <span className="font-semibold" style={{ color: "#4d9fff" }}>
                  35%
                </span>
                . Mi experiencia incluye el desarrollo y mantenimiento de
                servicios backend escalables en entornos productivos.
              </p>
              <p>
                Actualmente continúo fortaleciendo mi perfil en{" "}
                <span className="font-medium" style={{ color: "#4d9fff" }}>
                  arquitectura de sistemas, bases de datos y automatización
                  avanzada
                </span>
                , combinando mi formación en Ingeniería de Software y
                Estadística para diseñar soluciones técnicas con impacto real
                en el negocio.
              </p>
            </div>

            {/* Technologies */}
            <div className="mt-8">
              <h3 className="text-white font-mono text-sm mb-4">
                Tecnologias con la que he trabajado recientemente:
              </h3>
              <ul
                className="grid grid-cols-2 gap-2 font-mono text-sm"
                style={{ color: "#6b7280" }}
              >
                {technologies.map((tech) => (
                  <li key={tech} className="flex items-center gap-2">
                    <svg
                      className="w-2 h-3 flex-shrink-0"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 512"
                      fill="#4d9fff"
                    >
                      <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
                    </svg>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}