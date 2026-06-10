'use client'
import React, {useState} from 'react';
// ─── Types ──────────────────────────────────────────────────────────────────
export interface Video        { url: string; label: string; }
export interface Gesture      { key: string; label: string; color: string; }
export interface PipelineStep { icon: string; label: string; sub: string; }
export interface FeatureGroup { icon: string; label: string; color: string; items: string[]; }
export interface Project {
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
    title: "Save the Valley",
    description:
      "Juego sandbox 2D desarrollado desde cero en C++ con arquitectura propia tipo engine. Mundo infinito procedural, combate con múltiples armas, IA con máquina de estados y renderizado optimizado por chunks.",
    tech: ["C++17", "SFML 2.6", "CMake", "Simplex Noise"],
    type: "game",
    github: "https://github.com/FaureGalliard/SFML-2D-GAME",
    featureGroups: [
      {
        icon: "🌍",
        label: "Mundo Procedural",
        color: "#4ade80",
        items: [
          "Chunks infinitos con carga/descarga dinámica",
          "Múltiples biomas con terrenos únicos",
          "Autotiling para transiciones suaves entre tiles",
          "Objetos con colisión (árboles, rocas, estructuras)",
        ],
      },
      {
        icon: "⚔️",
        label: "Combate",
        color: "#f87171",
        items: [
          "Espada, hacha y martillo con hitboxes dinámicas",
          "Daño, salud e invulnerabilidad temporal",
          "Animaciones de ataque, daño y muerte",
        ],
      },
      {
        icon: "🤖",
        label: "IA de Enemigos",
        color: "#fb923c",
        items: [
          "Estados: Idle → Wandering → Hunting",
          "Detección de jugador por rango",
          "Persecución con evasión de obstáculos",
        ],
      },
      {
        icon: "🎨",
        label: "Renderizado",
        color: "#818cf8",
        items: [
          "Renderizado por chunks visibles (optimizado)",
          "Capas: terreno / objetos / entidades",
          "Cámara suave + modo debug de colisiones",
        ],
      },
    ],
    highlights: [],
    gestures: [],
    pipeline: [],
    videos: [
      { url: "https://res.cloudinary.com/doq5qdh7g/video/upload/v1771550483/WorldGeneration_ec6tqz.mov", label: "World Gen" },
      { url: "https://res.cloudinary.com/doq5qdh7g/video/upload/v1771550482/CombatSystem_bxf0de.mov", label: "Combate" },
    ],
  },
  {
    title: "GestureKey",
    description:
      "Sistema de detección de gestos de mano en tiempo real que traduce movimientos en atajos de teclado del sistema operativo. Arquitectura limpia por capas con ML integrado.",
    highlights: [
      "Pipeline modular: Cámara → Tracker → Clasificador → Motor de gestos",
      "Modelo Random Forest entrenado sobre 21 landmarks anatómicos",
      "8 gestos distintos: scroll, volumen, zoom, screenshot, task view y más",
      "Estabilizador temporal que elimina predicciones ruidosas",
      "Aplicación de bandeja del sistema con PyQt6, corre en background",
    ],
    tech: ["Python", "OpenCV", "MediaPipe", "Scikit-learn", "PyQt6"],
    type: "ml",
    github: "https://github.com/FaureGalliard/GestureKey",
    featureGroups: [],
    pipeline: [
      { icon: "📷", label: "Captura", sub: "OpenCV" },
      { icon: "🖐", label: "Landmarks", sub: "MediaPipe" },
      { icon: "🧠", label: "Clasifica", sub: "Random Forest" },
      { icon: "⚡", label: "Acción", sub: "Gesture Engine" },
    ],
    gestures: [
      { key: "TWO_FINGERS",   label: "Scroll",     color: "#50dc8a" },
      { key: "THREE_FINGERS", label: "Volumen",    color: "#50c8dc" },
      { key: "PINCH",         label: "Zoom",       color: "#a078dc" },
      { key: "PALM→FIST",     label: "Pausa",      color: "#dc8c50" },
      { key: "PALM×2",        label: "Task View",  color: "#dc5078" },
    ],
    videos: [
      { url: "https://res.cloudinary.com/doq5qdh7g/video/upload/v1771550474/Scroll_bkjocl.mov",        label: "Scroll" },
      { url: "https://res.cloudinary.com/doq5qdh7g/video/upload/v1771550473/Volume_tozkwu.mov",        label: "Volumen" },
      { url: "https://res.cloudinary.com/doq5qdh7g/video/upload/v1771550472/task_view_ghj9qr.mov",    label: "Task View" },
      { url: "https://res.cloudinary.com/doq5qdh7g/video/upload/v1771550471/Pause_u8vjtl.mp4",        label: "Pausa" },
      { url: "https://res.cloudinary.com/doq5qdh7g/video/upload/v1771550851/trayapp_dwqkxm.mp4",      label: "Tray App" },
    ],
  },
  {
    title: "Vocal Teleprompter",
    description:
      "Teleprompter sincronizado por voz que escucha al locutor en tiempo real y avanza automáticamente el guión. Usa Web Speech API con fuzzy matching para rastrear la posición en el texto, con resaltado palabra por palabra, soporte multiidioma y selección de micrófono.",
    highlights: [
      "Reconocimiento de voz en tiempo real con Web Speech API",
      "Fuzzy word matching para sincronización tolerante a variaciones",
      "Resaltado a nivel de palabra con scroll automático",
      "Soporte multiidioma y selección de micrófono",
      "App de escritorio con Tauri (Rust + React)",
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