import { mergeImportedContent } from '../src/lib/content-import';

const merged = mergeImportedContent(
  {
    hero: { title: 'Bestehende Headline', imageUrl: 'https://example.com/demo.jpg' },
    gallery: ['https://example.com/gallery.jpg'],
    testimonials: [{ name: 'Demo', quote: 'Fake Review' }],
    services: [{ title: 'Demo Service', imageUrl: 'https://example.com/service.jpg' }],
    brand: { name: 'Demo Brand', logoUrl: 'https://example.com/logo.svg' },
  },
  {
    hero: { title: '', imageUrl: '' },
    gallery: [],
    testimonials: [],
    services: [{ title: 'Echter Service', imageUrl: '' }],
    brand: { logoUrl: '' },
    _subpage_gallery: {
      galleryHeader: { title: 'Echte Galerie' },
    },
  },
);

const errors: string[] = [];
const hero = merged.hero as { title?: string; imageUrl?: string };
const brand = merged.brand as { logoUrl?: string };
const services = merged.services as Array<{ title?: string; imageUrl?: string }>;
const galleryHeader = merged.galleryHeader as { title?: string };

if (hero.title !== 'Bestehende Headline') errors.push('empty non-media text overwrote existing hero.title');
if (hero.imageUrl !== '') errors.push('empty hero.imageUrl did not clear demo image');
if (brand.logoUrl !== '') errors.push('empty brand.logoUrl did not clear demo logo');
if (!Array.isArray(merged.gallery) || merged.gallery.length !== 0) errors.push('empty gallery array did not clear demo gallery');
if (!Array.isArray(merged.testimonials) || merged.testimonials.length !== 0) errors.push('empty testimonials array did not clear fake demo testimonials');
if (services[0]?.title !== 'Echter Service') errors.push('service row did not import');
if (services[0]?.imageUrl !== '') errors.push('empty nested service imageUrl did not clear demo image');
if (galleryHeader?.title !== 'Echte Galerie') errors.push('_subpage_gallery was not hoisted');

if (errors.length) {
  console.error(`Content import audit FAILED:\n${errors.map((error) => `- ${error}`).join('\n')}`);
  process.exit(1);
}

console.log('Content import audit OK - explicit empty media fields and arrays are respected.');
