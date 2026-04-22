export default function SocialProofSection() {
  const testimonials = [
    {
      name: 'María Rodríguez',
      role: 'Fashionista',
      comment: 'Finalmente entiendo qué colores me favorecen. Cambió completamente mi forma de comprar ropa.',
      rating: 5,
    },
    {
      name: 'Laura Martínez',
      role: 'Consultora de imagen',
      comment: 'GLISS confirma lo que enseño a mis clientes. Es increíble tener una herramienta tan precisa.',
      rating: 5,
    },
    {
      name: 'Sofia Torres',
      role: 'Emprendedora',
      comment: 'El análisis de colorimetría me ayudó a elegir la paleta perfecta para mi marca personal.',
      rating: 5,
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Testimonios sección */}
        <div className="mb-16">
          <h3 className="text-center text-[#1A1A2E] font-semibold text-2xl mb-12 fade-in">
            Lo que dicen nuestros usuarios
          </h3>
          <div className="grid md:grid-cols-3 gap-8 fade-in-delay">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-[#F7F7FB] rounded-xl p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-[#7F77DD] text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-[#6B6B8A] mb-4 italic">"{testimonial.comment}"</p>
                <p className="font-semibold text-[#1A1A2E]">{testimonial.name}</p>
                <p className="text-sm text-[#6B6B8A]">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Brands sección */}
        <div className="border-t pt-16">
          <h3 className="text-center text-[#6B6B8A] font-medium mb-12 fade-in">
            Confían en GLISS
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-16 fade-in-delay">
            {['Brand 1', 'Brand 2', 'Brand 3', 'Brand 4', 'Brand 5'].map((brand, index) => (
              <div
                key={index}
                className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
              >
                <span className="text-gray-500 text-sm font-medium">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
