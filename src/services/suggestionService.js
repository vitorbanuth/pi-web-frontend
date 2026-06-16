import { api } from './api'

export async function fetchSuggestions(patientId) {
  return api.get(`/api/suggestions/patient/${patientId}`)
}

export async function saveMealSuggestion(patientId, mealType, foods, notes = '') {
  return api.put(`/api/suggestions/patient/${patientId}/${mealType}`, { foods, notes })
}

export async function deleteMealSuggestion(patientId, mealType) {
  return api.delete(`/api/suggestions/patient/${patientId}/${mealType}`)
}
