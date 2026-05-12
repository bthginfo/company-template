/** Motion tokens — timing constants used across animations */
export const DURATION = { fast: 0.2, normal: 0.4, slow: 0.6, hero: 0.8 } as const;
export const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;
export const SPRING_GENTLE = { type: 'spring', stiffness: 120, damping: 14 } as const;
