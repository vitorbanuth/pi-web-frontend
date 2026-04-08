function CTA() {
  return (
    <section id="proposta" className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-green-600 to-emerald-500 rounded-3xl px-8 py-16 text-center text-white shadow-xl">
          <span className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            Nossa proposta
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Comece hoje a cuidar da sua alimentação
          </h2>
          <p className="text-green-100 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            O NutriVida acredita que a transformação começa com informação.
            Queremos ser o ponto de partida para escolhas mais conscientes e uma vida mais plena.
          </p>
          <button className="bg-white text-green-700 px-8 py-3.5 rounded-full font-semibold text-base hover:bg-green-50 transition-colors shadow-md">
            Conheça o projeto
          </button>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/20 pt-10">
            <div>
              <p className="text-2xl font-bold">🥦</p>
              <p className="text-sm text-green-100 mt-1">Alimentação saudável</p>
            </div>
            <div>
              <p className="text-2xl font-bold">📚</p>
              <p className="text-sm text-green-100 mt-1">Educação nutricional</p>
            </div>
            <div>
              <p className="text-2xl font-bold">🌿</p>
              <p className="text-sm text-green-100 mt-1">Bem-estar integral</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
