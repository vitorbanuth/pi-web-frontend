const benefits = [
  {
    emoji: '🥗',
    title: 'Alimentação Equilibrada',
    description:
      'Aprenda a montar pratos nutritivos e saborosos, respeitando as necessidades do seu organismo sem abrir mão do prazer de comer bem.',
  },
  {
    emoji: '💚',
    title: 'Mais Qualidade de Vida',
    description:
      'Pequenas mudanças nos hábitos alimentares geram grandes impactos na disposição, no humor e na saúde geral ao longo do tempo.',
  },
  {
    emoji: '📅',
    title: 'Organização da Rotina',
    description:
      'Com orientações práticas, fica mais fácil planejar refeições, reduzir desperdícios e criar uma rotina alimentar consistente e sustentável.',
  },
  {
    emoji: '🧠',
    title: 'Consciência Nutricional',
    description:
      'Entenda o que está no seu prato: macronutrientes, micronutrientes e como cada escolha alimentar influencia a sua saúde.',
  },
]

function Benefits() {
  return (
    <section id="beneficios" className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-green-600 text-sm font-semibold uppercase tracking-wider mb-3">
            Benefícios
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            O que o NutriVida oferece
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Conheça os pilares que guiam a proposta do nosso projeto e como cada um contribui
            para uma vida mais saudável e consciente.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl mb-4">
                {benefit.emoji}
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 text-base">{benefit.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Benefits
