// src/lib/whatsapp.js
// WhatsApp deep-link helper for the "Negociar" (negotiate) path.
//
// NOTE: placeholder number — the operator must set the real WhatsApp
// business number before launch (same placeholder as Footer).

export const WHATSAPP_PHONE = '551199990000'; // TODO(operator): real number (E.164 digits, no + or spaces)

/**
 * waLink({ phone, text }) → https://wa.me/<phone>?text=<encodeURIComponent(text)>
 */
export function waLink({ phone, text }) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}