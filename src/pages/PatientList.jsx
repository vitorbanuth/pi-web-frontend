import { useState } from 'react'
import { patients as initialPatients, patientDetails } from '../utils/mockData'

const emptyForm = { name: '', age: '', goal: '', weight: '' }

function PatientList({ onSelectPatient }) {
  const [search, setSearch] = useState('')
  const [patients, setPatients] = useState(initialPatients)
  const [showModal, setShowModal] = useState(false)
  const [showWater, setShowWater] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  function handleSave() {
    if (!form.name.trim()) return
    const novo = {
      id: patients.length + 1,
      name: form.name.trim(),
      age: Number(form.age) || '-',
      goal: form.goal.trim() || '-',
      weight: Number(form.weight) || '-',
      compliance: 0,
      lastVisit: '-',
      status: 'Ativo',
    }
    setPatients([...patients, novo])
    setForm(emptyForm)
    setShowModal(false)
  }

  return (
    <div className="p-6 space-y-4">
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md space-y-4">
            <h2 className="text-base font-semibold text-stone-800">Novo Paciente</h2>

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
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => { setShowModal(false); setForm(emptyForm) }}
                className="px-4 py-2 text-sm text-stone-600 hover:text-stone-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={!form.name.trim()}
                className="px-4 py-2 text-sm font-medium text-white rounded-lg disabled:opacity-40"
                style={{ background: '#ea580c' }}
              >
                Salvar
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
              <th className="text-left px-5 py-3 text-stone-600 font-medium">Adesão</th>
              <th className="text-left px-5 py-3 text-stone-600 font-medium">Última consulta</th>
              <th className="text-left px-5 py-3 text-stone-600 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr
                key={p.id}
                onClick={() => onSelectPatient?.(patientDetails[p.id] ?? p)}
                className="border-b border-stone-50 last:border-0 hover:bg-orange-50/50 cursor-pointer"
              >
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
                <td className="px-5 py-3">
                  <span className={`font-medium ${p.compliance >= 80 ? 'text-green-600' : p.compliance >= 70 ? 'text-amber-600' : 'text-red-500'}`}>
                    {p.compliance}%
                  </span>
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
