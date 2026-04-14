import { useState } from 'react'
import { patients as initialPatients, patientDetails } from '../utils/mockData'

const emptyForm = { name: '', age: '', goal: '', weight: '' }

function PatientList({ onSelectPatient }) {
  const [search, setSearch] = useState('')
  const [patients, setPatients] = useState(initialPatients)
  const [showModal, setShowModal] = useState(false)
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
              <th className="text-left px-5 py-3 text-stone-600 font-medium">Adesão</th>
              <th className="text-left px-5 py-3 text-stone-600 font-medium">Última consulta</th>
              <th className="text-left px-5 py-3 text-stone-600 font-medium">Água (ml)</th>
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
                  <span className={`font-medium ${p.compliance >= 80 ? 'text-green-600' : p.compliance >= 70 ? 'text-amber-600' : 'text-red-500'}`}>
                    {p.compliance}%
                  </span>
                </td>
                <td className="px-5 py-3 text-stone-500">{p.lastVisit}</td>
                <td className="px-5 py-3 text-stone-500">{p.water ?? '-'}</td>
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
