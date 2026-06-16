import { useState, useEffect } from 'react'
import { fetchPatients } from '../services/patientService'
import { fetchSuggestions } from '../services/suggestionService'
import { MEAL_TYPES } from '../services/foodCatalog'

function SuggestionList({ onSelectPatient }) {
  const [patients,  setPatients]  = useState([])
  const [counts,    setCounts]    = useState({}) // { patientId: number }
  const [loading,   setLoading]   = useState(true)
  const [search,    setSearch]    = useState('')
  const [error,     setError]     = useState(null)

  useEffect(() => {
    fetchPatients()
      .then(async (pts) => {
        setPatients(pts)
        // busca contagem de sugestões para cada paciente em paralelo
        const entries = await Promise.all(
          pts.map(p =>
            fetchSuggestions(p.id)
              .then(s => [p.id, s.filter(x => x.foods.length > 0).length])
              .catch(() => [p.id, 0])
          )
        )
        setCounts(Object.fromEntries(entries))
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return (
    <div className="p-6 flex items-center justify-center h-64">
      <p className="text-stone-400 text-sm">Carregando pacientes...</p>
    </div>
  )

  if (error) return (
    <div className="p-6 flex items-center justify-center h-64">
      <p className="text-red-400 text-sm">Erro: {error}</p>
    </div>
  )

  return (
    <div className="p-6 space-y-4">
      {/* Barra de busca */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Buscar paciente..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-orange-200 rounded-lg px-4 py-2 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:border-orange-400 w-64"
        />
        <span className="text-xs text-stone-400">
          {filtered.length} paciente{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-xl border border-orange-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-orange-100 bg-orange-50">
              <th className="text-left px-5 py-3 text-stone-600 font-medium">Paciente</th>
              <th className="text-left px-5 py-3 text-stone-600 font-medium">Objetivo</th>
              <th className="text-left px-5 py-3 text-stone-600 font-medium">Sugestões montadas</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => {
              const filled  = counts[p.id] ?? 0
              const total   = MEAL_TYPES.length
              const pct     = Math.round((filled / total) * 100)
              const allDone = filled === total

              return (
                <tr key={p.id} className="border-b border-stone-50 last:border-0 hover:bg-orange-50/40">
                  <td className="px-5 py-3 font-medium text-stone-800">{p.name}</td>
                  <td className="px-5 py-3 text-stone-500">{p.goal ?? '—'}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {/* Progress bar */}
                      <div className="w-28 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${allDone ? 'bg-green-400' : 'bg-orange-400'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className={`text-xs font-medium ${allDone ? 'text-green-600' : 'text-stone-500'}`}>
                        {filled} / {total}
                      </span>
                      {allDone && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                          Completo
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => onSelectPatient(p)}
                      className="flex items-center gap-1.5 text-xs font-medium text-orange-600 hover:text-orange-700 border border-orange-200 hover:border-orange-400 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors ml-auto"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                      Montar sugestões
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="text-center text-stone-400 py-10 text-sm">Nenhum paciente encontrado.</p>
        )}
      </div>
    </div>
  )
}

export default SuggestionList
