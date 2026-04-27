import { useState, useEffect } from 'react'
import { fetchPatients } from '../services/patientService'

function Dashboard({ onNavigate }) {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  const total = patients.length
  const ativos = patients.filter(p => p.status === 'Ativo').length
  return (
    <div className="p-6 space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-5 border border-orange-100">
          <p className="text-sm text-stone-500">Total de Pacientes</p>
          <p className="text-3xl font-bold text-orange-600 mt-1">{total}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-orange-100">
          <p className="text-sm text-stone-500">Pacientes Ativos</p>
          <p className="text-3xl font-bold text-orange-600 mt-1">{ativos}</p>
        </div>
      </div>

      {/* Recent patients table */}
      <div className="bg-white rounded-xl border border-orange-100">
        <div className="px-5 py-4 border-b border-orange-100 flex items-center justify-between">
          <h2 className="font-semibold text-stone-700">Pacientes Recentes</h2>
          <button
            onClick={() => onNavigate('patients')}
            className="text-sm text-orange-600 hover:underline"
          >
            Ver todos
          </button>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-orange-50">
              <th className="text-left px-5 py-3 text-stone-500 font-medium">Nome</th>
              <th className="text-left px-5 py-3 text-stone-500 font-medium">Objetivo</th>
              <th className="text-left px-5 py-3 text-stone-500 font-medium">Última consulta</th>
            </tr>
          </thead>
          <tbody>
            {patients.slice(0, 4).map((p) => (
              <tr key={p.id} className="border-b border-stone-50 last:border-0 hover:bg-orange-50/50">
                <td className="px-5 py-3 font-medium text-stone-700">{p.name}</td>
                <td className="px-5 py-3 text-stone-500">{p.goal}</td>
                <td className="px-5 py-3 text-stone-500">{p.lastVisit}</td>
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
