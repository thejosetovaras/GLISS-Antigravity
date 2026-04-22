import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const BOOKING_URL = 'https://outlook.office.com/book/ReservaunareuninconGliss1@alumnos.uai.cl/';

interface NavbarProps {
  onProductoClick?: () => void;
  onHomeClick?: () => void;
}

export default function Navbar({ onProductoClick, onHomeClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnchorClick = (anchor: string) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(anchor);
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  const navLinks = [
    { label: 'Inicio', to: '/', type: 'page' as const },
    { label: 'Producto', type: 'modal' as const },
    { label: 'Cómo funciona', anchor: 'como-funciona', type: 'anchor' as const },
    { label: 'Precios', anchor: 'precios', type: 'anchor' as const },
    { label: 'Nosotros', to: '/nosotros', type: 'page' as const },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              onClick={onHomeClick}
              className="text-2xl font-bold bg-gradient-to-r from-[#7F77DD] to-[#378ADD] bg-clip-text text-transparent"
            >
              GLISS
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.type === 'page' ? (
                  <Link
                    to={link.to!}
                    onClick={link.label === 'Inicio' ? onHomeClick : undefined}
                    className="text-[#6B6B8A] hover:text-[#7F77DD] transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                ) : link.type === 'modal' ? (
                  <button
                    onClick={onProductoClick}
                    className="text-[#6B6B8A] hover:text-[#7F77DD] transition-colors duration-150"
                  >
                    {link.label}
                  </button>
                ) : (
                  <button
                    onClick={() => handleAnchorClick(link.anchor!)}
                    className="text-[#6B6B8A] hover:text-[#7F77DD] transition-colors duration-150"
                  >
                    {link.label}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="hidden md:block">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#7F77DD] text-white px-6 py-2.5 rounded-full hover:bg-[#6B65C9] transition-all duration-150 font-medium"
            >
              Contactar
            </a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#6B6B8A] hover:text-[#7F77DD] transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.type === 'page' ? (
                  <Link
                    to={link.to!}
                    className="block text-[#6B6B8A] hover:text-[#7F77DD] transition-colors py-2"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (link.label === 'Inicio' && onHomeClick) {
                        onHomeClick();
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                ) : link.type === 'modal' ? (
                  <button
                    onClick={() => {
                      onProductoClick?.();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-[#6B6B8A] hover:text-[#7F77DD] transition-colors py-2"
                  >
                    {link.label}
                  </button>
                ) : (
                  <button
                    onClick={() => handleAnchorClick(link.anchor!)}
                    className="block w-full text-left text-[#6B6B8A] hover:text-[#7F77DD] transition-colors py-2"
                  >
                    {link.label}
                  </button>
                )}
              </div>
            ))}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block bg-[#7F77DD] text-white px-6 py-2.5 rounded-full hover:bg-[#6B65C9] transition-all duration-150 font-medium mt-2 text-center"
            >
              Contactar
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
