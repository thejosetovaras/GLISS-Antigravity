import { useEffect } from 'react';
import { Leaf, Cpu, TrendingDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useModal } from '../App';

const BOOKING_URL = 'https://outlook.office.com/book/ReservaunareuninconGliss1@alumnos.uai.cl/';

export default function NosotrosPage() {
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

  const values = [
    {
      icon: Leaf,
      title: 'Sustentabilidad',
      description:
        'Cada devolución eliminada es un envío menos, un embalaje menos, una emisión menos. La moda responsable empieza por no devolver.',
    },
    {
      icon: Cpu,
      title: 'Innovación industrial',
      description:
        'Llevamos tecnología de visualización 3D — hasta ahora reservada para videojuegos AAA — al retail de moda cotidiano.',
    },
    {
      icon: TrendingDown,
      title: 'Reducción de devoluciones',
      description:
        'Nuestra métrica norte: cada tienda que integra GLISS reduce sus devoluciones un mínimo del 30% en el primer mes.',
    },
  ];

  return (
    <>
      <Navbar onProductoClick={() => setModalOpen(true)} />
      <div className="pt-20">
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-radial from-[#EEEDF9] via-[#F5F4FB] to-white">
        <div className="max-w-4xl mx-auto text-center fade-in">
          <p className="text-sm font-medium text-[#7F77DD] uppercase tracking-wide mb-3">
            Nuestra misión
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-[#1A1A2E] mb-6 leading-tight">
            Construimos el futuro de la moda responsable
          </h1>
          <p className="text-lg sm:text-xl text-[#6B6B8A] leading-relaxed">
            Cada devolución tiene un costo: logístico, ambiental y emocional. GLISS nació para eliminarlas.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto fade-in-delay">
          <p className="text-lg text-[#6B6B8A] leading-relaxed mb-12">
            El eCommerce de moda genera millones de devoluciones al año por un único problema: el comprador no puede saber cómo le quedará una prenda. GLISS resuelve eso. No con filtros ni con fotos de modelos genéricas — sino con tecnología 3D que pone la prenda exacta sobre el cuerpo exacto del comprador.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F7FB]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E]">
              Nuestros pilares
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 fade-in-delay">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-150"
                >
                  <Icon className="text-[#7F77DD] mb-4" size={32} />
                  <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-[#6B6B8A] leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E] mb-4">
            El equipo
          </h2>
          <p className="text-lg text-[#6B6B8A] leading-relaxed mb-8">
            Somos un equipo multidisciplinario de ingenieros 3D, diseñadores UX y especialistas en retail digital, construyendo desde Santiago, Chile.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#7F77DD] text-white px-8 py-3.5 rounded-full hover:bg-[#6B65C9] transition-all duration-150 font-medium shadow-lg hover:shadow-xl hover:scale-105"
          >
            Habla con nosotros
          </a>
        </div>
      </section>
      </div>
    </>
  );
}
