import { Camera, FormInput, Sparkles } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Comparte tus características',
      description:
        'Sube una foto o completa nuestro formulario visual intuitivo con tus rasgos físicos: color de cabello, ojos, tono de piel, forma de rostro y más.',
      icon: Camera,
    },
    {
      number: '02',
      title: 'Analizamos tu perfil',
      description:
        'Nuestro sistema de colorimetría determina tu estación de color, tu paleta ideal y crea un perfil personalizado de imagen única para ti.',
      icon: FormInput,
    },
    {
      number: '03',
      title: 'Recibe recomendaciones',
      description:
        'Descubre productos de nuestro catálogo curados especialmente para ti, que armonizan perfectamente con tus características y potencian tu estilo.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="como-funciona" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 fade-in">
          <p className="text-sm font-medium text-[#7F77DD] uppercase tracking-wide mb-3">
            Proceso
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E] mb-4">
            Tres pasos a tu estilo perfecto
          </h2>
          <p className="text-lg text-[#6B6B8A] max-w-2xl mx-auto">
            Descubre tu paleta de colores ideal y recomendaciones personalizadas en minutos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative fade-in-delay">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative">
                <div className="text-center space-y-4">
                  <div className="flex justify-center items-center mb-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-[#EEEDF9] border-2 border-[#7F77DD] flex items-center justify-center">
                        <Icon className="text-[#7F77DD]" size={36} />
                      </div>
                      <div className="absolute -top-3 -left-3 text-4xl font-bold text-[#7F77DD] leading-none">
                        {step.number}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#1A1A2E]">
                    {step.title}
                  </h3>
                  <p className="text-[#6B6B8A] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] border-t-2 border-dashed border-[#AFA9EC]"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
