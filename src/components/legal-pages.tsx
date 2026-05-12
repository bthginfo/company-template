// @ts-nocheck
/**
 * Per-tenant Legal pages — Impressum (imprint) + Datenschutz (privacy).
 *
 * Both pages read their content from the tenant's `content.legal` field
 * (admin-editable). When an explicit override is empty the templates render
 * a sensible default that pulls in brand + contact data from the same
 * SiteContent — so a freshly seeded tenant already shows a usable Impressum
 * draft instead of a 404.
 *
 * Inputs come from the admin editor under "Global → Rechtliches".
 */
import { Link } from 'react-router-dom';
import { useReveal } from './fx';
import Seo from './Seo';
import { CookieSettingsButton } from './CookieBanner';
import type { SiteContent } from '@/lib/types';

type Legal = {
  /** Imprint — overrides. When `bodyHtml` is set, it is rendered as-is and the structured fields below are ignored for output (still kept for admin editing). */
  imprint?: {
    /** Legal entity name. Defaults to brand.name. */
    legalName?: string;
    /** Optional. e.g. "Geschäftsführerin Claudia Kogler". */
    representative?: string;
    street?: string;
    city?: string; // postcode + town
    country?: string;
    /** Tax / VAT-ID, e.g. "ATU82076147". */
    uid?: string;
    /** Commercial register number, e.g. "FN 123456a, LG Innsbruck". */
    register?: string;
    /** Supervisory authority / Aufsichtsbehörde. */
    authority?: string;
    /** Industry chamber / Kammer. */
    chamber?: string;
    /** Free-form additional paragraphs (one per line break). */
    extra?: string;
    /** Full custom body — overrides the structured fields. Plain text with paragraphs separated by blank lines. */
    bodyHtml?: string;
  };
  privacy?: {
    /** Custom body — when set, replaces the default DSGVO template. */
    bodyHtml?: string;
    /** Effective date of the policy, e.g. "April 2026". */
    effectiveDate?: string;
  };
};

function Page({ title, children }: { title: string; children: React.ReactNode }) {
  useReveal();
  return (
    <>
      <section className="pt-44 pb-12">
        <div className="container-x">
          <p className="eyebrow mb-5 reveal">Rechtliches</p>
          <h1 className="headline-xl max-w-5xl reveal">{title}</h1>
        </div>
      </section>
      <section className="pb-32">
        <div className="container-tight prose-lite reveal text-base md:text-lg leading-relaxed text-muted [&_h2]:font-display [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:text-[color:var(--text-color)] [&_h2]:mt-12 [&_h2]:mb-4 [&_a]:text-brand [&_a:hover]:text-[var(--accent-color)] [&_strong]:text-[color:var(--text-color)]">
          {children}
        </div>
      </section>
    </>
  );
}

/**
 * Render a free-form text body where blank lines start a new paragraph.
 * Lines starting with "## " become h2.
 */
function renderFreeform(s: string) {
  const blocks = s.split(/\n\s*\n/);
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith('## ')) {
      return <h2 key={i}>{trimmed.slice(3).trim()}</h2>;
    }
    // Render single-line breaks as <br/> within the paragraph.
    const lines = trimmed.split(/\n/);
    return (
      <p key={i}>
        {lines.map((ln, j) => (
          <span key={j}>
            {ln}
            {j < lines.length - 1 ? <br /> : null}
          </span>
        ))}
      </p>
    );
  });
}

export function Imprint({ content }: { content: SiteContent }) {
  const legal = ((content as any).legal ?? {}) as Legal;
  const ip = legal.imprint ?? {};
  const brandName = content.brand.name;
  const phone = content.contact.phone || '';
  const email = content.contact.email || '';
  const address = content.contact.address || '';
  const city = content.contact.city || '';

  const legalName = (ip.legalName && ip.legalName.trim()) || brandName;
  const street = (ip.street && ip.street.trim()) || address;
  const cityFull = (ip.city && ip.city.trim()) || city;
  const country = (ip.country && ip.country.trim()) || 'Österreich';

  return (
    <>
      <Seo title="Impressum" description={`Anbieter-Informationen — ${brandName}`} noindex />
      <Page title="Impressum">
        {ip.bodyHtml && ip.bodyHtml.trim() ? (
          renderFreeform(ip.bodyHtml)
        ) : (
          <>
            <h2>Anbieter</h2>
            <p>
              <strong>{legalName}</strong>
              {ip.representative ? (<><br />{ip.representative}</>) : null}
              {street ? (<><br />{street}</>) : null}
              {cityFull ? (<><br />{cityFull}</>) : null}
              {country ? (<><br />{country}</>) : null}
            </p>

            {(phone || email) && (
              <>
                <h2>Kontakt</h2>
                <p>
                  {phone ? (<>Telefon: <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a><br /></>) : null}
                  {email ? (<>E-Mail: <a href={`mailto:${email}`}>{email}</a></>) : null}
                </p>
              </>
            )}

            {(ip.uid || ip.register) && (
              <>
                <h2>Unternehmensdaten</h2>
                <p>
                  {ip.uid ? (<>UID-Nummer: <strong>{ip.uid}</strong><br /></>) : null}
                  {ip.register ? (<>Firmenbuch: {ip.register}</>) : null}
                </p>
              </>
            )}

            {(ip.authority || ip.chamber) && (
              <>
                <h2>Aufsichtsbehörde / Kammer</h2>
                <p>
                  {ip.chamber ? (<>{ip.chamber}<br /></>) : null}
                  {ip.authority ? ip.authority : null}
                </p>
              </>
            )}

            <h2>Online-Streitbeilegung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:{' '}
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer noopener">ec.europa.eu/consumers/odr</a>.
              Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>

            <h2>Haftung für Inhalte</h2>
            <p>
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
              Vollständigkeit und Aktualität können wir jedoch keine Gewähr übernehmen.
            </p>

            {ip.extra && ip.extra.trim() ? (
              <>
                <h2>Weitere Hinweise</h2>
                {renderFreeform(ip.extra)}
              </>
            ) : null}
          </>
        )}

        <p className="mt-12"><Link to="/" className="link-underline">← Zurück zur Startseite</Link></p>
      </Page>
    </>
  );
}

