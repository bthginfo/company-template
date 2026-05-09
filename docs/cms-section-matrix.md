# CMS Section Matrix

Stand: 2026-05-09  
Repo-Status: nach Commit `682222a` (`fix: stabilize demo CMS V2 rendering pipeline`)

Diese Datei listet die theoretisch verfügbaren Frontend-/CMS-V2-Sections pro Branche × Stil × Seite und den globalen Field-Catalog.

## Validierungsstatus

Für die unten gelisteten Sections gilt aktuell:

- CMS Field Contract vorhanden: ✅
- Blueprint/Page Contract vorhanden: ✅
- Frontend Renderer oder Renderer-Delegation vorhanden: ✅
- Demo-Hydration füllt Felder: ✅
- `scripts/check-demo-cms-v2-fill.ts`: 0 Empty-Field-Warnings ✅
- `scripts/check-coverage.ts`: OK ✅
- `scripts/check-cms-v2-runtime.ts`: OK ✅

## Matrix pro Branche / Stil / Seite

### restaurant / classic

- home: `hero`, `actionBar`, `featuredDishesGrid`, `storyTeaser`, `videoEmbed`, `galleryPreview`, `labelBand`, `testimonials`, `seasonalHighlight`, `statsBand`, `reservationTeaser`, `newsTeaser`, `cta`
- services: `hero`, `highlightsBar`, `menu`, `steps`, `faq`, `cta`
- gallery: `hero`, `teaserList`, `gallery`, `cta`
- about: `hero`, `teaserList`, `chefStory`, `timeline`, `team`, `trustStrip`, `statsBand`, `expertQuotes`, `badgeWall`, `testimonials`, `cta`
- contact: `hero`, `contactDetails`, `locations`, `directions`, `cta`

### restaurant / modern

- home: `hero`, `actionBar`, `featuredDishesGrid`, `storyTeaser`, `videoEmbed`, `galleryPreview`, `labelBand`, `testimonials`, `seasonalHighlight`, `statsBand`, `reservationTeaser`, `newsTeaser`, `cta`
- services: `hero`, `highlightsBar`, `menu`, `steps`, `faq`, `cta`
- gallery: `hero`, `teaserList`, `gallery`, `cta`
- about: `hero`, `storyFacts`, `teaserList`, `chefStory`, `timeline`, `team`, `trustStrip`, `statsBand`, `expertQuotes`, `badgeWall`, `testimonials`, `cta`
- contact: `hero`, `contactDetails`, `locations`, `directions`, `cta`

### restaurant / bold

- home: `hero`, `marqueeBand`, `actionBar`, `featuredDishes`, `videoEmbed`, `statsBand`, `galleryPreview`, `storyTeaser`, `seasonalHighlight`, `testimonials`, `reservationTeaser`, `newsTeaser`, `cta`
- services: `hero`, `highlightsBar`, `menu`, `steps`, `faq`, `cta`
- gallery: `hero`, `teaserList`, `gallery`, `cta`
- about: `hero`, `teaserList`, `chefStory`, `timeline`, `team`, `trustStrip`, `statsBand`, `expertQuotes`, `badgeWall`, `testimonials`, `cta`
- contact: `hero`, `contactDetails`, `locations`, `directions`, `cta`

### hotel / classic

- home: `hero`, `actionBar`, `featuredAreas`, `storyTeaser`, `videoEmbed`, `galleryPreview`, `seasonalHighlight`, `testimonials`, `statsBand`, `newsTeaser`, `cta`
- services: `hero`, `highlightsBar`, `accommodationsGrid`, `experiencePackages`, `amenitiesGrid`, `steps`, `faq`, `cta`
- gallery: `hero`, `teaserList`, `gallery`, `cta`
- about: `hero`, `teaserList`, `timeline`, `team`, `trustStrip`, `statsBand`, `badgeWall`, `testimonials`, `cta`
- contact: `hero`, `contactDetails`, `locations`, `directions`, `cta`

### hotel / modern

