export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <div className="flex gap-6 text-sm text-zinc-300">
          <a href="#certifications" className="hover:text-white"> Certifications</a>
          <a href="#projects" className="hover:text-white">Projects</a>
          <a href="#stack" className="hover:text-white">Stack</a>
          <a href="#about-me" className="hover:text-white">About me</a>
        </div>
      </div>
    </nav>
  );
}
