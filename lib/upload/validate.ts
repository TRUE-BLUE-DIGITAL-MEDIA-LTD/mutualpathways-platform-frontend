export const MAX_IMAGE_BYTES = 26214400; // 25 MB
export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];

export type ValidationResult = { ok: true } | { ok: false; error: string };

export function validateImageFile(file: { type: string; size: number }): ValidationResult {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { ok: false, error: 'Only JPEG, PNG, WebP, or GIF images are allowed' };
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return { ok: false, error: 'Image must be 25 MB or smaller' };
  }
  return { ok: true };
}
