import { useContent } from './lib/content-context';
import { getTemplateKey, getTemplateStyle, type TemplateStyle } from './lib/tenant';
import RestaurantTemplate from './templates/restaurant';
import SalonTemplate from './templates/salon';
import TradesmanTemplate from './templates/tradesman';
import ExtraBranchTemplate from './templates/extra';
import type { SiteContent } from './lib/types';

type TplProps = { content: SiteContent; style?: TemplateStyle };

const TEMPLATES: Record<string, (props: TplProps) => JSX.Element> = {
  restaurant: RestaurantTemplate,
  salon: SalonTemplate,
  tradesman: TradesmanTemplate,
  consulting: ExtraBranchTemplate,
  medical: ExtraBranchTemplate,
  fitness: ExtraBranchTemplate,
};

export function SiteRouter() {
  const { state } = useContent();

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

  const key = state.tenant.template || getTemplateKey();
  const style: TemplateStyle =
    (state.tenant.style as TemplateStyle | undefined) || getTemplateStyle();
  const Tpl = TEMPLATES[key] ?? RestaurantTemplate;
  return <Tpl content={state.content} style={style} />;
}
