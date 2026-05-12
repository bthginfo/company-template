import { Routes, Route, Link, NavLink } from 'react-router-dom';
import type { SiteContent, TemplateStyle } from '@/lib/types';
import { FadeUp, ScaleIn, Stagger, StaggerItem } from '@/lib/motion.tsx';
import { getNavLabels } from '@/lib/types';

interface Props { content: SiteContent; style?: TemplateStyle; industry?: string }

function Layout({ children, content, style = 'classic', nav }: Props & { children: React.ReactNode; nav: { label: string; to: string }[] }) {
  const s = style;
  return (
    <div className="min-h-screen flex flex-col">
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b ${s === 'bold' ? 'border-black border-b-4' : 'border-black/5'} bg-white/90`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-bold text-lg">{content.brand.name || 'Salon'}</Link>
          <nav className="hidden md:flex gap-6 text-sm">
            {nav.map(n => <NavLink key={n.to} to={n.to} className={({isActive}) => isActive ? 'text-brand font-semibold' : 'hover:text-brand transition-colors'}>{n.label}</NavLink>)}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className={`py-12 text-center text-sm ${s === 'bold' ? 'bg-black text-white border-t-4' : 'bg-slate-50 text-slate-500'}`}>
        <p>© {new Date().getFullYear()} {content.brand.name}</p>
      </footer>
    </div>
  );
}

function Hero({ content, style = 'classic' }: Props) {
  const overlay = style === 'bold' ? 'bg-black/70' : style === 'modern' ? 'bg-black/40' : 'bg-black/50';
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center text-white">
      <div className={`absolute inset-0 ${overlay}`} />
      <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80" alt="" className="absolute inset-0 w-full h-full object-cover -z-10" />
      <div className="relative text-center px-6 max-w-2xl">
        <FadeUp><h1 className={`${style === 'bold' ? 'text-6xl md:text-8xl font-black tracking-tight uppercase' : 'text-4xl md:text-6xl font-bold'}`}>{content.brand.name}</h1></FadeUp>
        <FadeUp delay={0.15}><p className="mt-4 text-lg opacity-90">{content.brand.tagline}</p></FadeUp>
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
        <FadeUp><h2 className={`text-3xl font-bold text-center mb-12 ${s === 'bold' ? 'uppercase tracking-tight' : ''}`}>Unsere Leistungen</h2></FadeUp>
        <Stagger className="grid md:grid-cols-2 gap-4">
          {services.map((item: any, i: number) => (
            <StaggerItem key={i}>
              <div className={`flex justify-between items-center p-5 transition-all duration-300 group ${s === 'bold' ? 'border-b-4 border-black hover:bg-black hover:text-white' : s === 'modern' ? 'border-b border-slate-200 hover:bg-slate-50 rounded-lg' : 'border-b border-black/10 hover:bg-slate-50 rounded-lg'}`}>
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  {item.description && <p className="text-sm text-slate-500 mt-0.5 group-hover:opacity-90">{item.description}</p>}
                </div>
                {item.price && <span className={`font-medium ${s === 'bold' ? 'group-hover:text-white' : 'text-brand'}`}>{item.price}</span>}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
      {(content as any).testimonials?.length > 0 && (
        <section className={`py-16 ${s === 'bold' ? 'bg-black text-white' : 'bg-slate-50'}`}>
          <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-6">
            {(content as any).testimonials.slice(0, 4).map((t: any, i: number) => (
              <FadeUp key={i} delay={i * 0.1}>
                <blockquote className={`p-6 ${s === 'bold' ? 'border-4 border-white bg-white text-black' : 'rounded-2xl bg-white shadow-sm'}`}>
                  <p className="italic">"{t.text}"</p>
                  <cite className="mt-3 block text-sm font-semibold not-italic">— {t.author}</cite>
                </blockquote>
              </FadeUp>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function LeistungenPage({ content, style = 'classic' }: Props) {
  const s = style;
  const services = (content as any).services ?? [];
  return (
    <section className="py-20 max-w-4xl mx-auto px-6">
      <FadeUp><h1 className={`text-3xl font-bold mb-10 ${s === 'bold' ? 'uppercase' : ''}`}>Leistungen & Preise</h1></FadeUp>
      <div className="space-y-3">
        {services.map((item: any, i: number) => (
          <FadeUp key={i} delay={i * 0.03}>
            <div className={`flex justify-between items-baseline py-4 px-4 transition-all ${s === 'bold' ? 'border-b-4 border-black hover:bg-black hover:text-white' : s === 'modern' ? 'border-b border-slate-200 hover:bg-slate-50 rounded-lg' : 'border-b border-black/10'}`}>
              <div>
                <span className="font-medium">{item.name}</span>
                {item.duration && <span className="ml-2 text-xs text-slate-400">{item.duration}</span>}
              </div>
              {item.price && <span className={`font-semibold ${s === 'bold' ? '' : 'text-brand'}`}>{item.price}</span>}
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function TeamPage({ content, style = 'classic' }: Props) {
  const s = style;
  const team = (content as any).team ?? [];
  return (
    <section className="py-20 max-w-6xl mx-auto px-6">
      <FadeUp><h1 className={`text-3xl font-bold mb-10 ${s === 'bold' ? 'uppercase' : ''}`}>Unser Team</h1></FadeUp>
      <div className="grid md:grid-cols-3 gap-8">
        {team.map((member: any, i: number) => (
          <ScaleIn key={i} delay={i * 0.1}>
            <div className="text-center">
              {member.imageUrl && <img src={member.imageUrl} alt={member.name} className={`w-40 h-40 mx-auto object-cover mb-4 ${s === 'bold' ? 'border-4 border-black' : 'rounded-full'}`} />}
              <h3 className="font-semibold">{member.name}</h3>
              {member.role && <p className="text-sm text-slate-500">{member.role}</p>}
            </div>
          </ScaleIn>
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
      <div className={`${s === 'modern' ? 'columns-2 md:columns-3 gap-4' : 'grid grid-cols-2 md:grid-cols-3 gap-4'}`}>
        {images.map((img: any, i: number) => (
          <ScaleIn key={i} delay={i * 0.05}>
            <div className={s === 'modern' ? 'break-inside-avoid mb-4' : ''}>
              <img src={img.url || img} alt={img.alt || ''} className={`w-full ${s === 'modern' ? 'rounded-2xl' : s === 'bold' ? 'border-4 border-black aspect-[3/4] object-cover' : 'rounded-xl aspect-[3/4] object-cover'}`} />
            </div>
          </ScaleIn>
        ))}
      </div>
    </section>
  );
}

function KontaktPage({ content, style: _s = 'classic' }: Props) {
  const contact = content.contact;
  const social = (content as any).social;
  return (
    <section className="py-20 max-w-4xl mx-auto px-6">
      <FadeUp><h1 className="text-3xl font-bold mb-8">Kontakt & Termin</h1></FadeUp>
      {social?.bookingUrl && (
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Online-Termin buchen</h2>
          <iframe src={social.bookingUrl} className="w-full h-[500px] rounded-xl border" title="Online Buchung" />
        </div>
      )}
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
          <textarea placeholder="Nachricht" rows={4} className="w-full border rounded-lg px-4 py-3" />
          <button type="submit" className="btn-primary w-full py-3 rounded-lg font-semibold">Senden</button>
        </form>
      </div>
    </section>
  );
}

export default function SalonTemplate({ content, style = 'classic', industry }: Props) {
  const labels = getNavLabels(industry);
  const nav = [
    { label: 'Home', to: '/' },
    { label: labels.services, to: '/leistungen' },
    { label: 'Team', to: '/team' },
    { label: labels.gallery, to: '/galerie' },
    { label: labels.contact, to: '/kontakt' },
  ];
  return (
    <Layout content={content} style={style} industry={industry} nav={nav}>
      <Routes>
        <Route index element={<HomePage content={content} style={style} industry={industry} />} />
        <Route path="leistungen" element={<LeistungenPage content={content} style={style} />} />
        <Route path="team" element={<TeamPage content={content} style={style} />} />
        <Route path="galerie" element={<GaleriePage content={content} style={style} />} />
        <Route path="kontakt" element={<KontaktPage content={content} style={style} />} />
      </Routes>
    </Layout>
  );
}
