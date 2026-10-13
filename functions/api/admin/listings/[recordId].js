import { json, airtableFetch, triggerDeploy } from '../_lib.js';

export function buildPatch(body) {
  if (!body || typeof body !== 'object') {
    return { ok: false };
  }

  const fields = {};

  if (Object.prototype.hasOwnProperty.call(body, 'status')) {
    const s = body.status;
    if (s === 'available' || s === 'reserved' || s === 'sold') {
      fields.status = s;
    } else {
      return { ok: false };
    }
  }

  if (Object.prototype.hasOwnProperty.call(body, 'featured')) {
    fields.featured = Boolean(body.featured);
  }

  if (Object.prototype.hasOwnProperty.call(body, 'rank')) {
    const r = body.rank;
    if (typeof r === 'number' && Number.isFinite(r)) {
      fields.rank = r;
    } else {
      return { ok: false };
    }
  }

  if (Object.keys(fields).length === 0) {
    return { ok: false };
  }

  return { ok: true, fields };
}

export async function onRequestPatch({ request, env, params }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid JSON' }, 400);
  }

  const { ok, fields } = buildPatch(body);
  if (!ok) {
    return json({ ok: false, error: 'Bad request or invalid fields' }, 400);
  }

  const recordId = params && params.recordId;
  if (!recordId || !/^rec[A-Za-z0-9]+$/.test(recordId)) {
    return json({ ok: false, error: 'Invalid recordId' }, 400);
  }

  try {
    await airtableFetch(env, '/' + recordId, {
      method: 'PATCH',
      body: JSON.stringify({ fields, typecast: true })
    });
    await triggerDeploy(env);
    return json({ ok: true, item: { recordId, ...fields } });
  } catch (err) {
    return json({ ok: false, error: err.message }, 502);
  }
}
