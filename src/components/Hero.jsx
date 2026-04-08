function Hero() {
  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-emerald-50 py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <span className="inline-block bg-green-100 text-green-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          Nutrição · Saúde · Bem-estar
        </span>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
          Alimentação consciente para uma{' '}
          <span className="text-green-600">vida mais saudável</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          O NutriVida é um projeto dedicado a promover hábitos alimentares equilibrados,
          oferecendo orientação e educação nutricional de forma acessível e prática.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#sobre"
            className="bg-green-600 text-white px-8 py-3.5 rounded-full font-medium text-base hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
          >
            Saiba mais
          </a>
          <a
            href="#beneficios"
            className="border border-green-300 text-green-700 px-8 py-3.5 rounded-full font-medium text-base hover:bg-green-50 transition-colors"
          >
            Ver benefícios
          </a>
        </div>

        <div className="mt-16 flex justify-center gap-12 text-center">
          <div>
            <p className="text-3xl font-bold text-green-600">100%</p>
            <p className="text-sm text-gray-400 mt-1">Gratuito</p>
          </div>
          <div className="w-px bg-gray-200"></div>
          <div>
            <p className="text-3xl font-bold text-green-600">+500</p>
            <p className="text-sm text-gray-400 mt-1">Dicas nutricionais</p>
          </div>
          <div className="w-px bg-gray-200"></div>
          <div>
            <p className="text-3xl font-bold text-green-600">24h</p>
            <p className="text-sm text-gray-400 mt-1">De conteúdo</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
