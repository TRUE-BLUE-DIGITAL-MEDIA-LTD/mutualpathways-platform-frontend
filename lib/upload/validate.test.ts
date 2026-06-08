import { describe, it, expect } from 'vitest';
import { validateImageFile, MAX_IMAGE_BYTES } from './validate';

describe('validateImageFile', () => {
  it('accepts a valid jpeg under the size cap', () => {
    expect(validateImageFile({ type: 'image/jpeg', size: 1000 })).toEqual({ ok: true });
  });

  it('rejects a non-image type', () => {
    const r = validateImageFile({ type: 'application/pdf', size: 1000 });
    expect(r.ok).toBe(false);
  });

  it('rejects an oversize image', () => {
    const r = validateImageFile({ type: 'image/png', size: MAX_IMAGE_BYTES + 1 });
    expect(r.ok).toBe(false);
  });
});
