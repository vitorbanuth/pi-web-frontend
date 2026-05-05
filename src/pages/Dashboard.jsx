import { useState, useEffect } from 'react'
import { fetchPatients } from '../services/patientService'

const iconPeople = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)
const iconCheck = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)
const iconTrend = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
)

function Dashboard({ onNavigate }) {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    fetchPatients()
      .then(setPatients)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <p className="text-stone-400 text-sm">Carregando...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <p className="text-red-400 text-sm">Erro ao carregar dados: {error}</p>
      </div>
    )
  }

  const total         = patients.length
  const ativos        = patients.filter(p => p.status === 'Ativo').length
  const avgCompliance = patients.length
    ? Math.round(patients.reduce((acc, p) => acc + (p.compliance ?? 0), 0) / patients.length)
    : 0

  const cards = [
    { label: 'Total de Pacientes', value: total,             icon: iconPeople },
    { label: 'Pacientes Ativos',   value: ativos,            icon: iconCheck  },
    { label: 'Adesão Média',       value: `${avgCompliance}%`, icon: iconTrend  },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-white rounded-xl p-5 border border-stone-100 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500 flex-shrink-0">
              {c.icon}
            </div>
            <div>
              <p className="text-xs text-stone-400 font-medium">{c.label}</p>
              <p className="text-2xl font-bold text-stone-800 mt-0.5">{c.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent patients table */}
      <div className="bg-white rounded-xl border border-stone-100 shadow-sm">
        <div className="px-5 py-4 border-b border-stone-50 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-stone-700 text-sm">Pacientes Recentes</h2>
            <p className="text-xs text-stone-400 mt-0.5">Últimas consultas registradas</p>
          </div>
          <button
            onClick={() => onNavigate('patients')}
            className="text-xs text-orange-600 hover:text-orange-700 font-medium"
          >
            Ver todos →
          </button>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-50">
              <th className="text-left px-5 py-3 text-xs text-stone-400 font-medium uppercase tracking-wide">Nome</th>
              <th className="text-left px-5 py-3 text-xs text-stone-400 font-medium uppercase tracking-wide">Objetivo</th>
              <th className="text-left px-5 py-3 text-xs text-stone-400 font-medium uppercase tracking-wide">Adesão</th>
              <th className="text-left px-5 py-3 text-xs text-stone-400 font-medium uppercase tracking-wide">Última consulta</th>
            </tr>
          </thead>
          <tbody>
            {patients.slice(0, 4).map((p) => (
              <tr key={p.id} className="border-b border-stone-50 last:border-0 hover:bg-orange-50/40 transition-colors">
                <td className="px-5 py-3.5 font-medium text-stone-700">{p.name}</td>
                <td className="px-5 py-3.5">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-500 font-medium">{p.goal}</span>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`font-semibold ${p.compliance >= 80 ? 'text-green-600' : p.compliance >= 70 ? 'text-amber-500' : 'text-red-500'}`}>
                    {p.compliance}%
                  </span>
                </td>
                <td className="px-5 py-3.5 text-stone-400">{p.lastVisit}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {patients.length === 0 && (
          <p className="text-center text-stone-400 py-10 text-sm">Nenhum paciente cadastrado.</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard
