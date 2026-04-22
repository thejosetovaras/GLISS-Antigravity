import { Link } from 'react-router-dom';

const BOOKING_URL = 'https://outlook.office.com/book/ReservaunareuninconGliss1@alumnos.uai.cl/';

export default function Footer() {
  const handleAnchorClick = (anchor: string) => {
    setTimeout(() => {
      const element = document.getElementById(anchor);
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  return (
    <footer className="bg-[#F7F7FB] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-[#7F77DD] to-[#378ADD] bg-clip-text text-transparent inline-block mb-3"
            >
              GLISS
            </Link>
            <p className="text-sm text-[#6B6B8A]">
              Tu ropa. Tu cuerpo. Sin dudas.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[#1A1A2E] mb-4">Producto</h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => handleAnchorClick('como-funciona')}
                  className="text-[#6B6B8A] hover:text-[#7F77DD] transition-colors text-sm"
                >
                  Cómo funciona
                </button>
              </li>
              <li>
                <Link
                  to="/producto#tech-features"
                  className="text-[#6B6B8A] hover:text-[#7F77DD] transition-colors text-sm"
                >
                  Tecnología
                </Link>
              </li>
              <li>
                <button
                  onClick={() => handleAnchorClick('precios')}
                  className="text-[#6B6B8A] hover:text-[#7F77DD] transition-colors text-sm"
                >
                  Precios
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#1A1A2E] mb-4">Empresa</h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/nosotros"
                  className="text-[#6B6B8A] hover:text-[#7F77DD] transition-colors text-sm"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <span
                  title="Próximamente"
                  className="text-[#6B6B8A] opacity-50 text-sm cursor-not-allowed"
                >
                  Carreras
                </span>
              </li>
              <li>
                <span
                  title="Próximamente"
                  className="text-[#6B6B8A] opacity-50 text-sm cursor-not-allowed"
                >
                  Prensa
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#1A1A2E] mb-4">Soporte</h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6B6B8A] hover:text-[#7F77DD] transition-colors text-sm"
                >
                  Agendar demo
                </a>
              </li>
              <li>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6B6B8A] hover:text-[#7F77DD] transition-colors text-sm"
                >
                  Contacto
                </a>
              </li>
              <li>
                <Link
                  to="/legal"
                  className="text-[#6B6B8A] hover:text-[#7F77DD] transition-colors text-sm"
                >
                  Legal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-[#6B6B8A]">
            © 2026 GLISS. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