export function Privacy({ content }: { content: SiteContent }) {
  const legal = ((content as any).legal ?? {}) as Legal;
  const pv = legal.privacy ?? {};
  const ip = legal.imprint ?? {};
  const brandName = content.brand.name;
  const email = content.contact.email || '';
  const phone = content.contact.phone || '';
  const address = content.contact.address || '';
  const city = content.contact.city || '';
  const legalName = (ip.legalName && ip.legalName.trim()) || brandName;
  const street = (ip.street && ip.street.trim()) || address;
  const cityFull = (ip.city && ip.city.trim()) || city;

  return (
    <>
      <Seo title="Datenschutzerklärung" description={`Informationen zur Verarbeitung personenbezogener Daten — ${brandName}`} noindex />
      <Page title="Datenschutz">
        {pv.bodyHtml && pv.bodyHtml.trim() ? (
          renderFreeform(pv.bodyHtml)
        ) : (
          <>
            <p className="text-sm">
              {pv.effectiveDate ? <>Stand: {pv.effectiveDate}.{' '}</> : null}
              Wir nehmen den Schutz Ihrer personenbezogenen Daten ernst und behandeln Ihre Daten
              vertraulich gemäß der Datenschutz-Grundverordnung (DSGVO) und dieser Datenschutzerklärung.
            </p>

            <h2>1. Verantwortlicher</h2>
            <p>
              <strong>{legalName}</strong>
              {street ? (<><br />{street}</>) : null}
              {cityFull ? (<><br />{cityFull}</>) : null}
              {phone ? (<><br />Telefon: <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a></>) : null}
              {email ? (<><br />E-Mail: <a href={`mailto:${email}`}>{email}</a></>) : null}
            </p>

            <h2>2. Server-Logs</h2>
            <p>
              Beim Aufruf unserer Seiten verarbeitet der Hosting-Anbieter technisch erforderliche Daten
              (IP-Adresse, Zeitpunkt, User-Agent) zur Sicherstellung des Betriebs. Rechtsgrundlage ist
              Art. 6 Abs. 1 lit. f DSGVO. Speicherdauer: maximal 14 Tage.
            </p>

            <h2>3. Kontaktformular</h2>
            <p>
              Daten, die Sie uns über das Kontaktformular übermitteln (Name, E-Mail, Telefon,
              Nachricht), verarbeiten wir ausschließlich zur Bearbeitung Ihrer Anfrage gemäß
              Art. 6 Abs. 1 lit. b und f DSGVO. Eine Weitergabe an Dritte erfolgt nicht.
            </p>

            <h2>4. Cookies & Tracking</h2>
            <p>
              Wir setzen ausschließlich technisch notwendige Cookies. Optionale Cookies (Analyse,
              Marketing, Funktional) werden ausschließlich nach Ihrer Einwilligung gesetzt — erteilt
              über den Cookie-Banner beim ersten Besuch. Sie können Ihre Auswahl jederzeit ändern
              oder widerrufen:
            </p>
            <p>
              <CookieSettingsButton className="link-underline" />
            </p>

            <h2>5. Schriften & externe Inhalte</h2>
            <p>
              Schriftarten werden über Google Fonts geladen. Beim Laden wird Ihre IP-Adresse an
              Server von Google in der EU/USA übertragen. Beim Einbetten von Karten (Google Maps)
              wird beim Aufrufen der Karte ebenfalls Ihre IP-Adresse an Google übermittelt.
            </p>

            <h2>6. Ihre Rechte</h2>
            <p>
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
              Verarbeitung, Datenübertragbarkeit, Widerruf erteilter Einwilligungen sowie auf
              Beschwerde bei der Aufsichtsbehörde
              (in Österreich: <a href="https://www.dsb.gv.at" target="_blank" rel="noreferrer noopener">Datenschutzbehörde, dsb.gv.at</a>).
            </p>

            <h2>7. Aufbewahrung</h2>
            <p>
              Wir speichern Ihre Daten nur so lange, wie es für die Bearbeitung der Anfrage und
              gesetzliche Aufbewahrungspflichten erforderlich ist.
            </p>

            <h2>8. Kontakt für Datenschutzfragen</h2>
            <p>
              Bei Fragen zum Datenschutz wenden Sie sich bitte an:{' '}
              {email ? <a href={`mailto:${email}`}>{email}</a> : <span>{legalName}</span>}.
            </p>
          </>
        )}

        <p className="mt-12"><Link to="/" className="link-underline">← Zurück zur Startseite</Link></p>
      </Page>
    </>
  );
}
