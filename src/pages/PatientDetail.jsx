function MacroCard({ label, actual, target, unit, color }) {
  const pct = Math.min(Math.round((actual / target) * 100), 100)
  const over = actual > target
  const colors = {
    protein: { from: '#fdba74', to: '#f97316', bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700' },
    carbs:   { from: '#fde68a', to: '#d97706', bg: 'bg-amber-50',  border: 'border-amber-200',  text: 'text-amber-700'  },
    fat:     { from: '#d6d3d1', to: '#78716c', bg: 'bg-stone-50',  border: 'border-stone-200',  text: 'text-stone-700'  },
  }
  const c = colors[color] || colors.protein

  return (
    <div className={`rounded-2xl p-5 border ${c.border} ${c.bg}`}>
      <div className="flex justify-between items-start mb-4">
        <span className={`text-sm font-semibold ${c.text}`}>{label}</span>
        {over
          ? <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">Acima</span>
          : <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">{pct}%</span>
        }
      </div>

      {/* Circular-ish progress using SVG */}
      <div className="flex items-end justify-between">
        <div>
          <p className={`text-3xl font-bold ${over ? 'text-red-600' : c.text}`}>{actual}<span className="text-base font-normal ml-0.5">{unit}</span></p>
          <p className="text-xs text-stone-400 mt-0.5">Meta: {target}{unit}</p>
        </div>
        <div className="w-12 h-12 relative">
          <svg viewBox="0 0 36 36" className="w-12 h-12 -rotate-90">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e7e5e4" strokeWidth="3" />
            <circle
              cx="18" cy="18" r="15.9" fill="none"
              stroke={over ? '#dc2626' : c.to}
              strokeWidth="3"
              strokeDasharray={`${pct} ${100 - pct}`}
              strokeDashoffset="0"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Bar */}
      <div className="mt-3 h-1.5 bg-stone-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: over ? '#dc2626' : `linear-gradient(90deg, ${c.from}, ${c.to})`,
          }}
        />
      </div>
    </div>
  )
}

