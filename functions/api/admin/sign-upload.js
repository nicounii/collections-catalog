import { json, cloudinarySignature } from './_lib.js';

export async function onRequestPost({ env }) {
  if (!env.CLOUDINARY_CLOUD_NAME || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET) {
    return json({ ok: false, error: 'Cloudinary not configured' }, 500);
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = env.CLOUDINARY_FOLDER || 'sale-catalog';
  const params = { folder, timestamp };

  if (env.CLOUDINARY_UPLOAD_PRESET) {
    params.upload_preset = env.CLOUDINARY_UPLOAD_PRESET;
  }

  const signature = await cloudinarySignature(params, env.CLOUDINARY_API_SECRET);

  return json({
    cloudName: env.CLOUDINARY_CLOUD_NAME,
    apiKey: env.CLOUDINARY_API_KEY,
    timestamp,
    signature,
    folder,
    uploadPreset: env.CLOUDINARY_UPLOAD_PRESET || null
  });
}
