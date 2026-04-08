function About() {
  return (
    <section id="sobre" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Texto */}
          <div>
            <span className="inline-block text-green-600 text-sm font-semibold uppercase tracking-wider mb-3">
              Sobre o Projeto
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-5 leading-tight">
              Educação alimentar que transforma hábitos
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              O <strong className="text-gray-700">NutriVida</strong> nasceu da necessidade de aproximar a população
              de informações confiáveis sobre alimentação e nutrição. Em um cenário onde dietas da moda e
              informações equivocadas se espalham rapidamente, acreditamos que a educação nutricional é o
              caminho mais sustentável para a saúde.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Este projeto acadêmico propõe uma plataforma que orienta sobre alimentação equilibrada,
              incentiva a criação de rotinas alimentares saudáveis e promove o autoconhecimento
              nutricional de forma simples e acessível.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-1 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-400">Projeto de conclusão de disciplina — CEUB</span>
            </div>
          </div>

          {/* Cards ilustrativos */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { emoji: '🥦', label: 'Nutrição de qualidade', desc: 'Informações baseadas em ciência' },
              { emoji: '📋', label: 'Planejamento', desc: 'Monte sua rotina alimentar' },
              { emoji: '💧', label: 'Hidratação', desc: 'Cuide do seu corpo por completo' },
              { emoji: '🌱', label: 'Sustentabilidade', desc: 'Hábitos que duram uma vida' },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-green-50 rounded-2xl p-5 hover:shadow-md transition-shadow"
              >
                <span className="text-3xl">{item.emoji}</span>
                <p className="mt-3 font-semibold text-gray-700 text-sm">{item.label}</p>
                <p className="mt-1 text-gray-400 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
