import { json, requireAccess } from './_lib.js';

export async function onRequest(context) {
  if (!requireAccess(context.request, context.env)) {
    return json({ ok: false, error: 'Unauthorized' }, 401);
  }
  return context.next();
}
