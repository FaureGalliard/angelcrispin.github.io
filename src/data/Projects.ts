// ─── Types ──────────────────────────────────────────────────────────────────
export interface Video        { url: string; label: string; }
export interface Gesture      { key: string; label: string; color: string; }
export interface PipelineStep { icon: string; label: string; sub: string; }
export interface FeatureGroup { icon: string; label: string; color: string; items: string[]; }
export interface Project {
  slug:          string;
  title:         string;
  description:   string;
  tech:          string[];
  type:          string;
  github:        string | null;
  highlights:    string[];
  gestures:      Gesture[];
  pipeline:      PipelineStep[];
  featureGroups: FeatureGroup[];
  videos:        Video[];
}

// ─── Data ────────────────────────────────────────────────────────────────────
export const projects: Project[] = [
  {
    slug: "grama",
    title: "GRAMA",
    description:
      "Full-stack LMS built from scratch for Industrias Roland Print S.A.C. — a teacher training platform serving multiple institutions. Designed the entire system: multi-role auth, course hierarchy with sequential gatekeeping, automated grading engine via PostgreSQL triggers, a RAG chatbot with semantic search, materialized analytics views, and a structured resource repository for IoT equipment.",
    tech: ["Next.js 16", "TypeScript", "Supabase", "PostgreSQL", "pgvector", "React Query", "Tailwind CSS 4", "Vercel", "Cloudflare", "PostHog", "Resend"],
    type: "platform",
    github: null,
    highlights: [],
    gestures: [],
    pipeline: [],
    featureGroups: [
      {
        icon: "🏗️",
        label: "Full-Stack Architecture",
        color: "#60a5fa",
        items: [
          "Multi-role system: Admin, Director, Teacher — Zero Trust model",
          "Feature-Sliced Design with actor-based Bounded Contexts",
          "Server Components for reads + React Query mutations for interactions",
          "Vercel Edge Config for real-time maintenance mode toggle",
          "Cloudflare DNS proxy + Full Strict SSL + edge caching for landing",
        ],
      },
      {
        icon: "📚",
        label: "LMS & Progression Engine",
        color: "#4ade80",
        items: [
          "Hierarchy: Course → Module → Lesson → Item (6 content types)",
          "Sequential gatekeeping: lesson N locked until N-1 is completed",
          "Automated grading via PostgreSQL triggers (20% continuous / 80% final)",
          "Ponderación por módulo con weight_percentage, suma 100 por curso",
          "next_lesson_to_take pointer updated automatically on progress",
        ],
      },
      {
        icon: "🤖",
        label: "Expert Chatbot (RAG)",
        color: "#c084fc",
        items: [
          "Walled Garden architecture — no hallucination, no internet access",
          "Semantic search with pgvector (3072-dim embeddings, HNSW index)",
          "User context injected into system prompt at request time",
          "Per-user daily rate limiting via SECURITY DEFINER function",
        ],
      },
      {
        icon: "📊",
        label: "Analytics & Infra",
        color: "#fb923c",
        items: [
          "Materialized views: institution_analytics + friction_points (dropout rates)",
          "PostHog for behavioral analytics and session recording",
          "Daily automated backups via GitHub Actions",
          "Supabase Storage with 30-day cache headers for immutable assets",
        ],
      },
    ],
    videos: [],
  },
  {
    slug: "save-the-valley",
    title: "Save the Valley",
    description:
      "2D sandbox game built from scratch in C++ with a custom engine architecture. Features infinite procedural world generation, multi-weapon combat system, enemy AI with state machines, and optimized chunk-based rendering — all without a game engine.",
    tech: ["C++17", "SFML 2.6", "CMake", "Simplex Noise"],
    type: "game",
    github: "https://github.com/FaureGalliard/SFML-2D-GAME",
    featureGroups: [
      {
        icon: "🌍",
        label: "Procedural World",
        color: "#4ade80",
        items: [
          "Infinite chunks with dynamic load/unload",
          "Multiple biomes with unique terrain generation",
          "Autotiling for smooth transitions between tile types",
          "Collidable objects: trees, rocks, structures",
        ],
      },
      {
        icon: "⚔️",
        label: "Combat System",
        color: "#f87171",
        items: [
          "Sword, axe and hammer with dynamic hitboxes",
          "Health, damage and temporary invulnerability frames",
          "Attack, damage and death animations",
        ],
      },
      {
        icon: "🤖",
        label: "Enemy AI",
        color: "#fb923c",
        items: [
          "State machine: Idle → Wandering → Hunting",
          "Player detection by range",
          "Pursuit with obstacle avoidance",
        ],
      },
      {
        icon: "🎨",
        label: "Rendering",
        color: "#818cf8",
        items: [
          "Chunk-based rendering (only visible chunks drawn)",
          "Layered: terrain / objects / entities",
          "Smooth camera + collision debug mode",
        ],
      },
    ],
    highlights: [],
    gestures: [],
    pipeline: [],
    videos: [
      { url: "https://res.cloudinary.com/doq5qdh7g/video/upload/v1771550483/WorldGeneration_ec6tqz.mov", label: "World Gen" },
      { url: "https://res.cloudinary.com/doq5qdh7g/video/upload/v1771550482/CombatSystem_bxf0de.mov", label: "Combat" },
    ],
  },
  {
    slug: "gesturekey",
    title: "GestureKey",
    description:
      "Real-time hand gesture detection system that translates webcam input into OS-level keyboard shortcuts. Clean layered architecture with an integrated ML pipeline — from raw camera frames to system actions, running as a background tray app.",
    highlights: [
      "Modular pipeline: Camera → Tracker → Classifier → Gesture Engine",
      "Random Forest model trained on 21 anatomical hand landmarks",
      "8 distinct gestures: scroll, volume, zoom, screenshot, task view and more",
      "Temporal stabilizer that eliminates noisy frame-by-frame predictions",
      "PyQt6 system tray app — runs silently in the background",
    ],
    tech: ["Python", "OpenCV", "MediaPipe", "Scikit-learn", "PyQt6"],
    type: "ml",
    github: "https://github.com/FaureGalliard/GestureKey",
    featureGroups: [],
    pipeline: [
      { icon: "📷", label: "Capture", sub: "OpenCV" },
      { icon: "🖐", label: "Landmarks", sub: "MediaPipe" },
      { icon: "🧠", label: "Classify", sub: "Random Forest" },
      { icon: "⚡", label: "Action", sub: "Gesture Engine" },
    ],
    gestures: [
      { key: "TWO_FINGERS",   label: "Scroll",     color: "#50dc8a" },
      { key: "THREE_FINGERS", label: "Volume",     color: "#50c8dc" },
      { key: "PINCH",         label: "Zoom",       color: "#a078dc" },
      { key: "PALM→FIST",     label: "Pause",      color: "#dc8c50" },
      { key: "PALM×2",        label: "Task View",  color: "#dc5078" },
    ],
    videos: [
      { url: "https://res.cloudinary.com/doq5qdh7g/video/upload/v1771550474/Scroll_bkjocl.mov",        label: "Scroll" },
      { url: "https://res.cloudinary.com/doq5qdh7g/video/upload/v1771550473/Volume_tozkwu.mov",        label: "Volume" },
      { url: "https://res.cloudinary.com/doq5qdh7g/video/upload/v1771550472/task_view_ghj9qr.mov",    label: "Task View" },
      { url: "https://res.cloudinary.com/doq5qdh7g/video/upload/v1771550471/Pause_u8vjtl.mp4",        label: "Pause" },
      { url: "https://res.cloudinary.com/doq5qdh7g/video/upload/v1771550851/trayapp_dwqkxm.mp4",      label: "Tray App" },
    ],
  },
  {
    slug: "vocal-teleprompter",
    title: "Vocal Teleprompter",
    description:
      "Desktop app that listens to the speaker in real time and scrolls the script automatically to match. Built with Tauri (Rust + React) — lightweight native binary with a web-based UI. Uses the Web Speech API with fuzzy word matching to track position in the text.",
    highlights: [
      "Real-time speech recognition via Web Speech API",
      "Fuzzy word matching — tolerant to mispronunciations and variations",
      "Word-level highlighting with smooth auto-scroll",
      "Multilanguage support and microphone selection",
      "Tauri desktop app: native binary, no Electron overhead",
    ],
    tech: ["Tauri", "React", "TypeScript", "Rust", "Web Speech API", "Tailwind CSS"],
    type: "desktop",
    github: "https://github.com/FaureGalliard/vocal-teleprompter",
    featureGroups: [],
    pipeline: [],
    gestures: [],
    videos: [],
  },
];
