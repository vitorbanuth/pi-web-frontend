import { useState, useEffect } from 'react'
import { fetchPatients, createPatient, deletePatient, updatePatient } from '../services/patientService'

const emptyForm = { name: '', age: '', goal: '', weight: '', protein: '', carbs: '', fat: '', waterGoal: '' }

function PatientList() {
  const [search, setSearch] = useState('')
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showWater, setShowWater] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [confirmTarget, setConfirmTarget] = useState(null)
  const [editTarget, setEditTarget] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    fetchPatients()
      .then(setPatients)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  function handleEdit(p) {
    setForm({
      name:      p.name ?? '',
      age:       p.age !== '—' ? String(p.age) : '',
      goal:      p.goal !== '—' ? p.goal : '',
      weight:    p.weight !== '—' ? String(p.weight) : '',
      protein:   p.macros ? String(p.macros.protein.target) : '',
      carbs:     p.macros ? String(p.macros.carbs.target)   : '',
      fat:       p.macros ? String(p.macros.fat.target)     : '',
      waterGoal: p.waterGoal ? String(p.waterGoal) : '',
    })
    setEditTarget(p.id)
    setShowModal(true)
  }

  async function handleUpdate() {
    if (!form.name.trim()) return
    setSaving(true)
    try {
      const updated = await updatePatient(editTarget, form)
      setPatients(prev => prev.map(p => p.id === editTarget ? updated : p))
      setForm(emptyForm)
      setEditTarget(null)
      setShowModal(false)
    } catch (e) {
      setToast(e.message)
      setTimeout(() => setToast(null), 4000)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id, name) {
    setConfirmTarget({ id, name })
  }

  async function confirmDelete() {
    const { id } = confirmTarget
    setConfirmTarget(null)
    setDeletingId(id)
    try {
      await deletePatient(id)
      setPatients(prev => prev.filter(p => p.id !== id))
    } catch (e) {
      setToast(e.message)
      setTimeout(() => setToast(null), 4000)
    } finally {
      setDeletingId(null)
    }
  }

  async function handleSave() {
    if (!form.name.trim()) return
    setSaving(true)
    try {
      const novo = await createPatient(form)
      setPatients(prev => [...prev, novo])
      setForm(emptyForm)
      setShowModal(false)
    } catch (e) {
      setToast(e.message)
      setTimeout(() => setToast(null), 4000)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <p className="text-stone-400 text-sm">Carregando pacientes...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <p className="text-red-400 text-sm">Erro ao carregar pacientes: {error}</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-4">
      {/* Toast de erro */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
          <span>⚠️ {toast}</span>
          <button onClick={() => setToast(null)} className="text-red-400 hover:text-red-600 font-bold leading-none">✕</button>
        </div>
      )}

      {/* Dialog de confirmação de exclusão */}
      {confirmTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm space-y-4">
            <h2 className="text-base font-semibold text-stone-800">Remover paciente</h2>
            <p className="text-sm text-stone-500">
              Tem certeza que deseja remover <span className="font-medium text-stone-700">{confirmTarget.name}</span>? Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={() => setConfirmTarget(null)}
                className="px-4 py-2 text-sm text-stone-600 hover:text-stone-800"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg"
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Novo Paciente */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md space-y-4">
            <h2 className="text-base font-semibold text-stone-800">{editTarget ? 'Editar Paciente' : 'Novo Paciente'}</h2>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Nome *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-orange-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                  placeholder="Nome completo"
                />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-stone-600 mb-1">Idade</label>
                  <input
                    type="number"
                    value={form.age}
                    onChange={e => setForm({ ...form, age: e.target.value })}
                    className="w-full border border-orange-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                    placeholder="Ex: 30"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-stone-600 mb-1">Peso (kg)</label>
                  <input
                    type="number"
                    value={form.weight}
                    onChange={e => setForm({ ...form, weight: e.target.value })}
                    className="w-full border border-orange-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                    placeholder="Ex: 70"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Objetivo</label>
                <select
                  value={form.goal}
                  onChange={e => setForm({ ...form, goal: e.target.value })}
                  className="w-full border border-orange-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400 text-stone-700"
                >
                  <option value="">Selecionar...</option>
                  <option>Emagrecimento</option>
                  <option>Hipertrofia</option>
                  <option>Manutenção</option>
                  <option>Saúde</option>
                </select>
              </div>

              {/* Macros */}
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Macros — metas diárias (g)</label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-xs text-orange-500 mb-1">Proteína</label>
                    <input
                      type="number"
                      value={form.protein}
                      onChange={e => setForm({ ...form, protein: e.target.value })}
                      className="w-full border border-orange-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                      placeholder="Ex: 130"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-amber-500 mb-1">Carboidrato</label>
                    <input
                      type="number"
                      value={form.carbs}
                      onChange={e => setForm({ ...form, carbs: e.target.value })}
                      className="w-full border border-orange-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                      placeholder="Ex: 220"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-stone-400 mb-1">Gordura</label>
                    <input
                      type="number"
                      value={form.fat}
                      onChange={e => setForm({ ...form, fat: e.target.value })}
                      className="w-full border border-orange-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                      placeholder="Ex: 65"
                    />
                  </div>
                </div>
              </div>

              {/* Consumo de Água */}
              <div>
                <label className="block text-xs font-medium text-blue-600 mb-1">🫗 Meta de Água (ml/dia)</label>
                <input
                  type="number"
                  value={form.waterGoal}
                  onChange={e => setForm({ ...form, waterGoal: e.target.value })}
                  className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                  placeholder="Ex: 2000"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => { setShowModal(false); setForm(emptyForm); setEditTarget(null) }}
                className="px-4 py-2 text-sm text-stone-600 hover:text-stone-800"
              >
                Cancelar
              </button>
              <button
                onClick={editTarget ? handleUpdate : handleSave}
                disabled={!form.name.trim() || saving}
                className="px-4 py-2 text-sm font-medium text-white rounded-lg disabled:opacity-40"
                style={{ background: '#ea580c' }}
              >
                {saving ? 'Salvando...' : editTarget ? 'Salvar alterações' : 'Salvar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Widget Consumo de Água */}
      {showWater && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🫗</span>
                <h2 className="text-base font-semibold text-blue-700">Consumo de Água</h2>
              </div>
              <button onClick={() => setShowWater(false)} className="text-stone-400 hover:text-stone-600 text-lg leading-none">✕</button>
            </div>

            <div className="space-y-3">
              {patients.map(p => {
                const pct = Math.min(Math.round((p.water / p.waterGoal) * 100), 100)
                return (
                  <div key={p.id} className="flex items-center gap-3">
                    <span className="text-sm text-stone-700 w-36 truncate">{p.name}</span>
                    <div className="flex-1">
                      <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-blue-400" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <div className="text-right w-36 text-xs text-stone-500 flex items-center gap-1 justify-end">
                      <span>🍶</span>
                      <span className="text-blue-600 font-medium">{p.water ?? 0} ml</span>
                      <span>/</span>
                      <span>Meta: {p.waterGoal ?? 2000} ml</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Search bar */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Buscar paciente..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-orange-200 rounded-lg px-4 py-2 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:border-orange-400 w-64"
        />
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 text-sm font-medium text-white rounded-lg"
          style={{ background: '#ea580c' }}
        >
          + Novo Paciente
        </button>
        <button
          onClick={() => setShowWater(true)}
          className="px-4 py-2 text-sm font-medium text-blue-600 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100"
        >
          🫗 Consumo de Água
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-orange-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-orange-100 bg-orange-50">
              <th className="text-left px-5 py-3 text-stone-600 font-medium">Nome</th>
              <th className="text-left px-5 py-3 text-stone-600 font-medium">Idade</th>
              <th className="text-left px-5 py-3 text-stone-600 font-medium">Objetivo</th>
              <th className="text-left px-5 py-3 text-stone-600 font-medium">Peso (kg)</th>
              <th className="text-left px-5 py-3 text-stone-600 font-medium">
                <div className="flex items-center gap-1">
                  Macros (g)
                  <div className="relative group">
                    <span className="w-4 h-4 rounded-full bg-stone-200 text-stone-500 text-xs flex items-center justify-center cursor-default">?</span>
                    <div className="absolute left-1/2 -translate-x-1/2 top-5 z-10 hidden group-hover:block bg-stone-800 text-white text-xs rounded-lg px-3 py-2 w-36 shadow-lg">
                      <p><span className="text-orange-300 font-bold">P</span> — Proteína</p>
                      <p><span className="text-amber-300 font-bold">C</span> — Carboidrato</p>
                      <p><span className="text-stone-300 font-bold">G</span> — Gordura</p>
                    </div>
                  </div>
                </div>
              </th>
              <th className="text-left px-5 py-3 text-stone-600 font-medium">Última consulta</th>
              <th className="text-left px-5 py-3 text-stone-600 font-medium">Status</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-stone-50 last:border-0 hover:bg-orange-50/50">
                <td className="px-5 py-3 font-medium text-stone-800">{p.name}</td>
                <td className="px-5 py-3 text-stone-500">{p.age}</td>
                <td className="px-5 py-3 text-stone-500">{p.goal}</td>
                <td className="px-5 py-3 text-stone-500">{p.weight}</td>
                <td className="px-5 py-3">
                  {p.macros ? (
                    <div className="text-xs space-y-0.5">
                      {[
                        { label: 'P', m: p.macros.protein, color: 'text-orange-600' },
                        { label: 'C', m: p.macros.carbs,   color: 'text-amber-600'  },
                        { label: 'G', m: p.macros.fat,     color: 'text-stone-500'  },
                      ].map(({ label, m, color }) => (
                        <div key={label} className="flex items-center gap-1">
                          <span className="text-stone-400 w-3">{label}</span>
                          <span className={`font-medium ${m.actual > m.target ? 'text-red-500' : color}`}>{m.actual}</span>
                          <span className="text-stone-300">/</span>
                          <span className="text-stone-400">{m.target}</span>
                        </div>
                      ))}
                    </div>
                  ) : <span className="text-stone-300">—</span>}
                </td>
                <td className="px-5 py-3 text-stone-500">{p.lastVisit}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    p.status === 'Ativo'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-stone-100 text-stone-500'
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-stone-300 hover:text-orange-500 transition-colors"
                      title="Editar paciente"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(p.id, p.name)}
                      disabled={deletingId === p.id}
                      className="text-stone-300 hover:text-red-500 transition-colors disabled:opacity-40"
                      title="Remover paciente"
                    >
                      {deletingId === p.id ? '...' : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                          <path d="M10 11v6M14 11v6" />
                          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                        </svg>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="text-center text-stone-400 py-10 text-sm">Nenhum paciente encontrado.</p>
        )}
      </div>
    </div>
  )
}

export default PatientList
