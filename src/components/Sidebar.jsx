const navItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'patients',  label: 'Pacientes' },
]

function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="w-56 h-screen flex flex-col" style={{ background: '#292524' }}>
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/10">
        <span className="text-white font-bold text-lg">NutriSmart</span>
        <p className="text-orange-300 text-xs mt-0.5">Painel do Nutricionista</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activePage === item.id
                ? 'bg-orange-600 text-white'
                : 'text-stone-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="px-5 py-4 border-t border-white/10">
        <p className="text-stone-400 text-xs">Dra. Camila Ferreira</p>
        <p className="text-stone-500 text-xs">CRN-1 · 12345</p>
      </div>
    </aside>
  )
}

export default Sidebar
