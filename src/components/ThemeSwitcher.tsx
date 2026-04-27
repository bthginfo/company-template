import { useEffect, useState } from 'react';
import { applyTheme, PRESETS, type ThemePreset } from '@/lib/theme';
import type { TemplateKey } from '@/lib/types';

/**
 * Floating switcher visible in showcase mode.
 * Cycles color presets for the currently visible template.
 */
export function ThemeSwitcher({ template }: { template: TemplateKey }) {
  const presets = PRESETS[template];
  const [active, setActive] = useState<ThemePreset>(presets[0]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setActive(presets[0]);
    applyTheme(presets[0]);
  }, [template, presets]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`bg-white rounded-2xl shadow-2xl border transition-all ${open ? 'p-4 w-72' : 'p-2'}`}>
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-3 w-full"
          title="Farbschema wechseln"
        >
          <span
            className="h-9 w-9 rounded-full border-2 border-white shadow"
            style={{ background: `linear-gradient(135deg,${active.primary},${active.accent})` }}
          />
          {open && (
            <span className="font-medium text-sm">Farbschema</span>
          )}
        </button>

        {open && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {presets.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setActive(p);
                  applyTheme(p);
                }}
                className={`p-2 rounded-xl border text-left transition ${
                  active.id === p.id ? 'border-slate-900 ring-2 ring-slate-900/20' : 'border-slate-200 hover:border-slate-400'
                }`}
              >
                <div
                  className="h-10 w-full rounded-lg mb-2"
                  style={{ background: `linear-gradient(135deg,${p.primary},${p.accent})` }}
                />
                <div className="text-xs font-medium">{p.label}</div>
              </button>
            ))}
            <p className="col-span-2 mt-2 text-[11px] text-slate-500 leading-relaxed">
              In Echtbetrieb wählt der Kunde im Admin-Bereich seine Wunschfarbe.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
