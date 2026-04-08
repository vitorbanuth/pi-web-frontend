import { useState } from 'react'
import { patients } from '../utils/mockData'

function PatientList() {
  const [search, setSearch] = useState('')

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 space-y-4">
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
              <th className="text-left px-5 py-3 text-stone-600 font-medium">Status</th>
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