- home: `hero`, `actionBar`, `galleryPreview`, `brandLogos`, `featuredAreas`, `videoEmbed`, `storyTeaser`, `seasonalHighlight`, `statsBand`, `testimonials`, `newsTeaser`, `cta`
- services: `hero`, `highlightsBar`, `accommodationsGrid`, `experiencePackages`, `amenitiesGrid`, `steps`, `faq`, `cta`
- gallery: `hero`, `teaserList`, `gallery`, `cta`
- about: `hero`, `storyFacts`, `teaserList`, `timeline`, `team`, `trustStrip`, `statsBand`, `badgeWall`, `testimonials`, `cta`
- contact: `hero`, `contactDetails`, `locations`, `directions`, `cta`

### hotel / bold

- home: `hero`, `marqueeBand`, `actionBar`, `galleryPreview`, `roomSelection`, `videoEmbed`, `statsBand`, `seasonalHighlight`, `storyTeaser`, `testimonialMarquee`, `testimonials`, `newsTeaser`, `cta`
- services: `hero`, `highlightsBar`, `accommodationList`, `experiencePackages`, `amenitiesGrid`, `steps`, `faq`, `cta`
- gallery: `hero`, `teaserList`, `gallery`, `cta`
- about: `hero`, `teaserList`, `timeline`, `team`, `trustStrip`, `statsBand`, `badgeWall`, `testimonials`, `cta`
- contact: `hero`, `contactDetails`, `locations`, `directions`, `cta`

### tourism / classic

- home: `hero`, `actionBar`, `galleryPreview`, `tourSchedule`, `videoEmbed`, `storyTeaser`, `seasonalHighlight`, `testimonials`, `statsBand`, `newsTeaser`, `cta`
- services: `hero`, `highlightsBar`, `tourOverviewCards`, `steps`, `faq`, `cta`
- gallery: `hero`, `teaserList`, `gallery`, `cta`
- about: `hero`, `teaserList`, `timeline`, `team`, `trustStrip`, `statsBand`, `badgeWall`, `testimonials`, `cta`
- contact: `hero`, `contactDetails`, `locations`, `directions`, `cta`

### tourism / modern

- home: `hero`, `actionBar`, `tourSchedule`, `galleryPreview`, `brandLogos`, `videoEmbed`, `statsBand`, `storyTeaser`, `seasonalHighlight`, `testimonials`, `newsTeaser`, `cta`
- services: `hero`, `highlightsBar`, `tourOverviewCards`, `steps`, `faq`, `cta`
- gallery: `hero`, `teaserList`, `gallery`, `cta`
- about: `hero`, `storyFacts`, `teaserList`, `timeline`, `team`, `trustStrip`, `statsBand`, `badgeWall`, `testimonials`, `cta`
- contact: `hero`, `contactDetails`, `locations`, `directions`, `cta`

### tourism / bold

- home: `hero`, `marqueeBand`, `actionBar`, `galleryPreview`, `statsBand`, `tourSelection`, `videoEmbed`, `storyTeaser`, `seasonalHighlight`, `testimonialMarquee`, `testimonials`, `newsTeaser`, `cta`
- services: `hero`, `highlightsBar`, `tourOverviewList`, `steps`, `faq`, `cta`
- gallery: `hero`, `teaserList`, `gallery`, `cta`
- about: `hero`, `teaserList`, `timeline`, `team`, `trustStrip`, `statsBand`, `badgeWall`, `testimonials`, `cta`
- contact: `hero`, `contactDetails`, `locations`, `directions`, `cta`

### salon / classic

- home: `hero`, `actionBar`, `featuredServices`, `storyTeaser`, `videoEmbed`, `galleryPreview`, `testimonials`, `statsBand`, `newsTeaser`, `cta`
- services: `hero`, `highlightsBar`, `serviceOverviewCards`, `productLine`, `steps`, `faq`, `cta`
- gallery: `hero`, `teaserList`, `gallery`, `projectShowcase`, `lookBook`, `cta`
- about: `hero`, `teaserList`, `timeline`, `team`, `trustStrip`, `statsBand`, `badgeWall`, `testimonials`, `cta`
- contact: `hero`, `contactDetails`, `locations`, `directions`, `cta`

### salon / modern

- home: `hero`, `actionBar`, `featuredLooks`, `galleryPreview`, `brandLogos`, `videoEmbed`, `testimonials`, `storyTeaser`, `statsBand`, `newsTeaser`, `cta`
- services: `hero`, `highlightsBar`, `serviceOverviewCards`, `productLine`, `steps`, `faq`, `cta`
- gallery: `hero`, `teaserList`, `gallery`, `projectShowcase`, `lookBook`, `cta`
- about: `hero`, `storyFacts`, `teaserList`, `timeline`, `team`, `trustStrip`, `statsBand`, `badgeWall`, `testimonials`, `cta`
- contact: `hero`, `contactDetails`, `locations`, `directions`, `cta`

