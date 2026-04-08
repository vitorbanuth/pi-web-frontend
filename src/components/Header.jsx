import { useState } from 'react'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🥗</span>
          <span className="text-xl font-semibold text-green-700">NutriVida</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#sobre" className="text-gray-600 hover:text-green-600 transition-colors text-sm font-medium">
            Sobre
          </a>
          <a href="#beneficios" className="text-gray-600 hover:text-green-600 transition-colors text-sm font-medium">
            Benefícios
          </a>
          <a href="#proposta" className="bg-green-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition-colors">
            Conheça o projeto
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          <a href="#sobre" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-green-600 text-sm font-medium">Sobre</a>
          <a href="#beneficios" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-green-600 text-sm font-medium">Benefícios</a>
          <a href="#proposta" onClick={() => setMenuOpen(false)} className="text-green-600 font-medium text-sm">Conheça o projeto</a>
        </div>
      )}
    </header>
  )
}

export default Header
