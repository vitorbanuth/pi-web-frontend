import { useState, useEffect, useRef } from 'react'
import { fetchSuggestions, saveMealSuggestion, deleteMealSuggestion } from '../services/suggestionService'
import { foodCatalog, calcMacros, MEAL_TYPES } from '../services/foodCatalog'

// ── helpers ────────────────────────────────────────────────────────────────
function totalMacros(foods) {
  return foods.reduce(
    (acc, f) => ({
      kcal:    acc.kcal    + f.kcal,
      protein: acc.protein + f.protein,
      carbs:   acc.carbs   + f.carbs,
      fat:     acc.fat     + f.fat,
    }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  )
}

// ── FoodSearchInput ────────────────────────────────────────────────────────
function FoodSearchInput({ onAdd }) {
  const [query, setQuery]       = useState('')
  const [results, setResults]   = useState([])
  const [selected, setSelected] = useState(null)
  const [grams, setGrams]       = useState('')
  const inputRef = useRef(null)

  function handleQuery(v) {
    setQuery(v)
    setSelected(null)
    setResults(
      v.trim().length < 2
        ? []
        : foodCatalog.filter(f => f.name.toLowerCase().includes(v.toLowerCase())).slice(0, 8)
    )
  }

  function handleSelect(food) {
    setSelected(food)
    setQuery(food.name)
    setResults([])
  }

  function handleAdd() {
    if (!selected) return
    const g = parseFloat(grams.replace(',', '.'))
    if (!g || g <= 0) return
    const macros = calcMacros(selected, g)
    onAdd({ name: `${selected.name} (${Math.round(g)}g)`, quantityG: g, ...macros })
    setQuery('')
    setGrams('')
    setSelected(null)
    inputRef.current?.focus()
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => handleQuery(e.target.value)}
          placeholder="Buscar alimento..."
          className="w-full border border-orange-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
        />
        {results.length > 0 && (
          <ul className="absolute z-20 w-full mt-1 bg-white border border-orange-100 rounded-lg shadow-lg max-h-52 overflow-y-auto">
            {results.map((f, i) => (
              <li
                key={i}
                onClick={() => handleSelect(f)}
                className="px-3 py-2 text-sm hover:bg-orange-50 cursor-pointer flex justify-between"
              >
                <span className="text-stone-700">{f.name}</span>
                <span className="text-stone-400 text-xs">{f.kcal} kcal/100g</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selected && (
        <div className="flex gap-2">
          <input
            type="number"
            value={grams}
            onChange={e => setGrams(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder="Gramas"
            className="w-28 border border-orange-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 text-sm font-medium text-white rounded-lg"
            style={{ background: '#ea580c' }}
          >
            Adicionar
          </button>
        </div>
      )}
    </div>
  )
}

// ── MealSlotCard ───────────────────────────────────────────────────────────
function MealSlotCard({ mealType, suggestion, onSave, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [foods, setFoods]     = useState(suggestion?.foods ?? [])
  const [notes, setNotes]     = useState(suggestion?.notes ?? '')
  const [saving, setSaving]   = useState(false)

  // sincroniza quando o pai recarrega
  useEffect(() => {
    setFoods(suggestion?.foods ?? [])
    setNotes(suggestion?.notes ?? '')
  }, [suggestion])

  const totals = totalMacros(foods)
  const hasSuggestion = suggestion && suggestion.foods.length > 0

  async function handleSave() {
    setSaving(true)
    try {
      await onSave(mealType.key, foods, notes)
      setEditing(false)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    await onDelete(mealType.key)
    setFoods([])
    setNotes('')
    setEditing(false)
  }

  return (
    <div className={`bg-white rounded-xl border ${editing ? 'border-orange-300' : 'border-orange-100'} overflow-hidden`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-stone-50">
        <div className="flex items-center gap-2">
          <span className="text-lg">{mealType.icon}</span>
          <span className="text-sm font-semibold text-stone-700">{mealType.label}</span>
          {hasSuggestion && !editing && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
              {suggestion.foods.length} item{suggestion.foods.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="text-xs text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            {hasSuggestion ? 'Editar' : 'Montar'}
          </button>
        ) : (
          <div className="flex gap-2">
            {hasSuggestion && (
              <button onClick={handleDelete} className="text-xs text-red-500 hover:text-red-600 font-medium">
                Remover
              </button>
            )}
            <button onClick={() => { setEditing(false); setFoods(suggestion?.foods ?? []); setNotes(suggestion?.notes ?? '') }}
              className="text-xs text-stone-400 hover:text-stone-600">
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={saving || foods.length === 0}
              className="text-xs font-medium text-white px-3 py-1 rounded-md disabled:opacity-40"
              style={{ background: '#ea580c' }}
            >
              {saving ? '...' : 'Salvar'}
            </button>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        {/* Editor mode */}
        {editing && (
          <>
            <FoodSearchInput onAdd={f => setFoods(prev => [...prev, f])} />
            <div className="space-y-1">
              {foods.map((f, i) => (
                <div key={i} className="flex items-center justify-between text-xs bg-stone-50 rounded-lg px-3 py-2">
                  <span className="text-stone-700 flex-1 truncate">{f.name}</span>
                  <div className="flex items-center gap-3 ml-2 shrink-0">
                    <span className="text-orange-600 font-medium">{f.kcal} kcal</span>
                    <span className="text-stone-400">P {f.protein}g · C {f.carbs}g · G {f.fat}g</span>
                    <button onClick={() => setFoods(prev => prev.filter((_, j) => j !== i))}
                      className="text-stone-300 hover:text-red-500 ml-1">✕</button>
                  </div>
                </div>
              ))}
            </div>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Observações (opcional)..."
              rows={2}
              className="w-full border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-600 focus:outline-none focus:border-orange-300 resize-none"
            />
          </>
        )}

        {/* View mode */}
        {!editing && hasSuggestion && (
          <>
            <div className="space-y-1">
              {suggestion.foods.map((f, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-300 shrink-0" />
                    <span className="text-stone-600">{f.name}</span>
                  </div>
                  <span className="text-orange-500 font-medium shrink-0 ml-2">{f.kcal} kcal</span>
                </div>
              ))}
            </div>
            {suggestion.notes && (
              <p className="text-xs text-stone-400 italic border-t border-stone-50 pt-2">{suggestion.notes}</p>
            )}
          </>
        )}

        {!editing && !hasSuggestion && (
          <p className="text-xs text-stone-300 text-center py-2">Nenhuma sugestão montada</p>
        )}

        {/* Totais */}
        {foods.length > 0 && (
          <div className="flex items-center gap-3 pt-1 border-t border-stone-50 text-xs">
            <span className="text-orange-600 font-semibold">{totals.kcal} kcal</span>
            <span className="text-stone-400">P {totals.protein}g</span>
            <span className="text-stone-400">C {totals.carbs}g</span>
            <span className="text-stone-400">G {totals.fat}g</span>
          </div>
        )}
      </div>
    </div>
  )
}

// ── PatientSuggestions (página principal) ──────────────────────────────────
function PatientSuggestions({ patient, onBack }) {
  const [suggestions, setSuggestions] = useState([])  // array de sugestões salvas
  const [loading, setLoading]         = useState(true)
  const [toast, setToast]             = useState(null)

  function showToast(msg, type = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  useEffect(() => {
    fetchSuggestions(patient.id)
      .then(setSuggestions)
      .catch(e => showToast(e.message, 'error'))
      .finally(() => setLoading(false))
  }, [patient.id])

  function getSuggestionFor(mealTypeKey) {
    return suggestions.find(s => s.mealType === mealTypeKey) ?? null
  }

  async function handleSave(mealType, foods, notes) {
    try {
      const saved = await saveMealSuggestion(patient.id, mealType, foods, notes)
      setSuggestions(prev => {
        const exists = prev.some(s => s.mealType === mealType)
        return exists
          ? prev.map(s => s.mealType === mealType ? saved : s)
          : [...prev, saved]
      })
      showToast('Sugestão salva com sucesso')
    } catch (e) {
      showToast(e.message, 'error')
      throw e
    }
  }

  async function handleDelete(mealType) {
    try {
      await deleteMealSuggestion(patient.id, mealType)
      setSuggestions(prev => prev.filter(s => s.mealType !== mealType))
      showToast('Sugestão removida')
    } catch (e) {
      showToast(e.message, 'error')
    }
  }

  const filledCount = suggestions.filter(s => s.foods.length > 0).length

  return (
    <div className="space-y-5">
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
          <p className="text-xs text-stone-400">Sugestões alimentares</p>
        </div>
        <span className="ml-auto text-xs text-stone-400 bg-stone-100 px-2.5 py-1 rounded-full">
          {filledCount} / {MEAL_TYPES.length} refeições montadas
        </span>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <p className="text-stone-400 text-sm">Carregando sugestões...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {MEAL_TYPES.map(mt => (
            <MealSlotCard
              key={mt.key}
              mealType={mt}
              suggestion={getSuggestionFor(mt.key)}
              onSave={handleSave}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default PatientSuggestions
