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
    { id: 'midnight',   label: 'Midnight',       primary: '#fbbf24', primaryFg: '#0c0a09', accent: '#fbbf24', surface: '#1c1917', bg: '#0c0a09', text: '#f5f5f4' },
  ],
  salon: [
    { id: 'rose',       label: 'Rosé',           primary: '#be185d', primaryFg: '#fff1f5', accent: '#ec4899', surface: '#fff1f5', bg: '#ffffff', text: '#1f1521' },
    { id: 'lavender',   label: 'Lavender',       primary: '#6d28d9', primaryFg: '#f5f3ff', accent: '#a78bfa', surface: '#f7f5ff', bg: '#ffffff', text: '#1c1525' },
    { id: 'champagne',  label: 'Champagne',      primary: '#92400e', primaryFg: '#fffbeb', accent: '#d4a373', surface: '#fdf8f1', bg: '#ffffff', text: '#1f1812' },
    { id: 'noir',       label: 'Noir',           primary: '#f5d0fe', primaryFg: '#18181b', accent: '#f5d0fe', surface: '#27272a', bg: '#18181b', text: '#fafafa' },
  ],
  tradesman: [
    { id: 'royal',      label: 'Royal Blue',     primary: '#1d4ed8', primaryFg: '#eff6ff', accent: '#fbbf24', surface: '#f1f5f9', bg: '#ffffff', text: '#0f172a' },
    { id: 'forest',     label: 'Forest',         primary: '#166534', primaryFg: '#f0fdf4', accent: '#84cc16', surface: '#f1f5f0', bg: '#ffffff', text: '#0f1f12' },
    { id: 'industrial', label: 'Industrial',     primary: '#ea580c', primaryFg: '#fff7ed', accent: '#facc15', surface: '#f5f5f4', bg: '#ffffff', text: '#1c1917' },
    { id: 'slate',      label: 'Slate Pro',      primary: '#0ea5e9', primaryFg: '#f0f9ff', accent: '#0ea5e9', surface: '#1e293b', bg: '#0f172a', text: '#f1f5f9' },
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
