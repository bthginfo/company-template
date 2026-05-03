import { useContent } from './lib/content-context';
import { getTemplateKey, getTemplateStyle, type TemplateStyle } from './lib/tenant';
import TemplateApp from './templates/_shared/TemplateApp';
import type { TemplateKey } from './lib/types';
import { useEffect } from 'react';
import { applyTheme, resolveThemePreset } from './lib/theme';

export function SiteRouter() {
  const { state } = useContent();

  // Apply the tenant's chosen color scheme (if any) whenever it changes.
  const presetId = state.status === 'ready' ? state.content?.brand?.themePresetId : undefined;
  const customThemes = state.status === 'ready' ? state.content?.brand?.customThemes : undefined;
  const customThemesKey = state.status === 'ready' ? JSON.stringify(state.content?.brand?.customThemes ?? []) : '';
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

  const isPreview = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('preview') === '1';

  const variant = (state.tenant.template || getTemplateKey()) as TemplateKey;
  const style: TemplateStyle =
    (state.tenant.style as TemplateStyle | undefined) || getTemplateStyle();

  return (
    <>
      {isPreview && <PreviewBanner />}
      <TemplateApp variant={variant} content={state.content} style={style} />
    </>
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
