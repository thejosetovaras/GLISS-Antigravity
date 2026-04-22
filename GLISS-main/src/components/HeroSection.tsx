import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const BOOKING_URL = 'https://outlook.office.com/book/ReservaunareuninconGliss1@alumnos.uai.cl/';

interface HeroSectionProps {
  onProductoClick?: () => void;
}

export default function HeroSection({ onProductoClick }: HeroSectionProps) {
  return (
    <section className="relative pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-radial from-[#EEEDF9] via-[#F5F4FB] to-white">
      <div className="absolute top-20 right-10 opacity-30">
        <Sparkles className="text-[#7F77DD]" size={32} />
      </div>
      <div className="absolute top-40 right-32 opacity-20">
        <Sparkles className="text-[#378ADD]" size={24} />
      </div>
      <div className="absolute top-60 right-20 opacity-25">
        <Sparkles className="text-[#AFA9EC]" size={20} />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-6 fade-in">
            <p className="text-sm font-medium text-[#7F77DD] uppercase tracking-wide">
              Asesoramiento de Imagen Personalizado
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A2E] leading-tight">
              Tu estilo perfecto te espera
            </h1>
            <p className="text-lg sm:text-xl text-[#6B6B8A] leading-relaxed">
              GLISS analiza tus características únicas y te recomienda productos que realmente te favorecen. Descubre tu paleta de colores ideal y crea outfits que potencien lo mejor de ti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#7F77DD] text-white px-8 py-3.5 rounded-full hover:bg-[#6B65C9] transition-all duration-150 font-medium shadow-lg hover:shadow-xl hover:scale-105 text-center"
              >
                Contactar
              </a>
              <button
                onClick={onProductoClick}
                className="border-2 border-[#7F77DD] text-[#7F77DD] px-8 py-3.5 rounded-full hover:bg-[#7F77DD] hover:text-white transition-all duration-150 font-medium text-center"
              >
                Conocer plataforma
              </button>
            </div>
          </div>

          <div className="relative lg:block hidden fade-in-delay h-[500px] rounded-3xl overflow-hidden shadow-xl">
            <img 
              src="/images/analysis-hero.jpg" 
              alt="Análisis de Imagen Personalizado"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