### salon / bold

- home: `hero`, `marqueeBand`, `featureImage`, `actionBar`, `galleryPreview`, `featuredLooksBand`, `videoEmbed`, `storySplit`, `statsBand`, `testimonialMarquee`, `quoteWall`, `newsTeaser`, `ctaBand`
- services: `hero`, `highlightsBar`, `serviceOverviewList`, `productLine`, `steps`, `faq`, `cta`
- gallery: `hero`, `teaserList`, `gallery`, `projectShowcase`, `lookBook`, `cta`
- about: `hero`, `teaserList`, `timeline`, `team`, `trustStrip`, `statsBand`, `badgeWall`, `testimonials`, `cta`
- contact: `hero`, `contactDetails`, `locations`, `directions`, `cta`

### tradesman / classic

- home: `hero`, `stickyEmergencyBanner`, `actionBar`, `featuredServices`, `fundingCalculator`, `statsBand`, `videoEmbed`, `galleryPreview`, `responsePromise`, `newsHighlightList`, `testimonials`, `storyTeaser`, `newsTeaser`, `cta`
- services: `hero`, `stickyEmergencyBanner`, `highlightsBar`, `serviceOverviewCards`, `fundingCalculator`, `steps`, `faq`, `cta`
- gallery: `hero`, `teaserList`, `gallery`, `projectShowcase`, `categoryCards`, `cta`
- about: `hero`, `storyImageSplit`, `teaserList`, `timeline`, `team`, `trustStrip`, `statsBand`, `qualifications`, `badgeWall`, `testimonials`, `cta`
- contact: `hero`, `contactDetails`, `serviceAreaMap`, `locations`, `directions`, `cta`

### tradesman / modern

- home: `hero`, `stickyEmergencyBanner`, `actionBar`, `statsBand`, `serviceCards`, `fundingCalculator`, `topicCards`, `videoEmbed`, `galleryPreview`, `responsePromise`, `keywordBand`, `storyTeaser`, `testimonials`, `newsTeaser`, `cta`
- services: `hero`, `stickyEmergencyBanner`, `highlightsBar`, `serviceCards`, `fundingCalculator`, `steps`, `faq`, `cta`
- gallery: `hero`, `teaserList`, `gallery`, `projectShowcase`, `categoryCards`, `cta`
- about: `hero`, `teaserList`, `timeline`, `team`, `trustStrip`, `statsBand`, `qualifications`, `badgeWall`, `testimonials`, `cta`
- contact: `hero`, `contactDetails`, `serviceAreaMap`, `locations`, `directions`, `cta`

### tradesman / bold

- home: `hero`, `stickyEmergencyBanner`, `marqueeBand`, `featureImage`, `actionBar`, `serviceList`, `fundingCalculator`, `topicBand`, `videoEmbed`, `galleryPreview`, `responsePromise`, `statsBand`, `storySplit`, `testimonialMarquee`, `quoteWall`, `newsTeaser`, `ctaBand`
- services: `hero`, `stickyEmergencyBanner`, `highlightsBar`, `serviceList`, `fundingCalculator`, `steps`, `faq`, `cta`
- gallery: `hero`, `teaserList`, `gallery`, `projectShowcase`, `categoryCards`, `cta`
- about: `hero`, `storyImageSplit`, `teaserList`, `timeline`, `team`, `trustStrip`, `statsBand`, `qualifications`, `badgeWall`, `testimonials`, `cta`
- contact: `hero`, `contactDetails`, `serviceAreaMap`, `locations`, `directions`, `cta`

### consulting / classic

- home: `hero`, `actionBar`, `keywordBand`, `storyTeaser`, `serviceCards`, `processTextColumns`, `pricingPackages`, `caseStudyCards`, `team`, `videoEmbed`, `galleryPreview`, `testimonials`, `newsTeaser`, `contactPreview`
- services: `hero`, `highlightsBar`, `serviceCards`, `comparisonTable`, `processCards`, `pricingPackages`, `testimonials`, `galleryPreview`, `faq`, `cta`
- gallery: `hero`, `teaserList`, `gallery`, `categoryCards`, `testimonials`, `cta`
- about: `hero`, `teaserList`, `timeline`, `team`, `trustStrip`, `statsBand`, `impactNumbers`, `badgeWall`, `testimonials`, `cta`
- contact: `hero`, `contactDetails`, `locations`, `directions`, `cta`

