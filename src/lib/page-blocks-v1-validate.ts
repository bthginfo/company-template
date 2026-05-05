/**
 * Structural validation for `SiteContent.pageBlocksV1` (Phase 1 CMS).
 * Kept separate from `types.ts` to avoid pulling `section-registry` into odd import cycles.
 */

import type { AdminSectionKey } from '../admin/admin-sections.js';
import { SECTION_CONTRACTS } from './section-registry.js';

const PAGE_KEYS = ['home', 'services', 'gallery', 'about', 'contact'] as const;

/** `type` must match a key in SECTION_CONTRACTS (= AdminSectionKey). */
const VALID_BLOCK_TYPES = new Set(Object.keys(SECTION_CONTRACTS));

/**
 * Block `type` values that may appear at most once per page (home, services, …).
 * @see docs/cms-phase0-block-spec.md
 */
const SINGLETON_TYPES = new Set<string>([
  'hero',
  'announcements',
  'servicesHeader',
  'galleryHeader',
  'aboutHeader',
  'contactHeader',
]);

export function isPageBlockSingletonType(type: string): boolean {
  return SINGLETON_TYPES.has(type);
}

function isPlainRecord(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === 'object' && !Array.isArray(v);
}

/** Top-level keys allowed on `PageBlockInstanceV1.data` for this block `type`. */
function allowedDataRootKeysForBlockType(type: string): Set<string> | null {
  if (!VALID_BLOCK_TYPES.has(type)) return null;
  const contract = SECTION_CONTRACTS[type as AdminSectionKey];
  const roots = new Set<string>();
  for (const dk of contract.dataKeys) {
    const dot = dk.indexOf('.');
    roots.add(dot === -1 ? dk : dk.slice(0, dot));
  }
  return roots;
}

/**
 * Returns human-readable issues; empty = valid.
 * Validates `data` top-level keys against `SECTION_CONTRACTS[type].dataKeys` roots
 * (first path segment). Values stay permissive (`unknown`).
 */
export function collectPageBlocksV1Issues(pageBlocks: unknown): string[] {
  const errors: string[] = [];
  if (pageBlocks === undefined || pageBlocks === null) return errors;
  if (!isPlainRecord(pageBlocks)) {
    errors.push('pageBlocksV1 must be a plain object');
    return errors;
  }

  for (const key of Object.keys(pageBlocks)) {
    if (!PAGE_KEYS.includes(key as (typeof PAGE_KEYS)[number])) {
      errors.push(`pageBlocksV1: unknown page key "${key}"`);
    }
  }

  for (const pageKey of PAGE_KEYS) {
    const list = pageBlocks[pageKey];
    if (list === undefined) continue;
    if (!Array.isArray(list)) {
      errors.push(`pageBlocksV1.${pageKey} must be an array`);
      continue;
    }
    const ids = new Set<string>();
    const singletonCounts = new Map<string, number>();
    for (let i = 0; i < list.length; i++) {
      const inst = list[i];
      const path = `pageBlocksV1.${pageKey}[${i}]`;
      if (!isPlainRecord(inst)) {
        errors.push(`${path} must be an object`);
        continue;
      }
      const id = inst.id;
      const type = inst.type;
      if (typeof id !== 'string' || !id.trim()) {
        errors.push(`${path}.id must be a non-empty string`);
      } else if (ids.has(id)) {
        errors.push(`${path}: duplicate id "${id}" on page "${pageKey}"`);
      } else {
        ids.add(id);
      }
      if (typeof type !== 'string' || !type.trim()) {
        errors.push(`${path}.type must be a non-empty string`);
      } else if (!VALID_BLOCK_TYPES.has(type)) {
        errors.push(`${path}.type "${type}" is not a known block type`);
      } else if (SINGLETON_TYPES.has(type)) {
        const n = (singletonCounts.get(type) ?? 0) + 1;
        singletonCounts.set(type, n);
        if (n > 1) {
          errors.push(`pageBlocksV1.${pageKey}: singleton block type "${type}" must appear at most once`);
        }
      }
      if (inst.isVisible !== undefined && typeof inst.isVisible !== 'boolean') {
        errors.push(`${path}.isVisible must be a boolean`);
      }
      if (inst.data !== undefined && !isPlainRecord(inst.data)) {
        errors.push(`${path}.data must be a plain object`);
      } else if (isPlainRecord(inst.data) && typeof type === 'string' && type.trim()) {
        const allowedRoots = allowedDataRootKeysForBlockType(type);
        if (allowedRoots) {
          for (const k of Object.keys(inst.data)) {
            if (!allowedRoots.has(k)) {
              errors.push(`${path}.data: disallowed key "${k}" for block type "${type}"`);
            }
          }
        }
      }
    }
  }
  return errors;
}