function MealRow({ meal }) {
  return (
    <div className={`flex items-center justify-between py-3 border-b border-stone-100 last:border-0`}>
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
            meal.compliance ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          }`}
        >
          {meal.compliance ? '✓' : '✗'}
        </div>
        <div>
          <p className="text-sm font-medium text-stone-700">{meal.meal}</p>
          <p className="text-xs text-stone-400">{meal.date}</p>
        </div>
      </div>
      <span className="text-sm font-semibold text-stone-600">{meal.calories} kcal</span>
    </div>
  )
}


function PatientDetail({ patient, onBack }) {
  if (!patient) {
    return (
      <div className="text-center py-20 text-stone-400">
        <p className="text-4xl mb-3">👤</p>
        <p>Nenhum paciente selecionado</p>
        <button onClick={onBack} className="mt-4 text-orange-600 text-sm font-medium hover:underline">
          ← Voltar para a lista
        </button>
      </div>
    )
  }

  const caloriesPct = Math.round((patient.calories.actual / patient.calories.target) * 100)
  const bmiColors = { 'Normal': 'text-green-600', 'Sobrepeso': 'text-amber-600', 'Obesidade I': 'text-red-600' }

  return (
    <div className="space-y-5">
      {/* Back button */}
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
        Voltar para Pacientes
      </button>

      {/* Patient header card */}
      <div
        className="rounded-2xl p-6 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #292524 0%, #7c2d12 60%, #c2410c 100%)' }}
      >
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4">
          <div
            className={`w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xl font-bold bg-gradient-to-br ${patient.avatarBg} ring-4 ring-white/20`}
          >
            {patient.avatar}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold">{patient.name}</h2>
              {patient.status === 'alert' && (
                <span className="text-xs font-bold text-red-200 bg-red-500/30 px-2.5 py-1 rounded-full border border-red-400/30">⚠ Requer atenção</span>
              )}
            </div>
            <div className="flex flex-wrap gap-4 mt-2 text-orange-200 text-sm">
              <span>{patient.age} anos · {patient.gender === 'F' ? 'Feminino' : 'Masculino'}</span>
              <span>·</span>
              <span>📞 {patient.phone}</span>
              <span>·</span>
              <span>✉️ {patient.email}</span>
            </div>
          </div>
          <div className="flex flex-col sm:items-end gap-1">
            <span className="text-xs text-orange-200">Objetivo</span>
            <span className="text-sm font-semibold bg-white/15 px-3 py-1 rounded-full">{patient.goal}</span>
          </div>
        </div>

        {/* Quick stats in header */}
        <div className="relative z-10 grid grid-cols-4 gap-4 mt-6 pt-5 border-t border-white/15">
          <div>
            <p className="text-orange-200 text-xs">Peso Atual</p>
            <p className="text-white font-bold text-lg">{patient.weight}kg</p>
          </div>
          <div>
            <p className="text-orange-200 text-xs">Meta</p>
            <p className="text-white font-bold text-lg">{patient.targetWeight}kg</p>
          </div>
          <div>
            <p className="text-orange-200 text-xs">IMC</p>
            <p className="text-white font-bold text-lg">{patient.bmi}</p>
            <p className={`text-xs font-medium ${bmiColors[patient.bmiLabel] || 'text-orange-200'} bg-white/10 px-1.5 py-0.5 rounded-full inline-block mt-0.5`}>
              {patient.bmiLabel}
            </p>
          </div>
          <div>
            <p className="text-orange-200 text-xs">Adesão</p>
            <p className={`font-bold text-lg ${patient.compliance >= 80 ? 'text-green-300' : 'text-red-300'}`}>
              {patient.compliance}%
            </p>
          </div>
        </div>

        {/* Decorative */}
        <div className="absolute right-0 top-0 w-40 h-40 rounded-full opacity-5 -translate-y-12 translate-x-12" style={{ background: 'white' }} />
      </div>

      {/* Macros + Calories grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Calories card */}
        <div className="bg-white rounded-2xl p-5 border border-orange-200 shadow-sm flex flex-col justify-between"
          style={{ borderLeftWidth: '4px', borderLeftColor: '#f97316' }}
        >
          <div>
            <p className="text-sm font-semibold text-stone-500 mb-1">Calorias Totais</p>
            <p className="text-4xl font-bold text-orange-600">{patient.calories.actual}<span className="text-base font-normal text-stone-400 ml-1">kcal</span></p>
            <p className="text-xs text-stone-400 mt-1">Meta: {patient.calories.target} kcal</p>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-stone-500 mb-1">
              <span>Consumido</span>
              <span>{caloriesPct}%</span>
            </div>
            <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${caloriesPct}%`,
                  background: caloriesPct > 105
                    ? 'linear-gradient(90deg, #f97316, #dc2626)'
                    : 'linear-gradient(90deg, #fdba74, #f97316)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Macro cards */}
        <MacroCard label="Proteína"     actual={patient.macros.protein.actual} target={patient.macros.protein.target} unit="g" color="protein" />
        <MacroCard label="Carboidrato"  actual={patient.macros.carbs.actual}   target={patient.macros.carbs.target}   unit="g" color="carbs" />
        <MacroCard label="Gordura"      actual={patient.macros.fat.actual}      target={patient.macros.fat.target}     unit="g" color="fat" />
      </div>

      {/* Bottom grid: meals + notes + visits */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Recent meals */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-orange-100 shadow-sm">
          <h3 className="font-bold text-stone-800 mb-4">Refeições Recentes</h3>
          <div>
            {patient.recentMeals.map((meal, i) => (
              <MealRow key={i} meal={meal} />
            ))}
          </div>
        </div>

        {/* Notes + visit info */}
        <div className="space-y-4">
          {/* Notes */}
          <div className="bg-white rounded-2xl p-5 border border-orange-100 shadow-sm">
            <h3 className="font-bold text-stone-800 mb-3">Observações Clínicas</h3>
            <p className="text-sm text-stone-600 leading-relaxed">{patient.notes}</p>
            <button className="mt-4 w-full text-sm text-orange-600 font-medium hover:text-orange-700 py-2 border border-orange-200 rounded-xl hover:bg-orange-50 transition-colors">
              Adicionar nota
            </button>
          </div>

          {/* Visit info */}
          <div className="bg-white rounded-2xl p-5 border border-orange-100 shadow-sm">
            <h3 className="font-bold text-stone-800 mb-3">Consultas</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl">
                <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center text-sm">📅</div>
                <div>
                  <p className="text-xs text-stone-400">Última consulta</p>
                  <p className="text-sm font-semibold text-stone-700">{patient.lastVisit}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm">📌</div>
                <div>
                  <p className="text-xs text-stone-400">Próxima consulta</p>
                  <p className="text-sm font-semibold text-orange-700">{patient.nextVisit}</p>
                </div>
              </div>
            </div>
            <button
              className="mt-3 w-full text-sm font-semibold text-white py-2.5 rounded-xl transition-colors"
              style={{ background: 'linear-gradient(135deg, #ea580c, #c2410c)' }}
            >
              Agendar consulta
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PatientDetail
