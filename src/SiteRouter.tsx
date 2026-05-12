import { useContent } from './lib/content-context';
import { getTemplateKey, getTemplateStyle, type TemplateStyle } from './lib/tenant';
import { applyTheme, resolveThemePreset } from './lib/theme';
import type { TemplateKey } from './lib/types';
import { useEffect } from 'react';

/**
 * SiteRouter — placeholder for the new template renderer (v2).
 * Full multi-page template rendering implemented in Phase 3+.
 */
export function SiteRouter() {
  const { state } = useContent();

  const presetId = state.status === 'ready' ? (state.content as any)?.brand?.themePresetId : undefined;
  const customThemes = state.status === 'ready' ? (state.content as any)?.brand?.customThemes : undefined;
  const customThemesKey = state.status === 'ready' ? JSON.stringify((state.content as any)?.brand?.customThemes ?? []) : '';
  const themeKey = state.status === 'ready' ? (state.tenant.template || getTemplateKey()) : null;

  useEffect(() => {
    if (!presetId || !themeKey) return;
    const preset = resolveThemePreset(themeKey as TemplateKey, presetId, customThemes);
    if (preset) applyTheme(preset);
  }, [themeKey, presetId, customThemesKey, customThemes]);

  if (state.status === 'loading') {
    return <div className="min-h-screen grid place-items-center text-slate-500">Lädt …</div>;
  }
  if (state.status === 'error') {
    return (
      <div className="min-h-screen grid place-items-center p-8 text-center">
        <div>
          <p className="text-rose-600 font-semibold">Inhalt konnte nicht geladen werden.</p>
          <p className="text-sm text-slate-500 mt-2">{state.error}</p>
        </div>
      </div>
    );
  }

  const variant = (state.tenant.template || getTemplateKey()) as TemplateKey;
  const style: TemplateStyle = (state.tenant.style as TemplateStyle | undefined) || getTemplateStyle();

  return (
    <div className="min-h-screen grid place-items-center p-8 text-center bg-[#fafaf7]">
      <div className="max-w-md">
        <div className="text-4xl mb-4">🚧</div>
        <h1 className="text-xl font-semibold text-slate-900 mb-2">
          {(state.content as any)?.brand?.name || 'Ihre Website'}
        </h1>
        <p className="text-sm text-slate-500">
          Template: <strong>{variant}</strong> / Style: <strong>{style}</strong>
          <br />Das neue Frontend-System wird gerade gebaut.
        </p>
      </div>
    </div>
  );
}

function PreviewBanner() {
  return (
    <div className="bg-amber-500 text-white text-center text-sm py-2 px-4 font-medium sticky top-0 z-50">
      👁 Vorschau-Modus — Diese Seite zeigt den unveröffentlichten Entwurf.{' '}
      <a href="/" className="underline underline-offset-2 hover:text-amber-100">Zur Live-Seite →</a>
    </div>
  );
}
