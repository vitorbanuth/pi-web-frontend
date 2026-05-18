import { api } from './api';

function mapUser(raw) {
  return {
    id: raw._id,
    username: raw.username ?? '',
    email: raw.email ?? '',
    patientId: raw.patientId ?? '',
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}

export async function fetchUsers() {
  const data = await api.get('/api/accounts');
  return data.map(mapUser);
}

export async function createUser(form) {
  const body = {
    username: form.username.trim(),
    email: form.email.trim(),
    password: form.password,
    patientId: form.patientId,
  };
  const created = await api.post('/api/accounts', body);
  return mapUser(created);
}

export async function updateUser(id, form) {
  const body = {
    username: form.username?.trim() || undefined,
    email: form.email?.trim() || undefined,
    patientId: form.patientId || undefined,
  };
  if (form.password) body.password = form.password;

  const updated = await api.put(`/api/accounts/${id}`, body);
  return mapUser(updated);
}
