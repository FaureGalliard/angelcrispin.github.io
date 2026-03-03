"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { heroCard, heroContainer, heroItem, dotVariants, pulse } from "@/lib/motion/hero";
// ── Hook: mouse shine + intro sweep ───────────────────────────────────────────
function useMouseShine(sectionRef: React.RefObject<HTMLElement | null>) {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const h2Ref = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);
  const currentX = useRef(50);
  const targetX = useRef(50);
  const opacity = useRef(0);
  const targetOpacity = useRef(0);
  const sweeping = useRef(false);
  const sweepX = useRef(0);
  const sweepSpeed = 1.8;
  // Intro sweep state
  const introActive = useRef(false);
  const introX = useRef(-20); // empieza fuera del borde izquierdo
  const introSpeed = 1.4; // un poco más lento = más elegante
  const introDone = useRef(false);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const clearGradients = () => {
      if (h1Ref.current) h1Ref.current.style.backgroundImage =
        "linear-gradient(105deg, white 0%, white 100%)";
      if (h2Ref.current) h2Ref.current.style.backgroundImage =
        "linear-gradient(105deg, #4260c5 0%, #4260c5 100%)";
    };
    const setGradients = (x: number, o: number) => {
      const h1Style = `linear-gradient(
        105deg,
        white 0%,
        white ${x - 20}%,
        rgba(237,241,254,${o}) ${x - 8}%,
        rgba(255,255,255,${o}) ${x}%,
        rgba(180,200,255,${o * 0.9}) ${x + 5}%,
        white ${x + 16}%,
        white 100%
      )`;
      const h2Style = `linear-gradient(
        105deg,
        #4260c5 0%,
        #4260c5 ${x - 20}%,
        rgba(122,159,255,${o}) ${x - 4}%,
        rgba(200,216,255,${o}) ${x}%,
        rgba(122,159,255,${o}) ${x + 7}%,
        #4260c5 ${x + 20}%,
        #4260c5 100%
      )`;
      if (h1Ref.current) h1Ref.current.style.backgroundImage = h1Style;
      if (h2Ref.current) h2Ref.current.style.backgroundImage = h2Style;
    };
    const resetState = () => {
      sweeping.current = false;
      sweepX.current = 0;
      introActive.current = false;
      currentX.current = 50;
      targetX.current = 50;
      opacity.current = 0;
      targetOpacity.current = 0;
      clearGradients();
    };
    // Opacidad del intro: fade-in al entrar, fade-out al acercarse al borde derecho
    const introOpacity = (x: number) => {
      if (x < 10) return x / 10; // sube de 0→1 en los primeros 10%
      if (x < 85) return 1; // plena entre 10% y 85%
      return 1 - (x - 85) / 35; // baja de 1→0 entre 85% y 120%
    };
    const applyShine = () => {
      // ── INTRO SWEEP ──────────────────────────────────────────────────────
      if (introActive.current) {
        introX.current = Math.min(introX.current + introSpeed, 120);
        const x = introX.current;
        const o = Math.max(0, introOpacity(x));
        setGradients(x, o);
        if (x >= 120) {
          introActive.current = false;
          introDone.current = true;
          opacity.current = 0;
          clearGradients();
        }
        rafRef.current = requestAnimationFrame(applyShine);
        return;
      }
      // ── EXIT SWEEP ────────────────────────────────────────────────────────
      if (sweeping.current) {
        sweepX.current = Math.min(sweepX.current + sweepSpeed, 120);
        const x = sweepX.current;
        const sweepOpacity = 1 - Math.max(0, (x - 80) / 40);
        setGradients(x, sweepOpacity);
        if (sweepX.current >= 120) {
          sweeping.current = false;
          opacity.current = 0;
          clearGradients();
        }
      } else {
        // ── MOUSE FOLLOW ────────────────────────────────────────────────────
        currentX.current += (targetX.current - currentX.current) * 0.08;
        opacity.current += (targetOpacity.current - opacity.current) * 0.06;
        if (opacity.current < 0.01 && targetOpacity.current === 0) {
          clearGradients();
        } else {
          setGradients(currentX.current, opacity.current);
        }
      }
      rafRef.current = requestAnimationFrame(applyShine);
    };
    // Lanza el intro después de que el card termine su animación de entrada (~700 ms)
    const introDelay = setTimeout(() => {
      if (!introDone.current) {
        introX.current = -20;
        introActive.current = true;
      }
    }, 700);
    rafRef.current = requestAnimationFrame(applyShine);
    const onMove = (e: MouseEvent) => {
      // Si el intro aún corre, interrumpirlo y ceder el control al mouse
      if (introActive.current) {
        introActive.current = false;
        introDone.current = true;
      }
      sweeping.current = false;
      targetOpacity.current = 1;
      const rect = section.getBoundingClientRect();
      targetX.current = ((e.clientX - rect.left) / rect.width) * 100;
    };
    const onLeave = () => {
      if (introActive.current) return; // no interferir con el intro
      sweeping.current = true;
      sweepX.current = currentX.current;
      targetOpacity.current = 0;
    };
    const onWindowBlur = () => resetState();
    const onVisibilityChange = () => { if (document.hidden) resetState(); };
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onWindowBlur);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      clearTimeout(introDelay);
      cancelAnimationFrame(rafRef.current);
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onWindowBlur);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [sectionRef]);
  return { h1Ref, h2Ref };
}
// ── GridBackground ─────────────────────────────────────────────────────────────
function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  const prevMouseRef = useRef({ x: 0.5, y: 0.5 });
  const influenceRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastRippleRef = useRef(0);
  const rippleTimeRef = useRef(-999);
  const ripplePosRef = useRef({ x: 0.5, y: 0.5 });
  const RIPPLE_INTERVAL = 0.35;
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
    `;
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
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
    const uTime = gl.getUniformLocation(program, "iTime");
    const uRes = gl.getUniformLocation(program, "iResolution");
    const uMouse = gl.getUniformLocation(program, "mousePosition");
    const uInfluence = gl.getUniformLocation(program, "mouseInfluence");
    const uRadius = gl.getUniformLocation(program, "mouseRadius");
    const uSpeed = gl.getUniformLocation(program, "mouseSpeed");
    const uRippleStart = gl.getUniformLocation(program, "rippleStart");
    const uRippleOrigin = gl.getUniformLocation(program, "rippleOrigin");
    gl.uniform1f(uRadius, 0.25);
    gl.uniform1f(uSpeed, 0);
    gl.uniform1f(uRippleStart, -999.0);
    gl.uniform2f(uRippleOrigin, 0.5, 0.5);
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
    const onWindowBlur = () => { influenceRef.current = 0.0; };
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onWindowBlur);
    const render = (t: number) => {
      const t_sec = t * 0.001;
      gl.uniform1f(uTime, t_sec);
      const lerp = 0.12;
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * lerp;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * lerp;
      const sdx = mouseRef.current.x - prevMouseRef.current.x;
      const sdy = mouseRef.current.y - prevMouseRef.current.y;
      const speed = Math.sqrt(sdx * sdx + sdy * sdy) * 100;
      gl.uniform1f(uSpeed, speed);
      prevMouseRef.current = { ...mouseRef.current };
      if (speed > 0.1 && t_sec - lastRippleRef.current > RIPPLE_INTERVAL) {
        lastRippleRef.current = t_sec;
        rippleTimeRef.current = t_sec;
        ripplePosRef.current = { ...mouseRef.current };
        gl.uniform1f(uRippleStart, t_sec);
        gl.uniform2f(uRippleOrigin, mouseRef.current.x, mouseRef.current.y);
      }
      const currentInf = gl.getUniform(program, uInfluence!) as number;
      const newInf = currentInf + (influenceRef.current - currentInf) * 0.06;
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
      window.removeEventListener("blur", onWindowBlur);
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
      }}
      aria-hidden
    />
  );
}
// ── HeroContent ────────────────────────────────────────────────────────────────
function HeroContent({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const { h1Ref, h2Ref } = useMouseShine(sectionRef);
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
          <motion.h1
            ref={h1Ref}
            variants={heroItem}
            className="font-jetbrains text-[2.6rem] font-bold text-left"
            style={{
              backgroundImage: "linear-gradient(105deg, white 0%, white 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            Angel Crispin
          </motion.h1>
          <motion.h2 variants={heroItem} className="text-[1rem] text-left font-bold">
            <span
              ref={h2Ref}
              className="font-jetbrains"
              style={{
                backgroundImage: "linear-gradient(105deg, #4260c5 0%, #4260c5 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                display: "inline-block",
              }}
            >
              Software Developer &lt; / &gt;
            </span>
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
  const sectionRef = useRef<HTMLElement | null>(null);
  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen  bg-[#080808]"
    >
      <GridBackground />
      <HeroContent sectionRef={sectionRef} />
      
    </section>
  );
}