### consulting / modern

- home: `hero`, `actionBar`, `serviceCards`, `galleryPreview`, `brandLogos`, `storyTeaser`, `processTextColumns`, `pricingPackages`, `caseStudyCards`, `team`, `videoEmbed`, `statsBand`, `testimonials`, `newsTeaser`, `contactPreview`
- services: `hero`, `highlightsBar`, `serviceCards`, `comparisonTable`, `processCards`, `pricingPackages`, `testimonials`, `galleryPreview`, `faq`, `cta`
- gallery: `hero`, `teaserList`, `gallery`, `categoryCards`, `testimonials`, `cta`
- about: `hero`, `storyFacts`, `teaserList`, `timeline`, `team`, `trustStrip`, `statsBand`, `impactNumbers`, `badgeWall`, `testimonials`, `cta`
- contact: `hero`, `contactDetails`, `locations`, `directions`, `cta`

### consulting / bold

- home: `hero`, `marqueeBand`, `featureImage`, `actionBar`, `serviceCards`, `processTextColumns`, `pricingPackages`, `caseStudyCards`, `galleryPreview`, `videoEmbed`, `statsBand`, `storySplit`, `team`, `testimonialMarquee`, `quoteWall`, `newsTeaser`, `ctaBand`
- services: `hero`, `highlightsBar`, `serviceCards`, `comparisonTable`, `processCards`, `pricingPackages`, `testimonials`, `galleryPreview`, `faq`, `ctaBand`
- gallery: `hero`, `teaserList`, `gallery`, `categoryCards`, `testimonials`, `cta`
- about: `hero`, `teaserList`, `timeline`, `team`, `trustStrip`, `statsBand`, `impactNumbers`, `badgeWall`, `testimonials`, `cta`
- contact: `hero`, `contactDetails`, `locations`, `directions`, `cta`

### medical / classic

- home: `hero`, `actionBar`, `keywordBand`, `storyTeaser`, `serviceCards`, `serviceInfo`, `team`, `appointmentBooking`, `videoEmbed`, `galleryPreview`, `testimonials`, `newsTeaser`, `contactPreview`
- services: `hero`, `highlightsBar`, `serviceCards`, `comparisonTable`, `insuranceInfo`, `team`, `appointmentBooking`, `testimonials`, `galleryPreview`, `faq`, `cta`
- gallery: `hero`, `teaserList`, `gallery`, `categoryCards`, `testimonials`, `cta`
- about: `hero`, `teaserList`, `timeline`, `team`, `trustStrip`, `statsBand`, `badgeWall`, `testimonials`, `cta`
- contact: `hero`, `contactDetails`, `locations`, `directions`, `cta`

### medical / modern

- home: `hero`, `actionBar`, `serviceCards`, `galleryPreview`, `brandLogos`, `storyTeaser`, `serviceInfo`, `team`, `appointmentBooking`, `videoEmbed`, `statsBand`, `testimonials`, `newsTeaser`, `contactPreview`
- services: `hero`, `highlightsBar`, `serviceCards`, `comparisonTable`, `insuranceInfo`, `team`, `appointmentBooking`, `testimonials`, `galleryPreview`, `faq`, `cta`
- gallery: `hero`, `teaserList`, `gallery`, `categoryCards`, `testimonials`, `cta`
- about: `hero`, `storyFacts`, `teaserList`, `timeline`, `team`, `trustStrip`, `statsBand`, `badgeWall`, `testimonials`, `cta`
- contact: `hero`, `contactDetails`, `locations`, `directions`, `cta`

### medical / bold

