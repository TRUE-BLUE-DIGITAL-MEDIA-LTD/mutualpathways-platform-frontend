import axios from 'axios';
import { API_URL } from '../api';
import { validateImageFile } from './validate';

export interface UploadResult {
  key: string;
  contentType: string;
}

export interface UploadOptions {
  receiverId?: string;
  onProgress?: (percent: number) => void;
}

/**
 * Validates an image, asks the server for a signed PUT URL, then uploads the
 * bytes directly to GCS, reporting progress 0-100. Returns the object key.
 */
export async function uploadImage(
  file: File,
  purpose: 'profile' | 'chat',
  opts: UploadOptions = {},
): Promise<UploadResult> {
  const check = validateImageFile(file);
  if (!check.ok) {
    throw new Error(check.error);
  }

  const token = localStorage.getItem('token');
  const { data } = await axios.post(
    `${API_URL}/uploads/sign-upload`,
    { purpose, contentType: file.type, receiverId: opts.receiverId },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  const { uploadUrl, key } = data as { uploadUrl: string; key: string };

  await axios.put(uploadUrl, file, {
    headers: { 'Content-Type': file.type },
    onUploadProgress: (e) => {
      if (opts.onProgress && e.total) {
        opts.onProgress(Math.round((e.loaded / e.total) * 100));
      }
    },
  });

  return { key, contentType: file.type };
}
