import { useLayoutEffect, useMemo, useRef } from 'react';
import type { SiteContent } from '@/lib/types';
import type { TemplateKey } from '@/lib/types';
import type { TemplateStyle } from '@/lib/branch-config';

function modularPagesBootstrapFingerprint(m: SiteContent['modularPagesV1']): string {
  if (!m?.combo) return 'none';
  const keys = ['home', 'services', 'gallery', 'about', 'contact'] as const;
  const counts = keys.map((k) => m[k]?.sections?.length ?? 0);
  return `${m.combo.template}|${m.combo.style}|${counts.join(',')}`;
}

type BootstrapCfg = {
  cfgTpl: TemplateKey;
  importFromLegacy: (data: SiteContent, style: TemplateStyle) => NonNullable<SiteContent['modularPagesV1']>;
  applyToLegacy: (data: SiteContent) => SiteContent;
  hasAny: (data: SiteContent) => boolean;
};

/**
 * Ensures `modularPagesV1` exists and is populated for the active template so page editors
 * never fall back to the legacy card UI. Runs once per fingerprint change (not on every keystroke).
 */
export function useBootstrapModularIfNeeded(
  params: {
    tpl: TemplateKey;
    style: TemplateStyle;
    data: SiteContent;
    setData: (d: SiteContent) => void;
  } & BootstrapCfg,
): void {
  const { tpl, style, data, setData, cfgTpl, importFromLegacy, applyToLegacy, hasAny } = params;
  const fp = useMemo(() => modularPagesBootstrapFingerprint(data.modularPagesV1), [data.modularPagesV1]);
  const dataRef = useRef(data);
  dataRef.current = data;
  useLayoutEffect(() => {
    if (tpl !== cfgTpl) return;
    const cur = dataRef.current;
    const m = cur.modularPagesV1;
    if (m?.combo?.template === cfgTpl && hasAny(cur)) return;
    const imported = importFromLegacy(cur, style);
    setData(applyToLegacy({ ...cur, modularPagesV1: imported }));
  }, [tpl, cfgTpl, style, fp, setData, importFromLegacy, applyToLegacy, hasAny]);
}