- home: `hero`, `marqueeBand`, `featureImage`, `actionBar`, `serviceCards`, `serviceInfo`, `galleryPreview`, `videoEmbed`, `statsBand`, `storySplit`, `team`, `appointmentBooking`, `testimonialMarquee`, `quoteWall`, `newsTeaser`, `ctaBand`
- services: `hero`, `highlightsBar`, `serviceCards`, `comparisonTable`, `insuranceInfo`, `team`, `appointmentBooking`, `testimonials`, `galleryPreview`, `faq`, `ctaBand`
- gallery: `hero`, `teaserList`, `gallery`, `categoryCards`, `testimonials`, `cta`
- about: `hero`, `teaserList`, `timeline`, `team`, `trustStrip`, `statsBand`, `badgeWall`, `testimonials`, `cta`
- contact: `hero`, `contactDetails`, `locations`, `directions`, `cta`

### fitness / classic

- home: `hero`, `actionBar`, `keywordBand`, `storyTeaser`, `classCards`, `trainingPlanOverview`, `programTable`, `pricingPackages`, `trialCta`, `trainers`, `videoEmbed`, `galleryPreview`, `seasonalHighlight`, `challengeSpotlight`, `testimonials`, `newsTeaser`, `contactPreview`
- services: `hero`, `highlightsBar`, `classCards`, `trainingPlanOverview`, `programTable`, `comparisonTable`, `pricingPackages`, `testimonials`, `galleryPreview`, `faq`, `cta`
- gallery: `hero`, `teaserList`, `gallery`, `categoryCards`, `testimonials`, `cta`
- about: `hero`, `teaserList`, `timeline`, `team`, `trustStrip`, `statsBand`, `badgeWall`, `testimonials`, `cta`
- contact: `hero`, `contactDetails`, `locations`, `directions`, `cta`

### fitness / modern

- home: `hero`, `actionBar`, `classCards`, `galleryPreview`, `brandLogos`, `storyTeaser`, `trainingPlanOverview`, `programTable`, `pricingPackages`, `trialCta`, `trainers`, `videoEmbed`, `seasonalHighlight`, `challengeSpotlight`, `statsBand`, `testimonials`, `newsTeaser`, `contactPreview`
- services: `hero`, `highlightsBar`, `classCards`, `trainingPlanOverview`, `programTable`, `comparisonTable`, `pricingPackages`, `testimonials`, `galleryPreview`, `faq`, `cta`
- gallery: `hero`, `teaserList`, `gallery`, `categoryCards`, `testimonials`, `cta`
- about: `hero`, `storyFacts`, `teaserList`, `timeline`, `team`, `trustStrip`, `statsBand`, `badgeWall`, `testimonials`, `cta`
- contact: `hero`, `contactDetails`, `locations`, `directions`, `cta`

### fitness / bold

- home: `hero`, `marqueeBand`, `featureImage`, `actionBar`, `classCards`, `trainingPlanOverview`, `programTable`, `pricingPackages`, `trialCta`, `videoEmbed`, `galleryPreview`, `seasonalHighlight`, `challengeSpotlight`, `statsBand`, `storySplit`, `trainers`, `testimonialMarquee`, `quoteWall`, `newsTeaser`, `ctaBand`
- services: `hero`, `highlightsBar`, `classCards`, `trainingPlanOverview`, `programTable`, `comparisonTable`, `pricingPackages`, `testimonials`, `galleryPreview`, `faq`, `ctaBand`
- gallery: `hero`, `teaserList`, `gallery`, `categoryCards`, `testimonials`, `cta`
- about: `hero`, `teaserList`, `timeline`, `team`, `trustStrip`, `statsBand`, `badgeWall`, `testimonials`, `cta`
- contact: `hero`, `contactDetails`, `locations`, `directions`, `cta`

### wedding / classic

- home: `hero`, `actionBar`, `keywordBand`, `storyTeaser`, `serviceCards`, `processTextColumns`, `team`, `videoEmbed`, `galleryPreview`, `testimonials`, `newsTeaser`, `contactPreview`
- services: `hero`, `highlightsBar`, `serviceCards`, `processCards`, `testimonials`, `galleryPreview`, `faq`, `cta`
- gallery: `hero`, `teaserList`, `gallery`, `categoryCards`, `testimonials`, `cta`
- about: `hero`, `teaserList`, `timeline`, `team`, `venueShowcase`, `trustStrip`, `statsBand`, `badgeWall`, `testimonials`, `cta`
- contact: `hero`, `contactDetails`, `rsvpForm`, `locations`, `directions`, `cta`

### wedding / modern

