// src/lib/cloudinary.js
// Cloudinary delivery-URL helper.
//
// Only transforms URLs that are actually Cloudinary delivery URLs
// (res.cloudinary.com + /image/upload/). Local paths (/photos/...), empty
// strings, and undefined pass through untouched, so the glyph fallback and
// dev-mode local images keep working.

const CLOUD_MARKER = 'res.cloudinary.com';
const UPLOAD_MARKER = '/image/upload/';

export function isCldUrl(url) {
  return (
    typeof url === 'string' &&
    url.includes(CLOUD_MARKER) &&
    url.includes(UPLOAD_MARKER)
  );
}

/**
 * cldUrl(url, { w, h, crop, quality, format })
 *
 * Returns a Cloudinary delivery URL with transformation params injected
 * immediately after `/image/upload/`:
 *   https://res.cloudinary.com/<cloud>/image/upload/<params>/<publicId>
 *
 * When the URL is not a Cloudinary delivery URL, returns the value unchanged.
 */
export function cldUrl(
  url,
  { w, h, crop = 'fill', quality = 'auto', format = 'auto' } = {}
) {
  if (!isCldUrl(url)) return url;

  const params = [];
  if (w) params.push(`w_${w}`);
  if (h) params.push(`h_${h}`);
  if (crop) params.push(`c_${crop}`);
  if (quality) params.push(`q_${quality}`);
  if (format) params.push(`f_${format}`);

  const idx = url.indexOf(UPLOAD_MARKER) + UPLOAD_MARKER.length;
  return `${url.slice(0, idx)}${params.join(',')}/${url.slice(idx)}`;
}