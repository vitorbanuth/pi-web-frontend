const pageTitles = {
  dashboard: 'Dashboard',
  patients:  'Pacientes',
}

const weekdays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
const months   = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

function TopBar({ activePage }) {
  const now = new Date()
  const dateStr = `${weekdays[now.getDay()]}, ${now.getDate()} de ${months[now.getMonth()]}. de ${now.getFullYear()}`

  return (
    <header className="bg-white border-b border-stone-100 px-6 py-3.5 flex items-center justify-between">
      <h1 className="text-sm font-semibold text-stone-800 tracking-wide uppercase">
        {pageTitles[activePage] || 'Dashboard'}
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-xs text-stone-400">{dateStr}</span>
        <div className="w-7 h-7 rounded-full bg-orange-600 flex items-center justify-center">
          <span className="text-white text-xs font-bold">CF</span>
        </div>
      </div>
    </header>
  )
}

export default TopBar