- home: `hero`, `actionBar`, `serviceCards`, `galleryPreview`, `brandLogos`, `storyTeaser`, `processTextColumns`, `team`, `videoEmbed`, `statsBand`, `testimonials`, `newsTeaser`, `contactPreview`
- services: `hero`, `highlightsBar`, `serviceCards`, `processCards`, `testimonials`, `galleryPreview`, `faq`, `cta`
- gallery: `hero`, `teaserList`, `gallery`, `categoryCards`, `testimonials`, `cta`
- about: `hero`, `storyFacts`, `teaserList`, `timeline`, `team`, `venueShowcase`, `trustStrip`, `statsBand`, `badgeWall`, `testimonials`, `cta`
- contact: `hero`, `contactDetails`, `rsvpForm`, `locations`, `directions`, `cta`

### wedding / bold

- home: `hero`, `marqueeBand`, `featureImage`, `actionBar`, `serviceCards`, `processTextColumns`, `videoEmbed`, `galleryPreview`, `statsBand`, `storySplit`, `team`, `testimonialMarquee`, `quoteWall`, `newsTeaser`, `ctaBand`
- services: `hero`, `highlightsBar`, `serviceCards`, `processCards`, `testimonials`, `galleryPreview`, `faq`, `ctaBand`
- gallery: `hero`, `teaserList`, `gallery`, `categoryCards`, `testimonials`, `cta`
- about: `hero`, `teaserList`, `timeline`, `team`, `venueShowcase`, `trustStrip`, `statsBand`, `badgeWall`, `testimonials`, `cta`
- contact: `hero`, `contactDetails`, `rsvpForm`, `locations`, `directions`, `cta`

---

## Field Catalog

