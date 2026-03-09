'use client'
import { useRef, useEffect, useState } from 'react'

interface Project {
    id: number
    index: string
    title: string
    subtitle: string
    description: string
    tags: string[]
    year: string
    status: string
    color: string
}

const PROJECTS: Project[] = [
    {
        id: 1,
        index: '01',
        title: 'Arquitectura de Microservicios',
        subtitle: 'Sistema distribuido de alta disponibilidad',
        description:
            'Diseño e implementación de una plataforma backend basada en microservicios con orquestación via Docker y GitHub Actions. Incluye autenticación distribuida, mensajería asíncrona y monitoreo en tiempo real.',
        tags: ['Python', 'FastAPI', 'Docker', 'PostgreSQL', 'GitHub Actions'],
        year: '2024',
        status: 'Production',
        color: '#6CDB95',
    },
    {
        id: 2,
        index: '02',
        title: 'Dashboard Analytics Engine',
        subtitle: 'Visualización de datos en tiempo real',
        description:
            'Plataforma de análisis con ingesta de datos en streaming, transformaciones ETL y visualizaciones interactivas. Construido con Next.js en el frontend y una capa de procesamiento en Python.',
        tags: ['Next.js', 'TypeScript', 'Python', 'Supabase', 'React'],
        year: '2024',
        status: 'Completed',
        color: '#F8DA63',
    },
    {
        id: 3,
        index: '03',
        title: 'CLI Dev Toolchain',
        subtitle: 'Automatización de flujos de desarrollo',
        description:
            'Herramienta de línea de comandos para scaffolding de proyectos, generación de boilerplate y gestión de entornos. Reduce de horas a minutos la configuración inicial de nuevos proyectos.',
        tags: ['Python', 'C++', 'Node.js', 'Git', 'Cloudflare'],
        year: '2023',
        status: 'Open Source',
        color: '#E46F6F',
    },
    {
        id: 4,
        index: '04',
        title: 'API Gateway & Auth Layer',
        subtitle: 'Capa de seguridad centralizada',
        description:
            'Diseño de un gateway unificado con rate limiting, JWT refresh flows y logging centralizado. Soporte multi-tenant con aislamiento de datos por organización usando Row-Level Security en PostgreSQL.',
        tags: ['FastAPI', 'PostgreSQL', 'Vercel', 'TypeScript', 'Docker'],
        year: '2023',
        status: 'Completed',
        color: '#7BA3FF',
    },
]

