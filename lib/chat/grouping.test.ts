import { describe, it, expect } from 'vitest';
import { dayLabel } from './grouping';

// Use local-time noon so the assertions are independent of the runner's timezone
// (dayLabel groups by local calendar day; noon avoids any midnight straddle).
const NOW = new Date(2024, 2, 10, 12, 0, 0); // local 2024-03-10 12:00

describe('dayLabel', () => {
  it('labels today', () => {
    const today = new Date(2024, 2, 10, 8, 0, 0).toISOString();
    expect(dayLabel(today, NOW)).toBe('Today');
  });

  it('labels yesterday', () => {
    const yesterday = new Date(2024, 2, 9, 12, 0, 0).toISOString();
    expect(dayLabel(yesterday, NOW)).toBe('Yesterday');
  });

  it('labels older dates with a locale date string', () => {
    const older = new Date(2024, 2, 1, 8, 0, 0).toISOString();
    const label = dayLabel(older, NOW);
    expect(label).not.toBe('Today');
    expect(label).not.toBe('Yesterday');
    expect(label.length).toBeGreaterThan(0);
  });
});
