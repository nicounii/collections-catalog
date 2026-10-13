export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' }
  });
}

export function pick(obj, keys) {
  const result = {};
  for (const key of keys) {
    if (obj && Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key];
    }
  }
  return result;
}

export function slugify(title) {
  if (!title) return '';
  let str = String(title)
    .replace(/ª/g, 'a')
    .replace(/º/g, 'o')
    .replace(/°/g, '');

  str = str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return str.slice(0, 48);
}

export function makeUniqueId(title, existingIds) {
  const base = slugify(title);
  const suffix = Date.now().toString(36).slice(-4);
  let candidate = `${base}-${suffix}`;
  
  const existingSet = existingIds instanceof Set ? existingIds : new Set(existingIds || []);
  if (!existingSet.has(candidate)) {
    return candidate;
  }

  let counter = 2;
  while (existingSet.has(`${candidate}-${counter}`)) {
    counter++;
  }
  return `${candidate}-${counter}`;
}

export async function cloudinarySignature(params, apiSecret) {
  const sortedKeys = Object.keys(params).sort();
  const queryString = sortedKeys.map((k) => `${k}=${params[k]}`).join('&') + apiSecret;
  const encoder = new TextEncoder();
  const data = encoder.encode(queryString);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function airtableUrl(env) {
  const baseId = env.AIRTABLE_BASE_ID;
  const table = env.AIRTABLE_TABLE || 'Catalog';
  return `${baseId}/${encodeURIComponent(table)}`;
}

export async function airtableFetch(env, path, init = {}) {
  const url = 'https://api.airtable.com/v0/' + airtableUrl(env) + path;
  const headers = {
    Authorization: `Bearer ${env.AIRTABLE_TOKEN}`,
    'content-type': 'application/json',
    ...(init.headers || {})
  };
  const res = await fetch(url, { ...init, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error('Airtable HTTP ' + res.status + ': ' + text);
  }
  return res;
}

export async function triggerDeploy(env) {
  if (env.DEPLOY_HOOK_URL) {
    try {
      await fetch(env.DEPLOY_HOOK_URL, { method: 'POST' });
    } catch (err) {
      console.error('Deploy hook failed:', err);
    }
  }
}

export function requireAccess(request, env) {
  const email = request.headers.get('Cf-Access-Authenticated-User-Email');
  if (email && email.trim() !== '') {
    return true;
  }
  if (env && env.ENVIRONMENT === 'development') {
    return true;
  }
  return false;
}
