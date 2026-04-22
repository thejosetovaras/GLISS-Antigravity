export default function BenefitsSection() {
  const benefits = [
    {
      stat: '1000+',
      title: 'Colores analizados',
      description:
        'Nuestra base de datos de colorimetría te hace descubrir exactamente qué tonos resaltan lo mejor de ti.',
      highlighted: false,
    },
    {
      stat: '99%',
      title: 'Satisfacción garantizada',
      description:
        'Los usuarios reportan que las recomendaciones les ayudan a encontrar prendas que realmente les favorecen.',
      highlighted: true,
    },
    {
      stat: '⏱️',
      title: '3 minutos',
      description:
        'El análisis completo toma menos de 3 minutos. Rápido, sencillo y profundamente personalizado.',
      highlighted: false,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F7FB]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E] mb-4">
            Beneficios de conocer tu perfil de imagen
          </h2>
          <p className="text-lg text-[#6B6B8A] max-w-2xl mx-auto">
            Cambia tu relación con la moda y con tu estilo personal
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 fade-in-delay">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-8 transition-all duration-150 hover:scale-105 ${
                benefit.highlighted
                  ? 'border-2 border-[#7F77DD] shadow-xl'
                  : 'border border-gray-100 shadow-md'
              }`}
            >
              {benefit.highlighted && (
                <div className="inline-block bg-[#7F77DD] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  MÁS IMPORTANTE
                </div>
              )}
              <div className="text-5xl font-bold text-[#7F77DD] mb-4">
                {benefit.stat}
              </div>
              <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">
                {benefit.title}
              </h3>
              <p className="text-[#6B6B8A] leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
