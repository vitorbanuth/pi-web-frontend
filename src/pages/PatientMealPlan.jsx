import { useState } from 'react'
import { updatePatient } from '../services/patientService'

const MACRO_KCAL = { protein: 4, carbs: 4, fat: 9 }

function MacroField({ label, color, field, value, onChange, unit = 'g' }) {
  return (
    <div className="space-y-1">
      <label className={`block text-xs font-medium ${color}`}>{label}</label>
      <div className="flex items-center gap-1.5">
        <input
          type="number"
          min="0"
          value={value}
          onChange={e => onChange(field, e.target.value)}
          className="w-full border border-orange-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
          placeholder="0"
        />
        <span className="text-xs text-stone-400 shrink-0">{unit}</span>
      </div>
    </div>
  )
}

function PatientMealPlan({ patient, onBack }) {
  const [form, setForm] = useState({
    kcal:      String(patient.macros?.kcal?.target    ?? ''),
    protein:   String(patient.macros?.protein?.target ?? ''),
    carbs:     String(patient.macros?.carbs?.target   ?? ''),
    fat:       String(patient.macros?.fat?.target     ?? ''),
    waterGoal: String(patient.waterGoal               ?? ''),
  })
  const [saving, setSaving] = useState(false)
  const [toast,  setToast]  = useState(null)

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function showToast(msg, type = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  // Kcal calculadas a partir dos macros (apenas informativo)
  const calcKcal =
    (Number(form.protein) || 0) * MACRO_KCAL.protein +
    (Number(form.carbs)   || 0) * MACRO_KCAL.carbs   +
    (Number(form.fat)     || 0) * MACRO_KCAL.fat

  async function handleSave() {
    setSaving(true)
    try {
      await updatePatient(patient.id, {
        name:      patient.name,
        age:       patient.age !== '—'    ? patient.age    : '',
        weight:    patient.weight !== '—' ? patient.weight : '',
        goal:      patient.goal !== '—'   ? patient.goal   : '',
        kcal:      form.kcal,
        protein:   form.protein,
        carbs:     form.carbs,
        fat:       form.fat,
        waterGoal: form.waterGoal,
      })
      showToast('Plano salvo com sucesso')
    } catch (e) {
      showToast(e.message, 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-5 max-w-2xl">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 text-sm px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 ${
          toast.type === 'error'
            ? 'bg-red-50 border border-red-200 text-red-700'
            : 'bg-green-50 border border-green-200 text-green-700'
        }`}>
          {toast.type === 'error' ? '⚠️' : '✅'} {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-orange-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Voltar
        </button>
        <div className="h-4 w-px bg-stone-200" />
        <div>
          <h2 className="text-sm font-semibold text-stone-800">{patient.name}</h2>
          <p className="text-xs text-stone-400">Plano alimentar — metas diárias</p>
        </div>
      </div>

      {/* Card meta calórica */}
      <div className="bg-white rounded-xl border border-orange-100 p-5 space-y-5">
        {/* Kcal */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-stone-700">Meta calórica diária</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              value={form.kcal}
              onChange={e => handleChange('kcal', e.target.value)}
              className="w-40 border border-orange-300 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:border-orange-500"
              placeholder="Ex: 1800"
            />
            <span className="text-sm text-stone-400">kcal/dia</span>
          </div>
        </div>

        <div className="border-t border-stone-50" />

        {/* Macros */}
        <div>
          <p className="text-xs font-semibold text-stone-700 mb-3">Distribuição de macronutrientes</p>
          <div className="grid grid-cols-3 gap-3">
            <MacroField label="Proteína"    color="text-orange-500" field="protein" value={form.protein} onChange={handleChange} />
            <MacroField label="Carboidrato" color="text-amber-500"  field="carbs"   value={form.carbs}   onChange={handleChange} />
            <MacroField label="Gordura"     color="text-stone-400"  field="fat"     value={form.fat}     onChange={handleChange} />
          </div>

          {/* Kcal calculada */}
          {calcKcal > 0 && (
            <div className="mt-3 flex items-center gap-2 text-xs text-stone-400 bg-stone-50 rounded-lg px-3 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Calorias calculadas pelos macros: <span className="font-medium text-stone-600">{calcKcal} kcal</span>
              {Number(form.kcal) > 0 && calcKcal !== Number(form.kcal) && (
                <span className="text-amber-500">(diferença de {Math.abs(calcKcal - Number(form.kcal))} kcal da meta)</span>
              )}
            </div>
          )}
        </div>

        <div className="border-t border-stone-50" />

        {/* Água */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-blue-600">Meta de água</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              value={form.waterGoal}
              onChange={e => handleChange('waterGoal', e.target.value)}
              className="w-40 border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
              placeholder="Ex: 2000"
            />
            <span className="text-sm text-stone-400">ml/dia</span>
            {Number(form.waterGoal) >= 1000 && (
              <span className="text-xs text-stone-400">
                ({(Number(form.waterGoal) / 1000).toFixed(1)} L)
              </span>
            )}
          </div>
        </div>

        {/* Resumo visual */}
        {(Number(form.protein) > 0 || Number(form.carbs) > 0 || Number(form.fat) > 0) && (
          <>
            <div className="border-t border-stone-50" />
            <div>
              <p className="text-xs font-semibold text-stone-500 mb-2">Distribuição calórica</p>
              <div className="flex gap-2">
                {[
                  { label: 'Proteína',    g: Number(form.protein), color: 'bg-orange-400', kcalPer: 4 },
                  { label: 'Carboidrato', g: Number(form.carbs),   color: 'bg-amber-400',  kcalPer: 4 },
                  { label: 'Gordura',     g: Number(form.fat),     color: 'bg-stone-300',  kcalPer: 9 },
                ].map(m => {
                  const mKcal = m.g * m.kcalPer
                  const pct = calcKcal > 0 ? Math.round((mKcal / calcKcal) * 100) : 0
                  return (
                    <div key={m.label} className="flex-1 text-center">
                      <div className={`h-1.5 rounded-full ${m.color} mb-1.5`} style={{ opacity: pct / 100 + 0.15 }} />
                      <p className="text-xs text-stone-500">{m.label}</p>
                      <p className="text-xs font-medium text-stone-700">{pct}%</p>
                      <p className="text-xs text-stone-400">{mKcal} kcal</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="px-6 py-2.5 text-sm font-medium text-white rounded-lg disabled:opacity-40 transition-opacity"
        style={{ background: '#ea580c' }}
      >
        {saving ? 'Salvando...' : 'Salvar plano'}
      </button>
    </div>
  )
}

export default PatientMealPlan
