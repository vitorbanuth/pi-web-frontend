function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🥗</span>
            <span className="text-lg font-semibold text-white">NutriVida</span>
          </div>

          <div className="text-center text-sm text-gray-400">
            <p>Projeto Integrador III — Desenvolvimento Web</p>
            <p className="mt-1">Sprint 1 · Landing Page Inicial</p>
          </div>

          <div className="text-sm text-gray-400 text-center md:text-right">
            <p>Projeto acadêmico</p>
            <p className="mt-1 text-gray-500">CEUB · {new Date().getFullYear()}</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-xs text-gray-500">
          Este é um projeto acadêmico sem fins comerciais, desenvolvido para fins educacionais.
        </div>
      </div>
    </footer>
  )
}

export default Footer
