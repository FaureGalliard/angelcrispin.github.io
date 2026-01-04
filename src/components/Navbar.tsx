export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <span className="font-bold text-lg">angelcrispin.dev</span>

        <div className="flex gap-6 text-sm text-zinc-300">
          <a href="#about" className="hover:text-white">Sobre mí</a>
          <a href="#projects" className="hover:text-white">Proyectos</a>
          <a href="#stack" className="hover:text-white">Stack</a>
          <a href="#contact" className="hover:text-white">Contacto</a>
        </div>
      </div>
    </nav>
  );
}
