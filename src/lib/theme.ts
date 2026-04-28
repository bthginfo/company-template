import type { TemplateKey } from './types';

export type ThemePreset = {
  id: string;
  label: string;
  primary: string;
  primaryFg: string;
  accent: string;
  surface: string;
  /** body background */
  bg: string;
  /** body text */
  text: string;
};

export const PRESETS: Record<TemplateKey, ThemePreset[]> = {
  restaurant: [
    { id: 'terracotta', label: 'Terracotta',     primary: '#9a3412', primaryFg: '#fff7ed', accent: '#fb923c', surface: '#fffaf5', bg: '#ffffff', text: '#1c1917' },
    { id: 'olive',      label: 'Olive & Cream',  primary: '#3f6212', primaryFg: '#f7fee7', accent: '#a3e635', surface: '#fafaf3', bg: '#ffffff', text: '#1c1c14' },
    { id: 'wine',       label: 'Wine',           primary: '#7f1d1d', primaryFg: '#fef2f2', accent: '#f87171', surface: '#fdf6f6', bg: '#ffffff', text: '#1f1313' },
    { id: 'espresso',   label: 'Espresso',       primary: '#3e2723', primaryFg: '#fdf6e3', accent: '#c89f6b', surface: '#faf5ee', bg: '#ffffff', text: '#1f1714' },
    { id: 'mono',       label: 'Mono',           primary: '#111111', primaryFg: '#ffffff', accent: '#111111', surface: '#f5f5f5', bg: '#ffffff', text: '#0a0a0a' },
    { id: 'midnight',   label: 'Midnight',       primary: '#fbbf24', primaryFg: '#0c0a09', accent: '#fbbf24', surface: '#1c1917', bg: '#0c0a09', text: '#f5f5f4' },
  ],
  salon: [
    { id: 'rose',       label: 'Rosé',           primary: '#be185d', primaryFg: '#fff1f5', accent: '#ec4899', surface: '#fff1f5', bg: '#ffffff', text: '#1f1521' },
    { id: 'lavender',   label: 'Lavender',       primary: '#6d28d9', primaryFg: '#f5f3ff', accent: '#a78bfa', surface: '#f7f5ff', bg: '#ffffff', text: '#1c1525' },
    { id: 'champagne',  label: 'Champagne',      primary: '#92400e', primaryFg: '#fffbeb', accent: '#d4a373', surface: '#fdf8f1', bg: '#ffffff', text: '#1f1812' },
    { id: 'mint',       label: 'Mint',           primary: '#0d9488', primaryFg: '#f0fdfa', accent: '#5eead4', surface: '#f0fdfa', bg: '#ffffff', text: '#0c1c1a' },
    { id: 'mono',       label: 'Mono',           primary: '#111111', primaryFg: '#ffffff', accent: '#111111', surface: '#f5f5f5', bg: '#ffffff', text: '#0a0a0a' },
    { id: 'noir',       label: 'Noir',           primary: '#f5d0fe', primaryFg: '#18181b', accent: '#f5d0fe', surface: '#27272a', bg: '#18181b', text: '#fafafa' },
  ],
  tradesman: [
    { id: 'royal',      label: 'Royal Blue',     primary: '#1d4ed8', primaryFg: '#eff6ff', accent: '#fbbf24', surface: '#f1f5f9', bg: '#ffffff', text: '#0f172a' },
    { id: 'forest',     label: 'Forest',         primary: '#166534', primaryFg: '#f0fdf4', accent: '#84cc16', surface: '#f1f5f0', bg: '#ffffff', text: '#0f1f12' },
    { id: 'industrial', label: 'Industrial',     primary: '#ea580c', primaryFg: '#fff7ed', accent: '#facc15', surface: '#f5f5f4', bg: '#ffffff', text: '#1c1917' },
    { id: 'steel',      label: 'Steel',          primary: '#475569', primaryFg: '#f8fafc', accent: '#fbbf24', surface: '#f1f5f9', bg: '#ffffff', text: '#0f172a' },
    { id: 'mono',       label: 'Mono',           primary: '#111111', primaryFg: '#ffffff', accent: '#111111', surface: '#f5f5f5', bg: '#ffffff', text: '#0a0a0a' },
    { id: 'slate',      label: 'Slate Pro',      primary: '#0ea5e9', primaryFg: '#f0f9ff', accent: '#0ea5e9', surface: '#1e293b', bg: '#0f172a', text: '#f1f5f9' },
  ],
  consulting: [
    { id: 'navy',       label: 'Navy',           primary: '#1e3a8a', primaryFg: '#eff6ff', accent: '#60a5fa', surface: '#f1f5f9', bg: '#ffffff', text: '#0f172a' },
    { id: 'graphite',   label: 'Graphite',       primary: '#1f2937', primaryFg: '#f9fafb', accent: '#fbbf24', surface: '#f3f4f6', bg: '#ffffff', text: '#111827' },
    { id: 'sand',       label: 'Sand',           primary: '#78716c', primaryFg: '#fafaf9', accent: '#d4a373', surface: '#fafaf9', bg: '#ffffff', text: '#1c1917' },
    { id: 'burgundy',   label: 'Burgundy',       primary: '#7f1d1d', primaryFg: '#fef2f2', accent: '#d4a373', surface: '#faf5f1', bg: '#ffffff', text: '#1f1313' },
    { id: 'mono',       label: 'Mono',           primary: '#111111', primaryFg: '#ffffff', accent: '#111111', surface: '#f5f5f5', bg: '#ffffff', text: '#0a0a0a' },
    { id: 'mid-blue',   label: 'Midnight Blue',  primary: '#60a5fa', primaryFg: '#0c1322', accent: '#60a5fa', surface: '#1e293b', bg: '#0f172a', text: '#e2e8f0' },
  ],
  medical: [
    { id: 'cyan',       label: 'Cyan Calm',      primary: '#0e7490', primaryFg: '#ecfeff', accent: '#22d3ee', surface: '#f0fdff', bg: '#ffffff', text: '#0c1f24' },
    { id: 'teal',       label: 'Teal Soft',      primary: '#0f766e', primaryFg: '#f0fdfa', accent: '#5eead4', surface: '#f0fdfa', bg: '#ffffff', text: '#0c1c1a' },
    { id: 'sage',       label: 'Sage',           primary: '#4d7c0f', primaryFg: '#f7fee7', accent: '#a3e635', surface: '#f7fee7', bg: '#ffffff', text: '#1a2010' },
    { id: 'coral',      label: 'Coral',          primary: '#be123c', primaryFg: '#fff1f2', accent: '#fda4af', surface: '#fff5f5', bg: '#ffffff', text: '#1f1314' },
    { id: 'mono',       label: 'Mono',           primary: '#111111', primaryFg: '#ffffff', accent: '#111111', surface: '#f5f5f5', bg: '#ffffff', text: '#0a0a0a' },
    { id: 'cocoon',     label: 'Cocoon',         primary: '#a5f3fc', primaryFg: '#0c1f24', accent: '#a5f3fc', surface: '#0e7490', bg: '#083344', text: '#ecfeff' },
  ],
  fitness: [
    { id: 'violet',     label: 'Violet',         primary: '#9333ea', primaryFg: '#faf5ff', accent: '#c084fc', surface: '#faf5ff', bg: '#ffffff', text: '#1c1126' },
    { id: 'sunset',     label: 'Sunset',         primary: '#ea580c', primaryFg: '#fff7ed', accent: '#fb923c', surface: '#fff7ed', bg: '#ffffff', text: '#1c0f06' },
    { id: 'lime',       label: 'Lime Energy',    primary: '#365314', primaryFg: '#f7fee7', accent: '#a3e635', surface: '#f7fee7', bg: '#ffffff', text: '#0f1605' },
    { id: 'electric',   label: 'Electric',       primary: '#0ea5e9', primaryFg: '#f0f9ff', accent: '#22d3ee', surface: '#f0f9ff', bg: '#ffffff', text: '#0c1422' },
    { id: 'mono',       label: 'Mono',           primary: '#111111', primaryFg: '#ffffff', accent: '#111111', surface: '#f5f5f5', bg: '#ffffff', text: '#0a0a0a' },
    { id: 'noir-vio',   label: 'Noir Violet',    primary: '#c084fc', primaryFg: '#1c1126', accent: '#c084fc', surface: '#27272a', bg: '#18181b', text: '#fafafa' },
  ],
};

export function applyTheme(p: ThemePreset) {
  const r = document.documentElement.style;
  r.setProperty('--brand-color', p.primary);
  r.setProperty('--brand-fg', p.primaryFg);
  r.setProperty('--accent-color', p.accent);
  r.setProperty('--surface-color', p.surface);
  r.setProperty('--bg-color', p.bg);
  r.setProperty('--text-color', p.text);
  // body color sync (Tailwind uses utility classes; we set CSS vars and consume them via body)
  document.body.style.backgroundColor = p.bg;
  document.body.style.color = p.text;
}
