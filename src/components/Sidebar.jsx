const navItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: 'patients',
    label: 'Pacientes',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
]

function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="w-56 h-screen flex flex-col" style={{ background: '#1c1917' }}>
      {/* Logo */}
      <div className="px-5 pt-7 pb-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-orange-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 6v6l4 2" />
            </svg>
          </div>
          <span className="text-white font-semibold text-base tracking-tight">NutriSmart</span>
        </div>
        <p className="text-stone-500 text-xs mt-2 ml-0.5">Painel do Nutricionista</p>
      </div>

      <div className="mx-4 border-t border-white/5 mb-3" />

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-3 ${
              activePage === item.id
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-stone-400 hover:bg-white/5 hover:text-stone-200'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* User */}
      <div className="mx-4 border-t border-white/5 mt-3" />
      <div className="px-4 py-5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-orange-600/20 border border-orange-600/30 flex items-center justify-center flex-shrink-0">
          <span className="text-orange-400 text-xs font-bold">CF</span>
        </div>
        <div className="min-w-0">
          <p className="text-stone-300 text-xs font-medium truncate">Dra. Camila Ferreira</p>
          <p className="text-stone-600 text-xs">CRN-1 · 12345</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
