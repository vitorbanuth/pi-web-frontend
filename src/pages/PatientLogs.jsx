import { useState, useEffect } from 'react'
import { fetchPatientLogs } from '../services/patientService'

const weekdays = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado']
const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return `${weekdays[d.getUTCDay()]}, ${d.getUTCDate()} de ${months[d.getUTCMonth()]} de ${d.getUTCFullYear()}`
}

function ProgressBar({ value, goal, color = 'orange' }) {
  const pct = goal > 0 ? Math.min(Math.round((value / goal) * 100), 100) : 0
  const over = goal > 0 && value > goal

  const barColors = {
    orange: over ? 'bg-red-400' : 'bg-orange-400',
    amber:  over ? 'bg-red-400' : 'bg-amber-400',
    stone:  over ? 'bg-red-400' : 'bg-stone-400',
    blue:   over ? 'bg-red-400' : 'bg-blue-400',
  }
  const bgColors = {
    orange: 'bg-orange-100',
    amber:  'bg-amber-100',
    stone:  'bg-stone-100',
    blue:   'bg-blue-100',
  }

  return (
    <div className="space-y-1">
      <div className={`h-1.5 rounded-full overflow-hidden ${bgColors[color]}`}>
        <div
          className={`h-full rounded-full transition-all ${barColors[color]}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between text-xs">
        <span className={over ? 'text-red-500 font-medium' : 'text-stone-500'}>{Math.round(value)}g</span>
        <span className="text-stone-400">meta: {goal != null ? Math.round(goal) : '—'}g</span>
      </div>
    </div>
  )
}

function LogCard({ log, patient }) {
  const { nutrition, hydration } = log
  const targets = patient.macros

  const waterPct = hydration.mlGoal > 0
    ? Math.min(Math.round((hydration.mlConsumed / hydration.mlGoal) * 100), 100)
    : 0
  const waterOver = hydration.mlConsumed > hydration.mlGoal

  return (
    <div className="bg-white rounded-xl border border-orange-100 p-5 space-y-4">
      {/* Date + kcal badge */}
      <div className="flex items-start justify-between">
        <span className="text-sm font-medium text-stone-700 capitalize">{formatDate(log.date)}</span>
        <span className="text-xs bg-orange-50 text-orange-600 border border-orange-200 px-2.5 py-1 rounded-full font-semibold whitespace-nowrap">
          {Math.round(nutrition.kcal)} kcal
        </span>
      </div>

      {/* Macros */}
      <div>
        <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-2">Macronutrientes</p>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-orange-500 font-medium mb-1">Proteína</p>
            <ProgressBar
              value={nutrition.protein}
              goal={targets?.protein?.target}
              color="orange"
            />
          </div>
          <div>
            <p className="text-xs text-amber-500 font-medium mb-1">Carboidrato</p>
            <ProgressBar
              value={nutrition.carbs}
              goal={targets?.carbs?.target}
              color="amber"
            />
          </div>
          <div>
            <p className="text-xs text-stone-400 font-medium mb-1">Gordura</p>
            <ProgressBar
              value={nutrition.fat}
              goal={targets?.fat?.target}
              color="stone"
            />
          </div>
        </div>
      </div>

      {/* Hydration */}
      <div>
        <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-2">Hidratação</p>
        <div className="space-y-1">
          <div className="h-1.5 rounded-full overflow-hidden bg-blue-100">
            <div
              className={`h-full rounded-full transition-all ${waterOver ? 'bg-red-400' : 'bg-blue-400'}`}
              style={{ width: `${waterPct}%` }}
            />
          </div>
          <div className="flex justify-between text-xs">
            <span className={waterOver ? 'text-red-500 font-medium' : 'text-blue-600 font-medium'}>
              🫗 {Math.round(hydration.mlConsumed)} ml
            </span>
            <span className="text-stone-400">meta: {Math.round(hydration.mlGoal)} ml · {waterPct}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function PatientLogs({ patient, onBack }) {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPatientLogs(patient.id)
      .then(setLogs)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [patient.id])

  return (
    <div className="space-y-5">
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
          <p className="text-xs text-stone-400">Histórico de registros diários</p>
        </div>
        {!loading && !error && (
          <span className="ml-auto text-xs text-stone-400 bg-stone-100 px-2.5 py-1 rounded-full">
            {logs.length} {logs.length === 1 ? 'registro' : 'registros'}
          </span>
        )}
      </div>

      {/* Content */}
      {loading && (
        <div className="flex items-center justify-center h-48">
          <p className="text-stone-400 text-sm">Carregando registros...</p>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center h-48">
          <p className="text-red-400 text-sm">Erro ao carregar: {error}</p>
        </div>
      )}

      {!loading && !error && logs.length === 0 && (
        <div className="flex flex-col items-center justify-center h-48 gap-2">
          <span className="text-3xl">📭</span>
          <p className="text-stone-400 text-sm">Nenhum registro sincronizado ainda.</p>
          <p className="text-stone-300 text-xs">Os dados aparecem aqui após o paciente sincronizar pelo app.</p>
        </div>
      )}

      {!loading && !error && logs.length > 0 && (
        <div className="space-y-3">
          {logs.map(log => (
            <LogCard key={log._id} log={log} patient={patient} />
          ))}
        </div>
      )}
    </div>
  )
}

export default PatientLogs