// ── GridCanvas ─────────────────────────────────────────────────────────────────
function GridCanvas({ side }: { side: 'left' | 'right' }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const mouseRef = useRef({ x: 0.5, y: 0.5 })
    const targetMouseRef = useRef({ x: 0.5, y: 0.5 })
    const prevMouseRef = useRef({ x: 0.5, y: 0.5 })
    const influenceRef = useRef(0)
    const rafRef = useRef<number>(0)
    const lastRippleRef = useRef(0)
    const rippleTimeRef = useRef(-999)
    const RIPPLE_INTERVAL = 0.35

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const gl = canvas.getContext('webgl')
        if (!gl) return

        gl.enable(gl.BLEND)
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

        const vert = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `
        const frag = `
      precision highp float;
      uniform float iTime;
      uniform vec2 iResolution;
      uniform vec2 mousePosition;
      uniform float mouseInfluence;
      uniform float mouseRadius;
      uniform float mouseSpeed;
      uniform float rippleStart;
      uniform vec2 rippleOrigin;
      varying vec2 vUv;
      void main() {
        vec2 px = vUv * iResolution;
        float cellSize = 30.0;
        vec2 mousePx = mousePosition * iResolution;
        float mouseDist = length(px - mousePx);
        float radius = mouseRadius * iResolution.y;
        float hover = mouseInfluence * exp(-mouseDist * mouseDist / (radius * radius));
        float rippleDuration = 4.0;
        float rippleSpeed = 220.0;
        float age = iTime - rippleStart;
        float rippleAlive = step(0.0, age) * step(age, rippleDuration);
        vec2 originPx = rippleOrigin * iResolution;
        float originDist = length(px - originPx);
        float rippleAge = age * rippleSpeed;
        float rippleRing = exp(-pow(originDist - rippleAge, 2.0) / (radius * 0.08));
        float rippleFade = 1.0 - smoothstep(rippleDuration * 0.5, rippleDuration, age);
        float ripple = rippleRing * mouseInfluence * rippleFade * rippleAlive;
        float totalHover = clamp(hover + ripple * 0.6, 0.0, 1.0);
        vec2 cell = fract(px / cellSize);
        float dx = min(cell.x, 1.0 - cell.x) * cellSize;
        float dy = min(cell.y, 1.0 - cell.y) * cellSize;
        float aa = 1.0;
        float baseW = 0.1;
        float glowW = baseW + totalHover / 3.0;
        float lineX = 1.0 - smoothstep(baseW - aa, baseW + aa, dx);
        float lineY = 1.0 - smoothstep(baseW - aa, baseW + aa, dy);
        float grid = max(lineX, lineY);
        float glowX = 1.0 - smoothstep(glowW - aa, glowW + aa * 2.0, dx);
        float glowY = 1.0 - smoothstep(glowW - aa, glowW + aa * 2.0, dy);
        float glowGrid = max(glowX, glowY);
        vec3 baseColor = vec3(0.396, 0.420, 0.420);
        vec3 glowColor = vec3(0.929, 0.945, 0.996);
        vec3 rippleColor = vec3(0.4, 0.55, 1.0);
        vec3 finalColor = mix(baseColor, glowColor, hover * 0.9);
        finalColor = mix(finalColor, rippleColor, ripple * 0.7);
        float baseAlpha = 0.65;
        float finalAlpha = baseAlpha + totalHover * 0.5;
        float lineContrib = grid * finalAlpha;
        float glowContrib = glowGrid * totalHover * 0.4;
        gl_FragColor = vec4(finalColor, lineContrib + glowContrib);
      }
    `
        const compile = (type: number, src: string) => {
            const s = gl.createShader(type)!
            gl.shaderSource(s, src)
            gl.compileShader(s)
            return s
        }
        const program = gl.createProgram()!
        gl.attachShader(program, compile(gl.VERTEX_SHADER, vert))
        gl.attachShader(program, compile(gl.FRAGMENT_SHADER, frag))
        gl.linkProgram(program)
        gl.useProgram(program)

        const buf = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buf)
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 3, -1, -1, 3]),
            gl.STATIC_DRAW,
        )
        const posLoc = gl.getAttribLocation(program, 'position')
        gl.enableVertexAttribArray(posLoc)
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

        const uTime = gl.getUniformLocation(program, 'iTime')
        const uRes = gl.getUniformLocation(program, 'iResolution')
        const uMouse = gl.getUniformLocation(program, 'mousePosition')
        const uInfluence = gl.getUniformLocation(program, 'mouseInfluence')
        const uRadius = gl.getUniformLocation(program, 'mouseRadius')
        const uSpeed = gl.getUniformLocation(program, 'mouseSpeed')
        const uRippleStart = gl.getUniformLocation(program, 'rippleStart')
        const uRippleOrigin = gl.getUniformLocation(program, 'rippleOrigin')

        gl.uniform1f(uRadius, 0.25)
        gl.uniform1f(uSpeed, 0)
        gl.uniform1f(uRippleStart, -999.0)
        gl.uniform2f(uRippleOrigin, 0.5, 0.5)

        const resize = () => {
            const w = canvas.clientWidth * window.devicePixelRatio
            const h = canvas.clientHeight * window.devicePixelRatio
            canvas.width = w
            canvas.height = h
            gl.viewport(0, 0, w, h)
            gl.uniform2f(uRes, w, h)
        }
        resize()
        window.addEventListener('resize', resize)

        const section = canvas.closest('section') as HTMLElement
        const onMove = (e: MouseEvent) => {
            const canvasRect = canvas.getBoundingClientRect()
            targetMouseRef.current = {
                x: (e.clientX - canvasRect.left) / canvasRect.width,
                y: 1.0 - (e.clientY - canvasRect.top) / canvasRect.height,
            }
            influenceRef.current = 1.0
        }
        const onLeave = () => {
            influenceRef.current = 0.0
        }
        const onWindowBlur = () => {
            influenceRef.current = 0.0
        }

        section?.addEventListener('mousemove', onMove)
        section?.addEventListener('mouseleave', onLeave)
        window.addEventListener('blur', onWindowBlur)

        const render = (t: number) => {
            const t_sec = t * 0.001
            gl.uniform1f(uTime, t_sec)
            const lerp = 0.12
            mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * lerp
            mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * lerp
            const sdx = mouseRef.current.x - prevMouseRef.current.x
            const sdy = mouseRef.current.y - prevMouseRef.current.y
            const speed = Math.sqrt(sdx * sdx + sdy * sdy) * 100
            gl.uniform1f(uSpeed, speed)
            prevMouseRef.current = { ...mouseRef.current }
            if (speed > 0.1 && t_sec - lastRippleRef.current > RIPPLE_INTERVAL) {
                lastRippleRef.current = t_sec
                rippleTimeRef.current = t_sec
                gl.uniform1f(uRippleStart, t_sec)
                gl.uniform2f(uRippleOrigin, mouseRef.current.x, mouseRef.current.y)
            }
            const currentInf = gl.getUniform(program, uInfluence!) as number
            const newInf = currentInf + (influenceRef.current - currentInf) * 0.06
            gl.uniform1f(uInfluence, newInf)
            gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y)
            gl.clearColor(0, 0, 0, 0)
            gl.clear(gl.COLOR_BUFFER_BIT)
            gl.drawArrays(gl.TRIANGLES, 0, 3)
            rafRef.current = requestAnimationFrame(render)
        }
        rafRef.current = requestAnimationFrame(render)

        return () => {
            cancelAnimationFrame(rafRef.current)
            window.removeEventListener('resize', resize)
            window.removeEventListener('blur', onWindowBlur)
            section?.removeEventListener('mousemove', onMove)
            section?.removeEventListener('mouseleave', onLeave)
            gl.getExtension('WEBGL_lose_context')?.loseContext()
        }
    }, [])

    // FIX: el lado exterior (borde de pantalla) es opaco, el interior (hacia la tarjeta) se desvanece
    // right: borde derecho opaco → desvanece hacia la izquierda (hacia el centro)
    // left:  borde izquierdo opaco → desvanece hacia la derecha (hacia el centro)
    const combinedMask =
        side === 'right'
            ? `linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%),
               linear-gradient(to left, transparent 0%, black 50%, black 100%)`
            : `linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%),
               linear-gradient(to right, transparent 0%, black 50%, black 100%)`

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
                WebkitMaskImage: combinedMask,
                WebkitMaskComposite: 'source-in',
                maskImage: combinedMask,
                maskComposite: 'intersect',
            }}
            aria-hidden
        />
    )
}

// ── ProjectCard ────────────────────────────────────────────────────────────────
function ProjectCard({
    project,
    visible,
    index,
}: {
    project: Project
    visible: boolean
    index: number
}) {
    const isEven = index % 2 === 1
    return (
        <div
            className="project-card"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible
                    ? 'translateY(0)'
                    : `translateY(${isEven ? '-' : ''}40px)`,
                transition: `opacity 0.75s cubic-bezier(0.25,0.46,0.45,0.94) ${index * 80}ms,
                             transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94) ${index * 80}ms`,
                ['--accent' as string]: project.color,
            }}>
            <div
                className="project-card__accent-line"
                style={{ background: project.color }}
            />
            <div className="project-card__header">
                <span className="project-card__index font-jetbrains">
                    {project.index}
                </span>
                <div className="project-card__meta">
                    <span className="project-card__year font-jetbrains">
                        {project.year}
                    </span>
                    <span
                        className="project-card__status font-jetbrains"
                        style={{
                            color: project.color,
                            borderColor: `${project.color}40`,
                        }}>
                        {project.status}
                    </span>
                </div>
            </div>
            <div className="project-card__body">
                <h3 className="project-card__title font-jetbrains">{project.title}</h3>
                <p className="project-card__subtitle font-firacode">{project.subtitle}</p>
                <p className="project-card__desc font-firacode">{project.description}</p>
            </div>
            <div className="project-card__tags">
                {project.tags.map((tag) => (
                    <span
                        key={tag}
                        className="project-card__tag font-jetbrains">
                        {tag}
                    </span>
                ))}
            </div>
            <div
                className="project-card__glow"
                style={{
                    background: `radial-gradient(ellipse 90% 50% at 50% 110%, ${project.color}22 0%, transparent 70%)`,
                }}
            />
            <div
                className="project-card__glow project-card__glow--hover"
                style={{
                    background: `radial-gradient(ellipse 120% 80% at 50% 105%, ${project.color}55 0%, ${project.color}25 45%, transparent 70%)`,
                }}
            />
        </div>
    )
}

// ── ProjectRow ─────────────────────────────────────────────────────────────────
function ProjectRow({ project, index }: { project: Project; index: number }) {
    const rowRef = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)
    const isEven = index % 2 === 0

    useEffect(() => {
        const el = rowRef.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    obs.disconnect()
                }
            },
            { threshold: 0.2 },
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [])

    return (
        <div
            ref={rowRef}
            className="project-row">
            {isEven ? (
                <>
                    {/* grid ocupa desde el borde izquierdo hasta el centro */}
                    <div className="project-row__grid project-row__grid--right">
                        <GridCanvas side="right" />
                    </div>
                    <div className="project-row__void" />
                    <div className="project-row__card">
                        <ProjectCard
                            project={project}
                            visible={visible}
                            index={index}
                        />
                    </div>
                </>
            ) : (
                <>
                    <div className="project-row__card">
                        <ProjectCard
                            project={project}
                            visible={visible}
                            index={index}
                        />
                    </div>
                    <div className="project-row__void" />
                    {/* grid ocupa desde el centro hasta el borde derecho */}
                    <div className="project-row__grid project-row__grid--left">
                        <GridCanvas side="left" />
                    </div>
                </>
            )}
        </div>
    )
}

// ── SectionTitle ───────────────────────────────────────────────────────────────
function SectionTitle() {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setVisible(true)
                    obs.disconnect()
                }
            },
            { threshold: 0.5 },
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [])

    return (
        <div
            ref={ref}
            className="projects-header">
            <span
                className="projects-header__badge font-jetbrains"
                style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                    transition: 'opacity 0.6s ease 0ms, transform 0.6s ease 0ms',
                }}></span>
            <h2
                className="projects-header__title font-jetbrains"
                style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateX(0)' : 'translateX(-50px)',
                    transition:
                        'opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) 100ms, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) 100ms',
                }}>
                Proyectos
            </h2>
            <p
                className="projects-header__sub font-firacode"
                style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(16px)',
                    transition: 'opacity 0.6s ease 220ms, transform 0.6s ease 220ms',
                }}>
                Sistemas construidos con propósito, arquitectura y precisión.
            </p>
        </div>
    )
}

// ── Projects (main) ────────────────────────────────────────────────────────────
export default function Projects() {
    return (
        <>
            <style>{`
        /* ── Section ── */
        .projects-section {
          position: relative;
          width: 100%;
          background: #080808;
          padding: 5rem 0 6rem;
          overflow: hidden;
        }
        .projects-section::before {
          content: '';
          position: absolute;
          inset-x: 0; top: 0;
          height: 5rem;
          background: linear-gradient(to bottom, #080808, transparent);
          z-index: 5;
          pointer-events: none;
        }
        .projects-section::after {
          content: '';
          position: absolute;
          inset-x: 0; bottom: 0;
          height: 5rem;
          background: linear-gradient(to top, #080808, transparent);
          z-index: 5;
          pointer-events: none;
        }

        /* ── Header ── */
        .projects-header {
          position: relative;
          z-index: 10;
          max-width: 960px;
          margin: 0 auto 4rem;
          padding: 0 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .projects-header__badge {
          font-size: 0.65rem;
          color: #4260c5;
          letter-spacing: 0.08em;
          text-transform: lowercase;
          display: block;
        }
        .projects-header__title {
          font-size: clamp(2rem, 5vw, 3.25rem);
          font-weight: 700;
          color: #fff;
          margin: 0;
          line-height: 1.05;
        }
        .projects-header__sub {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.35);
          margin: 0;
        }

        /* ── Row layout ──
           La fila ocupa el 100% del ancho de la sección (sin max-width ni padding).
           El grid canvas se extiende hasta el borde real de la pantalla.
        ── */
        .project-row {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 5% minmax(280px, 520px);
          align-items: center;
          min-height: 340px;
          margin-bottom: 2.5rem;
          width: 100%;
          /* Sin padding horizontal — el grid toca el borde */
        }
        /* Filas impares: tarjeta a la izquierda, grid a la derecha */
        .project-row:nth-child(even) {
          grid-template-columns: minmax(280px, 520px) 5% 1fr;
        }

        .project-row__grid {
          position: relative;
          height: 100%;
          min-height: 340px;
          align-self: stretch;
        }
        .project-row__void {
          /* gap entre grid y tarjeta */
        }

        /* La tarjeta tiene su propio padding interno */
        .project-row__card {
          position: relative;
          z-index: 10;
          padding: 0 2rem;
        }
        /* En filas pares la tarjeta está a la derecha: padding solo a la derecha */
        .project-row:nth-child(odd) .project-row__card {
          padding-left: 0;
          padding-right: 3rem;
        }
        /* En filas impares la tarjeta está a la izquierda: padding solo a la izquierda */
        .project-row:nth-child(even) .project-row__card {
          padding-left: 3rem;
          padding-right: 0;
        }

        /* ── Project Card ── */
        .project-card {
          position: relative;
          background: #090909;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 18px;
          padding: 2rem 2rem 1.75rem;
          overflow: hidden;
          cursor: default;
          transition:
            transform 0.4s cubic-bezier(0.34,1.56,0.64,1),
            box-shadow 0.4s ease,
            border-color 0.3s ease;
        }
        .project-card:hover {
          transform: translateY(-8px) scale(1.012);
          box-shadow: 0 28px 56px rgba(0,0,0,0.55);
          border-color: rgba(255,255,255,0.09);
        }
        .project-card:hover .project-card__glow--hover {
          opacity: 0.22;
        }
        .project-card__accent-line {
          position: absolute;
          top: 0; left: 1.5rem; right: 1.5rem;
          height: 1px;
          border-radius: 1px;
          opacity: 0.7;
        }
        .project-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 18px;
          background-image:
            linear-gradient(rgba(255,255,255,0.012) 1.2px, transparent 1.2px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1.2px, transparent 1.2px);
          background-size: 50px 50px;
          pointer-events: none;
        }
        .project-card__header {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.1rem;
        }
        .project-card__index {
          font-size: 0.65rem;
          color: rgba(255,255,255,0.18);
          letter-spacing: 0.1em;
        }
        .project-card__meta {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .project-card__year {
          font-size: 0.6rem;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.08em;
        }
        .project-card__status {
          font-size: 0.55rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.2rem 0.55rem;
          border-radius: 999px;
          border: 1px solid;
          background: transparent;
        }
        .project-card__body {
          position: relative;
          z-index: 2;
          margin-bottom: 1.25rem;
        }
        .project-card__title {
          font-size: 1.15rem;
          font-weight: 600;
          color: #fff;
          margin: 0 0 0.2rem;
          line-height: 1.25;
        }
        .project-card__subtitle {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.35);
          margin: 0 0 0.9rem;
        }
        .project-card__desc {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.45);
          line-height: 1.65;
          margin: 0;
        }
        .project-card__tags {
          position: relative;
          z-index: 2;
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .project-card__tag {
          font-size: 0.58rem;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.3);
          padding: 0.2rem 0.55rem;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 4px;
          background: rgba(255,255,255,0.02);
          text-transform: uppercase;
          transition: color 0.2s ease, border-color 0.2s ease;
        }
        .project-card:hover .project-card__tag {
          color: rgba(255,255,255,0.45);
          border-color: rgba(255,255,255,0.13);
        }
        .project-card__glow {
          position: absolute;
          inset: 0;
          border-radius: 18px;
          pointer-events: none;
          z-index: 0;
        }
        .project-card__glow--hover {
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .project-row,
          .project-row:nth-child(even) {
            grid-template-columns: 1fr;
          }
          .project-row__grid {
            display: none;
          }
          .project-row__void {
            display: none;
          }
          .project-row:nth-child(odd) .project-row__card,
          .project-row:nth-child(even) .project-row__card {
            padding: 0 1rem;
          }
          .projects-header {
            padding: 0 1rem;
          }
        }
      `}</style>
            <section className="projects-section">
                <SectionTitle />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    {PROJECTS.map((project, i) => (
                        <ProjectRow
                            key={project.id}
                            project={project}
                            index={i}
                        />
                    ))}
                </div>
            </section>
        </>
    )
}
