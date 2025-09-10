export const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export async function uploadSpec(file: File) {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${API_BASE}/specs:upload`, {
    method: 'POST',
    body: form,
  });
  if (!res.ok) throw new Error('spec upload failed');
  return res.json();
}

export async function uploadConfig(file: File) {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${API_BASE}/configs:upload`, {
    method: 'POST',
    body: form,
  });
  if (!res.ok) throw new Error('config upload failed');
  return res.json();
}

export async function validateJob(jobId: string) {
  const res = await fetch(`${API_BASE}/validate?jobId=${jobId}`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('validation failed');
  return res.json();
}
