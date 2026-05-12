import { Routes, Route, Link, NavLink } from 'react-router-dom';
import type { SiteContent, TemplateStyle } from '@/lib/types';
import { FadeUp, ScaleIn, Stagger, StaggerItem } from '@/lib/motion.tsx';
import { useEffect, useState } from 'react';

interface Props { content: SiteContent; style?: TemplateStyle; industry?: string }

function Layout({ children, content, style = 'classic', nav }: Props & { children: React.ReactNode; nav: { label: string; to: string }[] }) {
  const s = style;
  return (
    <div className={`min-h-screen flex flex-col ${s === 'bold' ? 'font-sans' : ''}`}>
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b ${s === 'bold' ? 'border-black border-b-4' : 'border-black/5'} bg-white/90`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-bold text-lg">{content.brand.name || 'Hochzeit'}</Link>
          <nav className="hidden md:flex gap-6 text-sm">
            {nav.map(n => <NavLink key={n.to} to={n.to} className={({isActive}) => isActive ? 'text-brand font-semibold' : 'hover:text-brand transition-colors'}>{n.label}</NavLink>)}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className={`py-12 text-center text-sm ${s === 'bold' ? 'bg-black text-white' : 'bg-slate-50 text-slate-500'}`}>
        <p>© {new Date().getFullYear()} {content.brand.name}</p>
      </footer>
    </div>
  );
}

function CountdownBanner({ content, style = 'classic' }: Props) {
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    const hours = content.contact?.hours ?? [];
    const dateEntry = hours.find(h => /^\d{4}-\d{2}-\d{2}/.test(h.time));
    if (!dateEntry) return;
    const update = () => {
      const diff = new Date(dateEntry.time).getTime() - Date.now();
      setDays(Math.max(0, Math.ceil(diff / 86400000)));
    };
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, [content.contact?.hours]);
  if (days === null) return null;
  const s = style;
  return (
    <div className={`py-4 text-center font-semibold ${s === 'bold' ? 'bg-yellow-400 text-black text-lg uppercase tracking-widest' : 'bg-brand/10 text-brand'}`}>
      {days === 0 ? '🎉 Heute ist der große Tag!' : `Noch ${days} ${days === 1 ? 'Tag' : 'Tage'}`}
    </div>
  );
}

function Hero({ content, style = 'classic' }: Props) {
  const overlay = style === 'bold' ? 'bg-black/60' : 'bg-black/40';
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center text-white">
      <div className={`absolute inset-0 ${overlay}`} />
      <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80" alt="" className="absolute inset-0 w-full h-full object-cover -z-10" />
      <div className="relative text-center px-6 max-w-2xl">
        <FadeUp><h1 className={`${style === 'bold' ? 'text-5xl md:text-7xl font-black uppercase tracking-tight' : 'text-4xl md:text-6xl font-light'}`}>{content.brand.name}</h1></FadeUp>
        <FadeUp delay={0.15}><p className="mt-4 text-xl opacity-90">{content.brand.tagline || 'Wir heiraten!'}</p></FadeUp>
        {style !== 'bold' && <FadeUp delay={0.3}><p className="mt-6 text-2xl opacity-70">✦ ✦ ✦</p></FadeUp>}
      </div>
    </section>
  );
}

function WillkommenPage({ content, style = 'classic', industry }: Props) {
  const s = style;
  const services = (content as any).services?.slice(0, 3) ?? [];
  return (
    <>
      <Hero content={content} style={s} industry={industry} />
      <CountdownBanner content={content} style={s} industry={industry} />
      <section className="py-20 max-w-4xl mx-auto px-6 text-center">
        <FadeUp><h2 className={`text-3xl font-bold mb-6 ${s === 'bold' ? 'uppercase' : ''}`}>Unser Programm</h2></FadeUp>
        <Stagger className="grid md:grid-cols-3 gap-8">
          {services.map((item: any, i: number) => (
            <StaggerItem key={i}>
              <div className={`p-6 ${s === 'bold' ? 'border-4 border-black' : s === 'modern' ? 'rounded-2xl border border-slate-100' : 'rounded-3xl bg-white shadow-md'}`}>
                <h3 className="font-semibold text-lg">{item.name}</h3>
                {item.price && <span className="text-sm text-slate-500">{item.price}</span>}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </>
  );
}

function AblaufPage({ content, style = 'classic' }: Props) {
  const s = style;
  const services = (content as any).services ?? [];
  return (
    <section className="py-20 max-w-3xl mx-auto px-6">
      <FadeUp><h1 className={`text-3xl font-bold mb-12 text-center ${s === 'bold' ? 'uppercase' : ''}`}>Ablauf</h1></FadeUp>
      <div className="relative border-l-2 border-brand/30 ml-4">
        {services.map((item: any, i: number) => (
          <FadeUp key={i} delay={i * 0.08}>
            <div className="pl-8 pb-10 relative">
              <div className="absolute -left-2 top-1 w-4 h-4 rounded-full bg-brand" />
              {item.price && <span className="text-sm text-brand font-medium">{item.price}</span>}
              <h3 className="font-semibold text-lg">{item.name}</h3>
              {item.description && <p className="text-sm text-slate-600 mt-1">{item.description}</p>}
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function GaleriePage({ content, style = 'classic' }: Props) {
  const s = style;
  const images = (content as any).gallery ?? [];
  return (
    <section className="py-20 max-w-6xl mx-auto px-6">
      <FadeUp><h1 className={`text-3xl font-bold mb-10 text-center ${s === 'bold' ? 'uppercase' : ''}`}>Galerie</h1></FadeUp>
      <div className="columns-2 md:columns-3 gap-4">
        {images.map((img: any, i: number) => (
          <ScaleIn key={i} delay={i * 0.05}>
            <div className="break-inside-avoid mb-4">
              <img src={img.url || img} alt="" className={`w-full ${s === 'bold' ? 'border-4 border-black' : 'rounded-2xl'}`} />
            </div>
          </ScaleIn>
        ))}
      </div>
    </section>
  );
}

function RsvpPage({ content: _content, style = 'classic' }: Props) {
  const s = style;
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="py-20 max-w-md mx-auto px-6">
      <FadeUp><h1 className={`text-3xl font-bold mb-8 text-center ${s === 'bold' ? 'uppercase' : ''}`}>RSVP</h1></FadeUp>
      {submitted ? (
        <div className="text-center py-12">
          <p className="text-4xl mb-4">🎉</p>
          <p className="text-lg font-semibold">Danke für deine Rückmeldung!</p>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
          <input name="name" type="text" placeholder="Name" required className="w-full border rounded-lg px-4 py-3" />
          <input name="email" type="email" placeholder="E-Mail" required className="w-full border rounded-lg px-4 py-3" />
          <select name="attending" className="w-full border rounded-lg px-4 py-3">
            <option value="yes">Ich komme gerne! ✓</option>
            <option value="no">Leider nicht möglich</option>
          </select>
          <input name="guests" type="number" min={1} max={10} defaultValue={1} placeholder="Anzahl Personen" className="w-full border rounded-lg px-4 py-3" />
          <textarea name="message" placeholder="Nachricht (optional)" rows={3} className="w-full border rounded-lg px-4 py-3" />
          <button type="submit" className="btn-primary w-full py-3 rounded-lg font-semibold">Absenden</button>
        </form>
      )}
    </section>
  );
}

function AnreisePage({ content, style: _s = 'classic' }: Props) {
  const contact = content.contact;
  return (
    <section className="py-20 max-w-4xl mx-auto px-6">
      <FadeUp><h1 className="text-3xl font-bold mb-8 text-center">Anreise</h1></FadeUp>
      <div className="text-center space-y-4">
        {contact?.address && <p className="text-lg">{contact.address}</p>}
        {contact?.city && <p className="text-lg">{contact.city}</p>}
        {contact?.mapsUrl && (
          <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 btn-primary px-6 py-3 rounded-lg">
            Route planen →
          </a>
        )}
      </div>
    </section>
  );
}

export default function HochzeitTemplate({ content, style = 'classic', industry }: Props) {
  const nav = [
    { label: 'Willkommen', to: '/' },
    { label: 'Ablauf', to: '/ablauf' },
    { label: 'Galerie', to: '/galerie' },
    { label: 'RSVP', to: '/rsvp' },
    { label: 'Anreise', to: '/anreise' },
  ];
  return (
    <Layout content={content} style={style} industry={industry} nav={nav}>
      <Routes>
        <Route index element={<WillkommenPage content={content} style={style} industry={industry} />} />
        <Route path="ablauf" element={<AblaufPage content={content} style={style} />} />
        <Route path="galerie" element={<GaleriePage content={content} style={style} />} />
        <Route path="rsvp" element={<RsvpPage content={content} style={style} />} />
        <Route path="anreise" element={<AnreisePage content={content} style={style} />} />
      </Routes>
    </Layout>
  );
}