| Section | Felder |
|---|---|
| `accommodationList` | `eyebrow`, `headline`, `description`, `items` |
| `accommodationsGrid` | `eyebrow`, `headline`, `description`, `items` |
| `actionBar` | `autoAvailabilityStatusEnabled`, `availabilityStatusOverride`, `buttonPrimary`, `buttonSecondary` |
| `amenitiesGrid` | `eyebrow`, `headline`, `description`, `items` |
| `appointmentBooking` | `eyebrow`, `headline`, `description`, `items` |
| `badgeWall` | `eyebrow`, `headline`, `items` |
| `brandLogos` | `items` |
| `caseStudyCards` | `eyebrow`, `headline`, `description`, `items` |
| `categoryCards` | `eyebrow`, `headline`, `items` |
| `challengeSpotlight` | `eyebrow`, `headline`, `description`, `image`, `button` |
| `chefStory` | `eyebrow`, `headline`, `description`, `image` |
| `classCards` | `eyebrow`, `headline`, `description`, `items` |
| `comparisonTable` | `eyebrow`, `headline`, `description`, `items` |
| `contactDetails` | `eyebrow`, `headline`, `subline`, `googleMapsUrl`, `additionalFormFields` |
| `contactPreview` | `eyebrow`, `headline`, `description` |
| `cta` | `eyebrow`, `headline`, `subline`, `button` |
| `ctaBand` | `eyebrow`, `headline`, `subline`, `button` |
| `directions` | `eyebrow`, `headline`, `subline`, `items` |
| `experiencePackages` | `eyebrow`, `headline`, `description`, `items` |
| `expertQuotes` | `eyebrow`, `headline`, `items` |
| `faq` | `eyebrow`, `headline`, `items` |
| `featureImage` | `image` |
| `featuredAreas` | `eyebrow`, `headline`, `description`, `items` |
| `featuredDishes` | `eyebrow`, `headline`, `items` |
| `featuredDishesGrid` | `eyebrow`, `titleA`, `titleB`, `description`, `items` |
| `featuredLooks` | `eyebrow`, `headline`, `description`, `items` |
| `featuredLooksBand` | `eyebrow`, `headline`, `description`, `items` |
| `featuredServices` | `eyebrow`, `headline`, `description`, `items` |
| `fundingCalculator` | `investmentMin`, `investmentMax`, `investmentStep`, `investmentDefault`, `programs` |
| `gallery` | `images` |
| `galleryPreview` | `eyebrow`, `headline`, `images`, `button` |
| `hero` | `eyebrow`, `headline`, `subline`, `description`, `backgroundImage`, `image`, `buttonPrimary`, `stats` |
| `highlightsBar` | `items` |
| `impactNumbers` | `eyebrow`, `headline`, `description`, `items` |
| `insuranceInfo` | `eyebrow`, `headline`, `description`, `items` |
| `keywordBand` | `items` |
| `labelBand` | `labels` |
| `locations` | `locations` |
| `lookBook` | `eyebrow`, `headline`, `description`, `items` |
| `marqueeBand` | `items` |
| `menu` | `categories`, `eyebrow`, `titleA`, `titleB`, `subtitle` |
| `newsHighlightList` | `eyebrow`, `headline`, `featuredImage`, `posts` |
| `newsTeaser` | `eyebrow`, `headline`, `button` |
| `pricingPackages` | `eyebrow`, `headline`, `description`, `items` |
| `processCards` | `eyebrow`, `headline`, `description`, `items` |
| `processTextColumns` | `eyebrow`, `headline`, `description`, `items` |
| `productLine` | `eyebrow`, `headline`, `description`, `items` |
| `programTable` | `eyebrow`, `headline`, `rows` |
| `projectShowcase` | `eyebrow`, `headline`, `description`, `items` |
| `qualifications` | `eyebrow`, `headline`, `description`, `items` |
| `quoteWall` | `items` |
| `reservationTeaser` | `eyebrow`, `headline`, `description`, `button` |
| `responsePromise` | `eyebrow`, `headline`, `description`, `items` |
| `roomSelection` | `eyebrow`, `headline`, `description`, `items` |
| `rsvpForm` | `eyebrow`, `headline`, `description`, `button` |
| `seasonalHighlight` | `eyebrow`, `headline`, `description`, `image`, `button` |
| `serviceAreaMap` | `eyebrow`, `headline`, `description`, `items` |
| `serviceCards` | `eyebrow`, `headline`, `description`, `items` |
| `serviceInfo` | `eyebrow`, `headline`, `description`, `items` |
| `serviceList` | `eyebrow`, `headline`, `description`, `items` |
| `serviceOverviewCards` | `eyebrow`, `headline`, `description`, `items` |
| `serviceOverviewList` | `eyebrow`, `headline`, `description`, `items` |
| `statsBand` | `items` |
| `steps` | `eyebrow`, `headline`, `items` |
| `stickyEmergencyBanner` | `phone`, `label`, `headline` |
| `storyFacts` | `description`, `items` |
| `storyImageSplit` | `eyebrow`, `headline`, `description` |
| `storySplit` | `eyebrow`, `headline`, `description` |
| `storyTeaser` | `eyebrow`, `headline`, `description`, `image`, `button` |
| `team` | `eyebrow`, `headline`, `items` |
| `teaserList` | `eyebrow`, `headline`, `intro`, `description`, `items` |
| `testimonialMarquee` | `items` |
| `testimonials` | `eyebrow`, `headline`, `testimonials`, `items` |
| `timeline` | `items` |
| `topicBand` | `headline`, `subline`, `phone`, `items` |
| `topicCards` | `items` |
| `tourOverviewCards` | `eyebrow`, `headline`, `description`, `items` |
| `tourOverviewList` | `eyebrow`, `headline`, `description`, `items` |
| `tourSchedule` | `eyebrow`, `headline`, `description`, `items` |
| `tourSelection` | `eyebrow`, `headline`, `description`, `items` |
| `trainers` | `eyebrow`, `headline`, `items` |
| `trainingPlanOverview` | `eyebrow`, `headline`, `description`, `items` |
| `trialCta` | `eyebrow`, `headline`, `description`, `button` |
| `trustStrip` | `items` |
| `venueShowcase` | `eyebrow`, `headline`, `description`, `items`, `image` |
| `videoEmbed` | `eyebrow`, `headline`, `description`, `videoUrl`, `image` |

## Hinweise

- Die Liste wird aus den CMS/Page-Contracts in [src/lib/cms-contract.ts](../src/lib/cms-contract.ts) abgeleitet.
- Die Demo-Füllung kommt aus [src/lib/cms-v2-hydration.ts](../src/lib/cms-v2-hydration.ts).
- Frontend-Rendering/Delegation liegt primär in [src/templates/_shared/TemplateApp.tsx](../src/templates/_shared/TemplateApp.tsx) und für Extra-Branches in [src/templates/_shared/extra/ExtraBranchTemplate.tsx](../src/templates/_shared/extra/ExtraBranchTemplate.tsx).
