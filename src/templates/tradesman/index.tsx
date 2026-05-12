import { Routes, Route, Link, NavLink } from 'react-router-dom';
import type { SiteContent, TemplateStyle } from '@/lib/types';
import { FadeUp, ScaleIn, Stagger, StaggerItem, SlideIn } from '@/lib/motion.tsx';
import { getNavLabels, hasFeature } from '@/lib/types';

interface Props { content: SiteContent; style?: TemplateStyle; industry?: string }

function Layout({ children, content, style = 'classic', nav }: Props & { children: React.ReactNode; nav: { label: string; to: string }[] }) {
  const s = style;
  return (
    <div className="min-h-screen flex flex-col">
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b ${s === 'bold' ? 'border-black border-b-4' : 'border-black/5'} bg-white/90`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-bold text-lg">{content.brand.name || 'Handwerk'}</Link>
          <nav className="hidden md:flex gap-6 text-sm">
            {nav.map(n => <NavLink key={n.to} to={n.to} className={({isActive}) => isActive ? 'text-brand font-semibold' : 'hover:text-brand transition-colors'}>{n.label}</NavLink>)}
          </nav>
        </div>
      </header>
      {hasFeature((content as any)._industry, 'notdienst') && (
        <div className={`text-center py-2 text-sm font-semibold ${s === 'bold' ? 'bg-yellow-400 text-black' : 'bg-brand text-white'}`}>
          🚨 24/7 Notdienst: <a href={`tel:${content.contact?.phone}`} className="underline">{content.contact?.phone}</a>
        </div>
      )}
      <main className="flex-1">{children}</main>
      <footer className={`py-12 text-center text-sm ${s === 'bold' ? 'bg-black text-white border-t-4' : 'bg-slate-50 text-slate-500'}`}>
        <p>© {new Date().getFullYear()} {content.brand.name}</p>
      </footer>
    </div>
  );
}

function Hero({ content, style = 'classic' }: Props) {
  const overlay = style === 'bold' ? 'bg-black/70' : 'bg-black/50';
  return (
    <section className="relative min-h-[70vh] flex items-end text-white">
      <div className={`absolute inset-0 ${overlay}`} />
      <img src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1600&q=80" alt="" className="absolute inset-0 w-full h-full object-cover -z-10" />
      <div className="relative px-6 pb-16 max-w-3xl">
        <FadeUp><h1 className={`${style === 'bold' ? 'text-5xl md:text-7xl font-black uppercase' : 'text-4xl md:text-6xl font-bold'}`}>{content.brand.name}</h1></FadeUp>
        <FadeUp delay={0.15}><p className="mt-4 text-lg opacity-90">{content.brand.tagline}</p></FadeUp>
      </div>
    </section>
  );
}

function HomePage({ content, style = 'classic', industry }: Props) {
  const s = style;
  const services = (content as any).services?.slice(0, 6) ?? [];
  const about = (content as any).about ?? {};
  // Dynamic stats
  const yearMatch = about.body?.match(/seit\s+(\d{4})/i);
  const years = yearMatch ? new Date().getFullYear() - parseInt(yearMatch[1]) : null;
  return (
    <>
      <Hero content={content} style={s} industry={industry} />
      {years && (
        <section className="py-12 bg-brand text-white">
          <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 text-center">
            <FadeUp><div><span className={`block ${s === 'bold' ? 'text-6xl font-black' : 'text-5xl font-bold'}`}>{years}+</span><span className="text-sm opacity-80">Jahre Erfahrung</span></div></FadeUp>
            <FadeUp delay={0.1}><div><span className={`block ${s === 'bold' ? 'text-6xl font-black' : 'text-5xl font-bold'}`}>{services.length * 500}+</span><span className="text-sm opacity-80">Aufträge</span></div></FadeUp>
            <FadeUp delay={0.2}><div><span className={`block ${s === 'bold' ? 'text-6xl font-black' : 'text-5xl font-bold'}`}>4.9★</span><span className="text-sm opacity-80">Bewertung</span></div></FadeUp>
          </div>
        </section>
      )}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <FadeUp><h2 className={`text-3xl font-bold text-center mb-12 ${s === 'bold' ? 'uppercase tracking-tight' : ''}`}>Unsere Leistungen</h2></FadeUp>
        <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item: any, i: number) => (
            <StaggerItem key={i}>
              <div className={`p-6 transition-all duration-300 hover:scale-[1.02] ${s === 'bold' ? 'border-4 border-black hover:shadow-[6px_6px_0_#000]' : s === 'modern' ? 'rounded-2xl border border-slate-100 hover:shadow-xl' : 'rounded-2xl bg-white shadow-md border-l-4 border-brand'}`}>
                <h3 className="font-semibold text-lg">{item.name}</h3>
                {item.description && <p className="mt-2 text-sm text-slate-600">{item.description}</p>}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </>
  );
}

function LeistungenPage({ content, style = 'classic' }: Props) {
  const s = style;
  const services = (content as any).services ?? [];
  return (
    <section className="py-20 max-w-4xl mx-auto px-6">
      <FadeUp><h1 className={`text-3xl font-bold mb-10 ${s === 'bold' ? 'uppercase' : ''}`}>Leistungen</h1></FadeUp>
      <Stagger className="grid md:grid-cols-2 gap-6">
        {services.map((item: any, i: number) => (
          <StaggerItem key={i}>
            <div className={`p-6 ${s === 'bold' ? 'border-4 border-black' : s === 'modern' ? 'rounded-2xl border hover:shadow-lg transition-shadow' : 'rounded-2xl bg-white shadow-md border-l-4 border-brand'}`}>
              <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
              {item.description && <p className="text-sm text-slate-600">{item.description}</p>}
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function ReferenzenPage({ content, style = 'classic' }: Props) {
  const s = style;
  const gallery = (content as any).gallery ?? [];
  const testimonials = (content as any).testimonials ?? [];
  return (
    <section className="py-20 max-w-6xl mx-auto px-6">
      <FadeUp><h1 className={`text-3xl font-bold mb-10 ${s === 'bold' ? 'uppercase' : ''}`}>Referenzen</h1></FadeUp>
      {gallery.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {gallery.map((img: any, i: number) => (
            <ScaleIn key={i} delay={i * 0.05}>
              <img src={img.url || img} alt="" className={`w-full aspect-[4/3] object-cover ${s === 'bold' ? 'border-4 border-black' : 'rounded-xl'}`} />
            </ScaleIn>
          ))}
        </div>
      )}
      {testimonials.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t: any, i: number) => (
            <FadeUp key={i} delay={i * 0.1}>
              <blockquote className={`p-6 ${s === 'bold' ? 'border-4 border-black bg-white' : 'rounded-2xl bg-white shadow-sm'}`}>
                <p className="italic">"{t.text}"</p>
                <cite className="mt-3 block text-sm font-semibold not-italic">— {t.author}</cite>
              </blockquote>
            </FadeUp>
          ))}
        </div>
      )}
    </section>
  );
}

function AboutPage({ content, style = 'classic' }: Props) {
  const s = style;
  const about = (content as any).about ?? {};
  return (
    <section className="py-20 max-w-4xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <SlideIn from="left">
          {about.imageUrl && <img src={about.imageUrl} alt="" className={`w-full aspect-square object-cover ${s === 'bold' ? 'border-4 border-black' : 'rounded-3xl'}`} />}
        </SlideIn>
        <FadeUp>
          <h1 className={`text-3xl font-bold mb-4 ${s === 'bold' ? 'uppercase' : ''}`}>{about.title || 'Über uns'}</h1>
          <p className="text-slate-600 leading-relaxed">{about.body || ''}</p>
        </FadeUp>
      </div>
    </section>
  );
}

function KontaktPage({ content, style: _s = 'classic' }: Props) {
  const contact = content.contact;
  return (
    <section className="py-20 max-w-4xl mx-auto px-6">
      <FadeUp><h1 className="text-3xl font-bold mb-8">Kontakt</h1></FadeUp>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-4 text-slate-600">
          {contact?.address && <p>{contact.address}</p>}
          {contact?.city && <p>{contact.city}</p>}
          {contact?.phone && <p>Tel: {contact.phone}</p>}
          {contact?.email && <p>E-Mail: {contact.email}</p>}
        </div>
        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
          <input type="text" placeholder="Name" className="w-full border rounded-lg px-4 py-3" />
          <input type="email" placeholder="E-Mail" className="w-full border rounded-lg px-4 py-3" />
          <textarea placeholder="Ihr Anliegen" rows={4} className="w-full border rounded-lg px-4 py-3" />
          <button type="submit" className="btn-primary w-full py-3 rounded-lg font-semibold">Anfrage senden</button>
        </form>
      </div>
    </section>
  );
}

export default function TradesmanTemplate({ content, style = 'classic', industry }: Props) {
  const labels = getNavLabels(industry);
  const contentWithIndustry = { ...content, _industry: industry } as any;
  const nav = [
    { label: 'Home', to: '/' },
    { label: labels.services, to: '/leistungen' },
    { label: labels.gallery || 'Referenzen', to: '/referenzen' },
    { label: labels.about, to: '/ueber-uns' },
    { label: labels.contact, to: '/kontakt' },
  ];
  return (
    <Layout content={contentWithIndustry} style={style} industry={industry} nav={nav}>
      <Routes>
        <Route index element={<HomePage content={contentWithIndustry} style={style} industry={industry} />} />
        <Route path="leistungen" element={<LeistungenPage content={contentWithIndustry} style={style} />} />
        <Route path="referenzen" element={<ReferenzenPage content={contentWithIndustry} style={style} />} />
        <Route path="ueber-uns" element={<AboutPage content={contentWithIndustry} style={style} />} />
        <Route path="kontakt" element={<KontaktPage content={contentWithIndustry} style={style} />} />
      </Routes>
    </Layout>
  );
}
