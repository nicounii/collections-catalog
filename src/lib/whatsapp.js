// src/lib/whatsapp.js
// WhatsApp deep-link helper for the "Negociar" (negotiate) path.
//
// The number is sourced from SITE.whatsapp (single source of truth) and
// normalized to E.164 digits (no "+", spaces, or punctuation) for wa.me.

import { SITE } from './site.js';

export const WHATSAPP_PHONE = SITE.whatsapp.replace(/\D/g, '');

/**
 * waLink({ phone, text }) → https://wa.me/<phone>?text=<encodeURIComponent(text)>
 */
export function waLink({ phone, text }) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}