import { Check } from 'lucide-react';

const BOOKING_URL = 'https://outlook.office.com/book/ReservaunareuninconGliss1@alumnos.uai.cl/';

interface PricingSectionProps {
  onSubscribe?: (planName: string) => void;
  onFreeStart?: () => void;
}

export default function PricingSection({ onSubscribe, onFreeStart }: PricingSectionProps) {
  const plans = [
    {
      name: 'Acceso gratis',
      price: 'Siempre',
      tagline: 'Comienza tu viaje de imagen',
      features: [
        '1 análisis de imagen completo',
        'Paleta de colores personalizada',
        'Descubrimiento de tu temporada',
        'Visualización de tu perfil',
        'Sin tarjeta de crédito requerida',
      ],
      highlighted: false,
      cta: 'Comenzar ahora',
      url: '#',
      isPremium: false,
    },
    {
      name: 'Premium',
      price: '$149.9',
      priceFreq: '/mes',
      tagline: 'Para quienes son serios con su estilo',
      badge: 'Más popular',
      features: [
        '50 análisis de imagen completos',
        'Historial completo de todos tus perfiles',
        'Descargar paletas en alta definición',
        'Compartir perfil en redes sociales',
        '+1500 productos recomendados',
        'Actualizaciones de recomendaciones mensuales',
      ],
      highlighted: true,
      cta: 'Suscribirse ahora',
      url: '#',
      isPremium: true,
    },
    {
      name: 'Luxury',
      price: '$1090',
      priceFreq: '/mes',
      tagline: 'Asesoramiento completo que no tiene límites',
      features: [
        'Análisis de imagen ilimitados',
        'Historial completo de todos tus perfiles',
        'Descargar paletas en alta definición',
        'Compartir perfil en redes sociales',
        '+1500 productos recomendados',
        'Actualizaciones de recomendaciones mensuales',
        'Soporte prioritario 24/7',
        'Consultas personalizadas con estilistas',
      ],
      highlighted: false,
      luxury: true,
      cta: 'Suscribirse ahora',
      url: '#',
      isPremium: true,
    },
  ];

  return (
    <section id="precios" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F7FB]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 fade-in">
          <p className="text-sm font-medium text-[#7F77DD] uppercase tracking-wide mb-3">
            Precios
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E] mb-4">
            Acceso a tu análisis de imagen
          </h2>
          <p className="text-lg text-[#6B6B8A] max-w-2xl mx-auto">
            Comienza gratis. Amplía cuando necesites más.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto fade-in-delay">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 transition-all duration-150 relative ${
                plan.luxury
                  ? 'bg-gradient-to-br from-[#1A1A2E] to-[#2D2D4A] text-white border-2 border-amber-400 shadow-2xl'
                  : plan.highlighted
                  ? 'bg-gradient-to-br from-[#7F77DD] to-[#378ADD] text-white scale-105 shadow-2xl'
                  : 'bg-white text-[#1A1A2E] shadow-md hover:shadow-lg'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#378ADD] text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-md">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`text-2xl font-bold mb-1 ${
                    plan.highlighted
                      ? 'text-white'
                      : plan.luxury
                      ? 'text-white'
                      : 'text-[#1A1A2E]'
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span
                    className={`text-3xl font-bold ${
                      plan.highlighted
                        ? 'text-white'
                        : plan.luxury
                        ? 'text-amber-400'
                        : 'text-[#7F77DD]'
                    }`}
                  >
                    {plan.price}
                  </span>
                  {plan.priceFreq && (
                    <span
                      className={`${
                        plan.highlighted
                          ? 'text-white/90'
                          : plan.luxury
                          ? 'text-white/90'
                          : 'text-[#6B6B8A]'
                      }`}
                    >
                      {plan.priceFreq}
                    </span>
                  )}
                </div>
                <p
                  className={`text-sm ${
                    plan.highlighted
                      ? 'text-white/90'
                      : plan.luxury
                      ? 'text-white/90'
                      : 'text-[#6B6B8A]'
                  }`}
                >
                  {plan.tagline}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check
                      className={`flex-shrink-0 mt-0.5 ${
                        plan.highlighted
                          ? 'text-white'
                          : plan.luxury
                          ? 'text-amber-400'
                          : 'text-[#7F77DD]'
                      }`}
                      size={20}
                    />
                    <span
                      className={`${
                        plan.highlighted
                          ? 'text-white/95'
                          : plan.luxury
                          ? 'text-white/95'
                          : 'text-[#6B6B8A]'
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  if (!plan.isPremium && onFreeStart) {
                    onFreeStart();
                  } else if (plan.isPremium && onSubscribe) {
                    onSubscribe(plan.name);
                  }
                }}
                className={`w-full py-3.5 rounded-full font-medium transition-all duration-150 ${
                  plan.highlighted
                    ? 'bg-white text-[#7F77DD] hover:bg-gray-50'
                    : plan.luxury
                    ? 'border-2 border-amber-400 text-white hover:bg-amber-400 hover:text-[#1A1A2E]'
                    : 'border-2 border-[#7F77DD] text-[#7F77DD] hover:bg-[#7F77DD] hover:text-white'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-[#6B6B8A]">
            ¿Tienes preguntas?{' '}
            <a href={BOOKING_URL} className="text-[#7F77DD] font-semibold hover:underline">
              Agenda una consulta
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
