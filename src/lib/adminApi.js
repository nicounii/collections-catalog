export async function listListings() {
  const res = await fetch('/api/admin/listings', {
    credentials: 'same-origin',
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to list listings: ${res.status} ${text}`);
  }
  return res.json();
}

export async function createListing(payload) {
  const res = await fetch('/api/admin/listings', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to create listing: ${res.status} ${text}`);
  }
  return res.json();
}

export async function patchListing(recordId, patch) {
  const res = await fetch(`/api/admin/listings/${recordId}`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify(patch),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to patch listing ${recordId}: ${res.status} ${text}`);
  }
  return res.json();
}

export async function signUpload() {
  const res = await fetch('/api/admin/sign-upload', {
    method: 'POST',
    credentials: 'same-origin',
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to sign upload: ${res.status} ${text}`);
  }
  return res.json();
}

export async function uploadToCloudinary(file, sig) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', sig.apiKey);
  formData.append('timestamp', String(sig.timestamp));
  formData.append('signature', sig.signature);
  formData.append('folder', sig.folder);
  if (sig.uploadPreset) {
    formData.append('upload_preset', sig.uploadPreset);
  }

  const url = `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`;
  const res = await fetch(url, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Cloudinary upload failed: ${res.status} ${text}`);
  }
  const data = await res.json();
  return data.secure_url;
}
