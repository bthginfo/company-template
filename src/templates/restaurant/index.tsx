import { Routes, Route, Link, NavLink } from 'react-router-dom';
import type { SiteContent } from '@/lib/types';
import type { TemplateStyle } from '@/lib/types';
import { FadeUp, ScaleIn, Stagger, StaggerItem, SlideIn } from '@/lib/motion.tsx';
import { getNavLabels } from '@/lib/types';

interface Props { content: SiteContent; style?: TemplateStyle; industry?: string }

function Layout({ children, content, style = 'classic', industry: _industry, nav }: Props & { children: React.ReactNode; nav: { label: string; to: string }[] }) {
  const s = style;
  const brand = content.brand;
  return (
    <div className={`min-h-screen flex flex-col ${s === 'bold' ? 'font-sans uppercase' : ''}`}>
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b ${s === 'bold' ? 'border-black border-b-4' : 'border-black/5'} bg-white/90`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-bold text-lg">{brand.name || 'Restaurant'}</Link>
          <nav className="hidden md:flex gap-6 text-sm">
            {nav.map(n => <NavLink key={n.to} to={n.to} className={({isActive}) => isActive ? 'text-brand font-semibold' : 'hover:text-brand transition-colors'}>{n.label}</NavLink>)}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className={`py-12 text-center text-sm ${s === 'bold' ? 'bg-black text-white border-t-4 border-black' : 'bg-slate-50 text-slate-500'}`}>
        <p>© {new Date().getFullYear()} {brand.name}</p>
      </footer>
    </div>
  );
}

function Hero({ content, style = 'classic' }: Props) {
  const s = style;
  const overlay = s === 'bold' ? 'bg-black/70' : s === 'modern' ? 'bg-black/40' : 'bg-black/50';
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center text-white">
      <div className={`absolute inset-0 ${overlay}`} />
      <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80" alt="" className="absolute inset-0 w-full h-full object-cover -z-10" />
      <div className="relative text-center px-6 max-w-2xl">
        <FadeUp><h1 className={`${s === 'bold' ? 'text-6xl md:text-8xl font-black tracking-tight' : 'text-4xl md:text-6xl font-bold'}`}>{content.brand.name}</h1></FadeUp>
        <FadeUp delay={0.15}><p className="mt-4 text-lg opacity-90">{content.brand.tagline || 'Willkommen in unserem Restaurant'}</p></FadeUp>
      </div>
    </section>
  );
}

function HomePage({ content, style = 'classic', industry }: Props) {
  const s = style;
  const services = (content as any).services?.slice(0, 6) ?? [];
  return (
    <>
      <Hero content={content} style={s} industry={industry} />
      <section className="py-20 max-w-6xl mx-auto px-6">
        <FadeUp><h2 className={`text-3xl font-bold text-center mb-12 ${s === 'bold' ? 'uppercase tracking-tight' : ''}`}>Unsere Empfehlungen</h2></FadeUp>
        <Stagger className="grid md:grid-cols-3 gap-6">
          {services.map((item: any, i: number) => (
            <StaggerItem key={i}>
              <div className={`p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${s === 'bold' ? 'border-4 border-black' : s === 'modern' ? 'rounded-2xl border border-slate-100 hover:shadow-xl' : 'rounded-3xl bg-white shadow-md'}`}>
                <h3 className="font-semibold text-lg">{item.name}</h3>
                {item.price && <span className="text-brand font-medium">{item.price}</span>}
                {item.description && <p className="mt-2 text-sm text-slate-600">{item.description}</p>}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
      {(content as any).testimonials?.length > 0 && (
        <section className={`py-16 ${s === 'bold' ? 'bg-black text-white' : 'bg-slate-50'}`}>
          <div className="max-w-4xl mx-auto px-6">
            <FadeUp><h2 className="text-2xl font-bold text-center mb-8">Stimmen unserer Gäste</h2></FadeUp>
            <div className="grid md:grid-cols-2 gap-6">
              {(content as any).testimonials.slice(0, 4).map((t: any, i: number) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <blockquote className={`p-6 ${s === 'bold' ? 'border-4 border-white bg-white text-black' : 'rounded-2xl bg-white shadow-sm'}`}>
                    <p className="italic">"{t.text}"</p>
                    <cite className="mt-3 block text-sm font-semibold not-italic">— {t.author}</cite>
                  </blockquote>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function SpeisekartePage({ content, style = 'classic' }: Props) {
  const s = style;
  const services = (content as any).services ?? [];
  return (
    <section className="py-20 max-w-4xl mx-auto px-6">
      <FadeUp><h1 className={`text-3xl font-bold mb-10 ${s === 'bold' ? 'uppercase' : ''}`}>Speisekarte</h1></FadeUp>
      <div className="space-y-4">
        {services.map((item: any, i: number) => (
          <FadeUp key={i} delay={i * 0.03}>
            <div className={`flex justify-between items-baseline py-3 ${s === 'bold' ? 'border-b-4 border-black hover:bg-black hover:text-white px-4 transition-colors' : s === 'modern' ? 'border-b border-slate-200 hover:bg-slate-50 rounded-lg px-3 transition-colors' : 'border-b border-black/10'}`}>
              <div>
                <span className="font-medium">{item.name}</span>
                {item.description && <p className="text-sm text-slate-500 mt-0.5">{item.description}</p>}
              </div>
              {item.price && <span className={`font-semibold ml-4 ${s === 'bold' ? '' : 'text-brand'}`}>{item.price}</span>}
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
      <FadeUp><h1 className={`text-3xl font-bold mb-10 ${s === 'bold' ? 'uppercase' : ''}`}>Galerie</h1></FadeUp>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img: any, i: number) => (
          <ScaleIn key={i} delay={i * 0.05}>
            <img src={img.url || img} alt={img.alt || ''} className={`w-full aspect-[4/3] object-cover ${s === 'bold' ? 'border-4 border-black' : s === 'modern' ? 'rounded-2xl' : 'rounded-xl'}`} />
          </ScaleIn>
        ))}
      </div>
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
          {contact?.hours?.length ? (
            <div className="mt-6">
              <h3 className="font-semibold text-black mb-2">Öffnungszeiten</h3>
              {contact.hours.map((h, i) => <p key={i}>{h.day}: {h.time}</p>)}
            </div>
          ) : null}
        </div>
        <FadeUp delay={0.1}>
          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            <input type="text" placeholder="Name" className="w-full border rounded-lg px-4 py-3" />
            <input type="email" placeholder="E-Mail" className="w-full border rounded-lg px-4 py-3" />
            <textarea placeholder="Nachricht" rows={4} className="w-full border rounded-lg px-4 py-3" />
            <button type="submit" className="btn-primary w-full py-3 rounded-lg font-semibold">Senden</button>
          </form>
        </FadeUp>
      </div>
    </section>
  );
}

export default function RestaurantTemplate({ content, style = 'classic', industry }: Props) {
  const labels = getNavLabels(industry);
  const nav = [
    { label: 'Home', to: '/' },
    { label: labels.services, to: '/speisekarte' },
    { label: labels.gallery, to: '/galerie' },
    { label: labels.about, to: '/ueber-uns' },
    { label: labels.contact, to: '/kontakt' },
  ];
  return (
    <Layout content={content} style={style} industry={industry} nav={nav}>
      <Routes>
        <Route index element={<HomePage content={content} style={style} industry={industry} />} />
        <Route path="speisekarte" element={<SpeisekartePage content={content} style={style} />} />
        <Route path="galerie" element={<GaleriePage content={content} style={style} />} />
        <Route path="ueber-uns" element={<AboutPage content={content} style={style} />} />
        <Route path="kontakt" element={<KontaktPage content={content} style={style} />} />
      </Routes>
    </Layout>
  );
}
