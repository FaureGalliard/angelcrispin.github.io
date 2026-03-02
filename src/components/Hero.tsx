"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { heroCard, heroContainer, heroItem, dotVariants, pulse } from "@/lib/motion/hero";

// ── GridBackground con WebGL ───────────────────────────────────────────────────
function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  const influenceRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const vert = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const frag = `
  precision highp float;
  uniform float iTime;
  uniform vec2 iResolution;
  uniform vec2 mousePosition;
  uniform float mouseInfluence;
  uniform float mouseRadius;
  varying vec2 vUv;

  void main() {
    vec2 px = vUv * iResolution;
    float cellSize = 25.0;

    vec2 mousePx = mousePosition * iResolution;
    float mouseDist = length(px - mousePx);
    float radius = mouseRadius * iResolution.y;
    float hover = mouseInfluence * exp(-mouseDist * mouseDist / (radius * radius));

    vec2 cell = fract(px / cellSize);
    float dx = min(cell.x, 1.0 - cell.x) * cellSize;
    float dy = min(cell.y, 1.0 - cell.y) * cellSize;

    // Línea base de 1px dura, como el CSS original
    float aa = 1.0;
    float baseW = 0.1;
    float glowW = baseW + hover/3.0;

    float lineX = 1.0 - smoothstep(baseW - aa, baseW + aa, dx);
    float lineY = 1.0 - smoothstep(baseW - aa, baseW + aa, dy);
    float grid = max(lineX, lineY);

    // Glow extra: halo más ancho solo al hover
    float glowX = 1.0 - smoothstep(glowW - aa, glowW + aa * 2.0, dx);
    float glowY = 1.0 - smoothstep(glowW - aa, glowW + aa * 2.0, dy);
    float glowGrid = max(glowX, glowY);

    vec3 baseColor = vec3(0.396, 0.420, 0.420);
    vec3 glowColor = vec3(0.929, 0.945, 0.996); // #EDF1FE

    // Color y alpha: línea base siempre visible, glow encima al hover
    vec3 finalColor = mix(baseColor, glowColor, hover * 0.9);
    float baseAlpha = 0.65;
    float finalAlpha = baseAlpha + hover * 0.5;

    float lineContrib = grid * finalAlpha;
    float glowContrib = glowGrid * hover * 0.4;

    gl_FragColor = vec4(finalColor, lineContrib + glowContrib);
  }
`;

    // Compilar shaders
    const compileShader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, compileShader(gl.VERTEX_SHADER, vert));
    gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(program);
    gl.useProgram(program);

    // Quad fullscreen
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uTime = gl.getUniformLocation(program, "iTime");
    const uRes = gl.getUniformLocation(program, "iResolution");
    const uMouse = gl.getUniformLocation(program, "mousePosition");
    const uInfluence = gl.getUniformLocation(program, "mouseInfluence");
    const uRadius = gl.getUniformLocation(program, "mouseRadius");

    gl.uniform1f(uRadius, 0.25);

    // Resize
    const resize = () => {
      const w = canvas.clientWidth * window.devicePixelRatio;
      const h = canvas.clientHeight * window.devicePixelRatio;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse
    const section = canvas.parentElement!;
    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      targetMouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: 1.0 - (e.clientY - rect.top) / rect.height,
      };
      influenceRef.current = 1.0;
    };
    const onLeave = () => { influenceRef.current = 0.0; };
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);

    // Render loop
    const render = (t: number) => {
      gl.uniform1f(uTime, t * 0.001);

      const lerp = 0.12;
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * lerp;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * lerp;

      const prog = gl.getUniform(program, uInfluence!) as number;
      const newInf = prog + (influenceRef.current - prog) * 0.06;
      gl.uniform1f(uInfluence, newInf);
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
  <>
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
       style={{
      WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
      maskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
    }}
      aria-hidden
    />
    
  </>
);
}

// ── HeroContent ────────────────────────────────────────────────────────────────
function HeroContent() {
  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
      <motion.div
        variants={heroCard}
        initial="hidden"
        animate="show"
        className="max-w-3xl w-full rounded-2xl border border-white/10 p-10 backdrop-blur-md"
        style={{ backgroundColor: "rgba(13,14,15,0.9)" }}
      >
        <motion.div variants={heroContainer} initial="hidden" animate="show">
          <motion.div
            className="flex items-center gap-2 mb-4"
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.div variants={dotVariants} animate={pulse.animate} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "rgba(108,219,149,1)" }} />
            <motion.div variants={dotVariants} animate={pulse.animate} transition={{ delay: 0.2 }} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "rgba(248,218,99,1)" }} />
            <motion.div variants={dotVariants} animate={pulse.animate} transition={{ delay: 0.4 }} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "rgba(228,111,111,1)" }} />
          </motion.div>

          <motion.h1 variants={heroItem} className="font-jetbrains text-[2.6rem] font-bold text-white text-left">
            Angel Crispin
          </motion.h1>
          <motion.h2 variants={heroItem} className="text-[1rem] text-left font-bold">
            <span className="font-jetbrains text-[#4260c5]">Software Developer &lt; / &gt;</span>
          </motion.h2>
          <motion.p variants={heroItem} className="font-firacode mt-4 max-w-xl text-left text-sm leading-relaxed text-gray-300">
            Desarrollo sistemas y aplicaciones con enfoque en lógica, arquitectura y eficiencia.
          </motion.p>

          <motion.div variants={heroItem} className="mt-6 flex justify-start gap-5 text-gray-400">
            <motion.a href="https://github.com/angelcrispin" target="_blank" rel="noopener noreferrer" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className="hover:text-white transition-colors">
              <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
            </motion.a>
            <motion.a href="https://www.linkedin.com/in/angelcrispin" target="_blank" rel="noopener noreferrer" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className="hover:text-[#0A66C2] transition-colors">
              <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
            </motion.a>
            <motion.a href="mailto:angelcrispin@gmail.com" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className="hover:text-red-400 transition-colors">
              <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6" />
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[rgba(16,17,17,1)]">
      <GridBackground />
      <HeroContent />
    </section>
  );
}