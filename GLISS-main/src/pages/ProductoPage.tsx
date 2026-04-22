import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layers, RotateCcw, SlidersHorizontal, Zap, Plug, BarChart2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useModal } from '../App';

const BOOKING_URL = 'https://outlook.office.com/book/ReservaunareuninconGliss1@alumnos.uai.cl/';

const iconMap: Record<string, any> = {
  Layers,
  RotateCcw,
  SlidersHorizontal,
  Zap,
  Plug,
  BarChart2,
};

export default function ProductoPage() {
  const { setModalOpen } = useModal();
  
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-delay');
    fadeElements.forEach((el) => observer.observe(el));

    return () => {
      fadeElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const features = [
    {
      icon: 'Layers',
      title: 'Simulación de texturas',
      description:
        'Cada tejido tiene propiedades físicas únicas: peso, elasticidad, transparencia. El renderizado muestra cómo cae el denim frente al lino o la seda.',
    },
    {
      icon: 'RotateCcw',
      title: 'Rotación 360°',
      description:
        'El cliente puede girar el avatar completo y revisar el ajuste en espalda, cadera y largo. Sin ángulo muerto.',
    },
    {
      icon: 'SlidersHorizontal',
      title: 'Avatar personalizable',
      description:
        'Ingreso de medidas corporales reales: talla, busto, cintura, cadera, largo de pierna, hombros. Precisión milimétrica.',
    },
    {
      icon: 'Zap',
      title: 'Renderizado instantáneo',
      description:
        'Cambiar de prenda toma menos de 1 segundo. Sin esperas, sin carga. La experiencia es fluida desde el primer clic.',
    },
    {
      icon: 'Plug',
      title: 'Integración nativa',
      description:
        'SDK plug-and-play para Shopify y WooCommerce. Implementación en menos de 2 horas sin tocar tu stack actual.',
    },
    {
      icon: 'BarChart2',
      title: 'Analytics de fitting',
      description:
        'Mide qué prendas generan más pruebas, qué tallas se solicitan más y cómo impacta el probador en tu tasa de conversión.',
    },
  ];

  return (
    <>
      <Navbar onProductoClick={() => setModalOpen(true)} />
      <div className="pt-20">
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-radial from-[#EEEDF9] via-[#F5F4FB] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <p className="text-sm font-medium text-[#7F77DD] uppercase tracking-wide mb-3">
              Tecnología
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-[#1A1A2E] mb-4 leading-tight">
              Fidelidad visual que cierra ventas
            </h1>
            <p className="text-lg text-[#6B6B8A] max-w-3xl mx-auto">
              GLISS no muestra una prenda sobre un maniquí genérico. La renderiza sobre el cuerpo real de tu cliente, con simulación de texturas, caída de tela y ajuste milimétrico.
            </p>
          </div>

          <div className="max-w-3xl mx-auto fade-in-delay">
            <div className="relative aspect-video bg-white rounded-2xl shadow-2xl border border-gray-100 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#F7F7FB] to-[#EEEDF9]"></div>
              <div className="relative text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-[#7F77DD]/20 mx-auto"></div>
                <p className="text-[#6B6B8A] font-medium">Video demo: 3D modelo • 360° • Texturas</p>
                <p className="text-sm text-[#AFA9EC]">16:9 aspecto — Demostración de probador virtual</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tech-features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E]">
              Lo que hace diferente a GLISS
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 fade-in-delay">
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon];
              return (
                <div
                  key={index}
                  className="bg-white border border-[#EEEDF9] rounded-2xl p-8 hover:border-[#7F77DD] hover:shadow-lg transition-all duration-150"
                >
                  <Icon className="text-[#7F77DD] mb-4" size={28} />
                  <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[#6B6B8A] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#7F77DD] to-[#378ADD]">
        <div className="max-w-3xl mx-auto text-center fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            ¿Quieres verlo sobre tu catálogo?
          </h2>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-[#7F77DD] px-10 py-4 rounded-full hover:bg-gray-50 transition-all duration-150 font-semibold text-lg shadow-xl hover:scale-105"
          >
            Agendar demo
          </a>
        </div>
      </section>
      </div>
    </>
  );
}
