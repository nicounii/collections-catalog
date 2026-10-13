import { json, pick, makeUniqueId, airtableFetch, triggerDeploy } from './_lib.js';

export const LISTING_FIELDS = [
  'id',
  'title',
  'price',
  'category',
  'condition',
  'status',
  'featured',
  'rank',
  'image_url',
  'maker',
  'note',
  'art',
  'image_alt'
];

export function validateListing(body) {
  const errors = [];
  const title = body && body.title;
  if (!title || typeof title !== 'string' || title.trim() === '') {
    errors.push('title is required');
  }

  const category = body && body.category;
  if (!category || typeof category !== 'string' || category.trim() === '') {
    errors.push('category is required');
  }

  const priceVal = body && body.price;
  const numPrice = Number(priceVal);
  if (priceVal === undefined || priceVal === null || priceVal === '' || !Number.isFinite(numPrice) || numPrice <= 0) {
    errors.push('price must be a valid number greater than 0');
  }

  return {
    ok: errors.length === 0,
    errors
  };
}

export function buildCreateFields(body, id) {
  const price = Number(body.price);
  const fields = {
    id,
    title: body.title,
    category: body.category,
    price,
    status: 'available',
    featured: Boolean(body.featured)
  };

  const optionalFields = ['condition', 'maker', 'note', 'image_url', 'image_alt', 'art'];
  for (const field of optionalFields) {
    if (body[field] !== undefined && body[field] !== null && String(body[field]).trim() !== '') {
      fields[field] = body[field];
    }
  }

  return fields;
}

export async function fetchAllRecords(env) {
  let records = [];
  let offset;
  do {
    const params = new URLSearchParams();
    params.set('pageSize', '100');
    if (offset) params.set('offset', offset);

    const res = await airtableFetch(env, `?${params.toString()}`);
    const data = await res.json();
    if (data.records) {
      records = records.concat(data.records);
    }
    offset = data.offset;
  } while (offset);

  return records;
}

export async function onRequestGet({ env }) {
  try {
    const records = await fetchAllRecords(env);
    const items = records.map(r => ({
      recordId: r.id,
      ...pick(r.fields, LISTING_FIELDS)
    }));
    return json({ items });
  } catch (err) {
    return json({ ok: false, error: err.message }, 502);
  }
}

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch (err) {
    return json({ ok: false, error: 'Invalid JSON body' }, 400);
  }

  const validation = validateListing(body);
  if (!validation.ok) {
    return json({ ok: false, errors: validation.errors }, 400);
  }

  let existingRecords;
  try {
    existingRecords = await fetchAllRecords(env);
  } catch (err) {
    return json({ ok: false, error: err.message }, 502);
  }

  const existingIds = new Set(existingRecords.map(r => r.fields.id).filter(Boolean));
  const id = makeUniqueId(body.title, existingIds);
  const fields = buildCreateFields(body, id);

  try {
    await airtableFetch(env, '', {
      method: 'POST',
      body: JSON.stringify({
        fields,
        typecast: true
      })
    });
  } catch (err) {
    return json({ ok: false, error: err.message }, 502);
  }

  await triggerDeploy(env);

  return json({ ok: true, item: { ...fields } }, 201);
}
