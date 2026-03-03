import { BriefcaseBusiness, Globe, User } from "lucide-react";

const kpiItems = [
  {
    number: "100",
    unit: "million",
    description: "dollars in client revenue driven by our tailored solutions and strategies.",
    icon: <Globe size={18} />,
  },
  {
    number: "700",
    unit: "thousand",
    description: "unique visitors engaging with the websites we build every month.",
    icon: <User size={18} />,
  },
  {
    number: "100",
    unit: "projects",
    description: "successfully delivered across multiple industries.",
    icon: <BriefcaseBusiness size={18} />,
  },
];

export default function KpiSection() {
  return (
  <section className="w-full bg-[#010101] py-24 px-12">
  <div className="max-w-5xl mx-auto flex flex-col gap-14">

    {/* Header */}
    <div className="flex flex-col items-center gap-3 text-center">
      <div
        className="font-jetbrains inline-flex items-center px-3 py-1 rounded-full text-xs mb-4 border"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          borderColor: "#6B7280",
          color: "#9CA3AF",
        }}
      >
        Key Performance Indicators
      </div>

      {/* Título reducido */}
      <h1 className="font-jetbrains text-3xl md:text-4xl font-bold text-white leading-tight">
        Numbers That Just Make Sense
      </h1>

      <p className="font-jetbrains text-sm text-white/40">
        Relentlessly KPI-Driven, Driving Measurable Results.
      </p>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-3 gap-8">
      {kpiItems.map((item, i) => (
        <div
          key={i}
          className="relative flex items-center justify-center overflow-hidden rounded-3xl border border-[#151515] bg-[#090909] p-12 transition-colors hover:bg-white/[0.04]"
          style={{ minHeight: "300px" }}
        >
          {/* Grid decorativo ligeramente más grueso */}
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.04) 1.2px, transparent 1.2px), linear-gradient(90deg, rgba(255,255,255,0.04) 1.2px, transparent 1.2px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Contenido centrado */}
          <div className="relative z-10 flex flex-col items-center text-center gap-1">

            {/* Number */}
            <div className="relative">
              <span className="block text-7xl font-semibold text-white leading-none">
                {item.number}
              </span>

              {/* Fade fuerte pero no extremo */}
              <div
                className="absolute inset-x-0 bottom-0 pointer-events-none"
                style={{
                  height: "95%",
                  background:
                    "linear-gradient(to bottom, transparent 0%, rgba(1,1,1,0.9) 80%, #010101 100%)",
                }}
              />
            </div>

            {/* Unit */}
            <p className="font-firacode text-lg font-semibold uppercase text-white -mt-3 leading-none">
              {item.unit}
            </p>

            {/* Description */}
            <p className="font-jetbrains text-xs text-white/40 leading-tight max-w-[220px]">
              {item.description}
            </p>
          </div>

          {/* Icon */}
          <div className="absolute bottom-6 left-6 z-10 flex items-center justify-center w-9 h-9 rounded-lg border border-white/[0.08] bg-white/[0.04] text-white/60">
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
  );
}