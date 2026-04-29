import { Check } from 'lucide-react';

const BOOKING_URL = 'https://outlook.office.com/book/ReservaunareuninconGliss1@alumnos.uai.cl/';

interface PricingSectionProps {
  onSubscribe?: (planName: string) => void;
  onFreeStart?: () => void;
}

export default function PricingSection({ onSubscribe, onFreeStart }: PricingSectionProps) {
  const plans = [
    {
      name: 'Premium',
      price: '$149.990',
      subtitle: 'CLP / mes + IVA',
      badge: '3% comisión por venta recomendada por GLISS',
      tagline: 'Suscripción mensual + 3% de comisión solo cuando tu tienda vende. Si GLISS no genera ventas, no pagas comisión.',
      features: [
        '30 artículos en el pool de recomendación',
        'Analizador de colorimetría en tu tienda',
        'Widget one-click sin programación',
        'Conector automático de catálogo',
        'Dashboard básico de métricas',
        'Soporte por email',
      ],
      highlighted: false,
      cta: 'Solicitar demo',
      url: '#',
      isPremium: true,
    },
    {
      name: 'Growth',
      price: '$399.990',
      subtitle: 'CLP / mes + IVA',
      badge: 'Más popular',
      badge2: '3% comisión por venta recomendada por GLISS',
      tagline: 'Suscripción mensual + 3% de comisión solo cuando tu tienda vende. Si GLISS no genera ventas, no pagas comisión.',
      features: [
        '200 artículos en el pool de recomendación',
        'Analizador de colorimetría en tu tienda',
        'Widget one-click sin programación',
        'Conector automático de catálogo',
        'Dashboard avanzado + exportación',
        'Segmentación de inventario por paleta',
        'Campañas dirigidas por colorimetría',
        'Soporte prioritario',
      ],
      highlighted: true,
      cta: 'Solicitar demo',
      url: '#',
      isPremium: true,
    },
    {
      name: 'Scale',
      price: '$1.099.000',
      subtitle: 'CLP / mes + IVA',
      badge: '3% comisión por venta recomendada por GLISS',
      tagline: 'Suscripción mensual + 3% de comisión solo cuando tu tienda vende. Si GLISS no genera ventas, no pagas comisión.',
      features: [
        'Artículos ilimitados en el pool de recomendación',
        'Analizador de colorimetría en tu tienda',
        'Widget one-click sin programación',
        'Conector automático de catálogo',
        'Dashboard avanzado + exportación',
        'Segmentación de inventario por paleta',
        'Campañas dirigidas por colorimetría',
        'Soporte prioritario + onboarding dedicado',
        'API access para integraciones personalizadas',
      ],
      highlighted: false,
      luxury: true,
      cta: 'Solicitar demo',
      url: '#',
      isPremium: true,
    },
  ];

  return (
    <section id="precios" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F7FB]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 fade-in">
          <p className="text-sm font-medium text-[#7F77DD] uppercase tracking-wide mb-3">
            Planes
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E] mb-4">
            Planes GLISS
          </h2>
          <p className="text-lg text-[#6B6B8A] max-w-3xl mx-auto">
            Suscripción mensual + 3% de comisión solo cuando tu tienda vende.<br />
            Si GLISS no genera ventas, no pagas comisión.
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
                  <span className="bg-white text-[#7F77DD] text-xs font-semibold px-4 py-1.5 rounded-full shadow-md">
                    {plan.badge}
                  </span>
                </div>
              )}
              
              {plan.badge2 && (
                <div className="bg-white rounded-lg p-3 mb-4 text-center">
                  <span className="text-xs font-semibold text-[#7F77DD]">
                    {plan.badge2}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <p className={`text-xs uppercase tracking-wider font-semibold mb-2 ${
                  plan.highlighted ? 'text-blue-200' : plan.luxury ? 'text-amber-300' : 'text-[#7F77DD]'
                }`}>
                  {plan.name === 'Premium' ? 'PREMIUM' : plan.name === 'Growth' ? 'GROWTH' : 'SCALE'}
                </p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span
                    className={`text-4xl font-bold ${
                      plan.highlighted
                        ? 'text-white'
                        : plan.luxury
                        ? 'text-white'
                        : 'text-white'
                    }`}
                  >
                    {plan.price}
                  </span>
                </div>
                {plan.subtitle && (
                  <p className={`text-xs mb-3 ${
                    plan.highlighted
                      ? 'text-white/80'
                      : plan.luxury
                      ? 'text-white/80'
                      : 'text-white/80'
                  }`}>
                    {plan.subtitle}
                  </p>
                )}
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
