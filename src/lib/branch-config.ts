import type { TemplateStyle } from './types';

/** Branch-specific configuration (routes, features, etc.) */
export interface BranchConfig {
  name: string;
  paths: Record<string, string>;
  serviceLabel: string;
}

export type { TemplateStyle };

/** Get branch configuration for a given template/industry key */
export function getBranchConfig(_key: string): BranchConfig {
  return {
    name: '',
    paths: { services: '/leistungen', gallery: '/galerie', about: '/ueber-uns', contact: '/kontakt' },
    serviceLabel: 'Leistungen',
  };
}

/** All supported template variants for e2e testing */
export const ALL_VARIANTS = [
  'restaurant', 'salon', 'tradesman', 'hochzeit',
  'hotel', 'cafe', 'arzt', 'zahnarzt', 'physio', 'yoga', 'kosmetik', 'spa',
  'fitness', 'anwalt', 'berater', 'immobilien', 'fotograf', 'event-location',
] as const;
