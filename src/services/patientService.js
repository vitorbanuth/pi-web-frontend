import { api } from './api';

function mapPatient(raw) {
  const log = raw.latestLog;
  return {
    id: raw._id,
    name: raw.name ?? '—',
    age: raw.age ?? '—',
    goal: raw.goal ?? '—',
    weight: raw.weight ?? '—',
    status: raw.status ?? 'Ativo',
    lastVisit: raw.lastVisit ?? '—',
    compliance: raw.compliance ?? 0,
    water: log?.hydration?.mlConsumed ?? 0,
    waterGoal: raw.waterGoal ?? log?.hydration?.mlGoal ?? 2000,
    macros: raw.macroTargets
      ? {
          kcal:    { target: raw.macroTargets.kcal    ?? 0 },
          protein: { actual: log?.nutrition?.protein ?? 0, target: raw.macroTargets.protein ?? 0 },
          carbs:   { actual: log?.nutrition?.carbs   ?? 0, target: raw.macroTargets.carbs   ?? 0 },
          fat:     { actual: log?.nutrition?.fat     ?? 0, target: raw.macroTargets.fat     ?? 0 },
        }
      : null,
  };
}

export async function fetchPatients() {
  const data = await api.get('/api/users');
  return data.map(mapPatient);
}

export async function deletePatient(id) {
  return api.delete(`/api/users/${id}`);
}

export async function updatePatient(id, form) {
  const body = {
    name: form.name.trim(),
    age: Number(form.age) || undefined,
    weight: Number(form.weight) || undefined,
    goal: form.goal || undefined,
    waterGoal: Number(form.waterGoal) || 2000,
    macroTargets: {
      kcal:    Number(form.kcal)    || 0,
      protein: Number(form.protein) || 0,
      carbs:   Number(form.carbs)   || 0,
      fat:     Number(form.fat)     || 0,
    },
  };
  const updated = await api.put(`/api/users/${id}`, body);
  return mapPatient({ ...updated, latestLog: updated.latestLog ?? null });
}

export async function fetchPatientLogs(patientId) {
  return api.get(`/api/daily-log/patient/${patientId}`);
}

export async function createPatient(form) {
  const body = {
    name: form.name.trim(),
    age: Number(form.age) || undefined,
    weight: Number(form.weight) || undefined,
    goal: form.goal || undefined,
    waterGoal: Number(form.waterGoal) || 2000,
    macroTargets: {
      kcal:    Number(form.kcal)    || 0,
      protein: Number(form.protein) || 0,
      carbs:   Number(form.carbs)   || 0,
      fat:     Number(form.fat)     || 0,
    },
  };

  const created = await api.post('/api/users', body);
  return mapPatient({ ...created, latestLog: null });
}
