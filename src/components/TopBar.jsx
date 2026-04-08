const pageTitles = {
  dashboard: 'Dashboard',
  patients:  'Pacientes',
}

function TopBar({ activePage }) {
  return (
    <header className="bg-white border-b border-orange-100 px-6 py-4 flex items-center justify-between">
      <h1 className="text-base font-semibold text-stone-800">{pageTitles[activePage] || 'Dashboard'}</h1>
      <span className="text-sm text-stone-400">NutriSmart · Sprint 1</span>
    </header>
  )
}

export default TopBar
