import { ShoppingCart, Download, Share2, ArrowLeft } from 'lucide-react';

interface UserProfileProps {
  characteristics: any;
  onBack?: () => void;
}

export default function UserProfile({ characteristics, onBack }: UserProfileProps) {
  // Simulación de análisis de colorimetría
  const getColorSeason = () => {
    const undertone = characteristics.skinUndertone;
    
    if (undertone === 'Frío') return { season: 'Invierno', colors: ['#1A0B2E', '#0E4C92', '#FF006E', '#FFB703'] };
    if (undertone === 'Cálido') return { season: 'Otoño', colors: ['#8B4513', '#D2691E', '#CD853F', '#DAA520'] };
    return { season: 'Verano/Primavera', colors: ['#87CEEB', '#FFB6C1', '#98D8C8', '#F7DC6F'] };
  };

  const colorProfile = getColorSeason();

  // Productos recomendados de muestra
  const recommendedProducts = [
    {
      id: 1,
      name: 'Blazer Caramelo Premium',
      price: '$89.99',
      category: 'Blazer',
      image: '🧥',
      reason: 'Perfecto para tu tono de piel'
    },
    {
      id: 2,
      name: 'Jeans Azul Oscuro',
      price: '$59.99',
      category: 'Pantalón',
      image: '👖',
      reason: 'Resalta tu colorimetría'
    },
    {
      id: 3,
      name: 'Botas Marrón Chocolate',
      price: '$129.99',
      category: 'Calzado',
      image: '👢',
      reason: 'Armoniza con tu tono'
    },
    {
      id: 4,
      name: 'Blusa Marfil',
      price: '$49.99',
      category: 'Blusa',
      image: '👔',
      reason: 'Complementa tu estilo'
    },
    {
      id: 5,
      name: 'Maxifalda Marrón',
      price: '$79.99',
      category: 'Falda',
      image: '👗',
      reason: 'Ideal para tu undertone'
    },
    {
      id: 6,
      name: 'Abrigo Camel',
      price: '$159.99',
      category: 'Abrigo',
      image: '🧥',
      reason: 'Potencia tus colores'
    }
  ];

  return (
    <section className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#EEEDF9] via-[#F5F4FB] to-white">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 mb-8 px-4 py-2 text-[#7F77DD] hover:bg-[#F5F4FB] rounded-lg transition-colors duration-300"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Volver</span>
          </button>
        )}

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#1A1A2E] mb-4">Tu Perfil de Imagen Personal</h1>
          <p className="text-lg text-[#6B6B8A]">Análisis completo y recomendaciones personalizadas</p>
        </div>

        {/* Profile Summary */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Left: Characteristics */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6">Tu Perfil</h2>
            
            <div className="space-y-4">
              <div className="pb-4 border-b border-gray-200">
                <p className="text-sm text-[#6B6B8A]">Cabello</p>
                <p className="text-lg font-semibold text-[#1A1A2E]">
                  {characteristics.hairColor} • {characteristics.hairTexture} • {characteristics.hairLength}
                </p>
              </div>

              <div className="pb-4 border-b border-gray-200">
                <p className="text-sm text-[#6B6B8A]">Ojos</p>
                <p className="text-lg font-semibold text-[#1A1A2E]">{characteristics.eyeColor}</p>
              </div>

              <div className="pb-4 border-b border-gray-200">
                <p className="text-sm text-[#6B6B8A]">Tono de Piel</p>
                <p className="text-lg font-semibold text-[#1A1A2E]">
                  {characteristics.skinTone} • Subtono {characteristics.skinUndertone}
                </p>
              </div>

              <div className="pb-4 border-b border-gray-200">
                <p className="text-sm text-[#6B6B8A]">Forma del Rostro</p>
                <p className="text-lg font-semibold text-[#1A1A2E]">{characteristics.faceShape}</p>
              </div>

              {characteristics.additionalTraits.length > 0 && (
                <div>
                  <p className="text-sm text-[#6B6B8A]">Características Adicionales</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {characteristics.additionalTraits.map((trait: string) => (
                      <span
                        key={trait}
                        className="px-3 py-1 bg-[#F5F4FB] text-[#7F77DD] rounded-full text-sm font-medium"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Color Season */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6">Tu Estación de Color</h2>
            
            <div className="mb-8 p-6 bg-gradient-to-br from-[#7F77DD] to-[#378ADD] rounded-xl text-white text-center">
              <p className="text-sm opacity-90 mb-2">Estación de Colorimetría</p>
              <p className="text-4xl font-bold">{colorProfile.season}</p>
            </div>

            <div className="mb-6">
              <p className="text-sm text-[#6B6B8A] mb-3 font-semibold">Paleta de Colores Recomendada:</p>
              <div className="flex gap-3">
                {colorProfile.colors.map((color, index) => (
                  <div
                    key={index}
                    className="flex-1 h-20 rounded-lg shadow-md border-2 border-gray-100"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            <div className="bg-[#F5F4FB] rounded-lg p-4">
              <p className="text-sm text-[#6B6B8A]">
                Estos colores resaltan naturalmente tus características y crean una armonía visual con tu tono de piel y undertone.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#7F77DD] to-[#378ADD] text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium">
            <Download size={20} />
            Descargar Perfil
          </button>
          <button className="flex items-center gap-2 px-6 py-3 border-2 border-[#7F77DD] text-[#7F77DD] rounded-lg hover:bg-[#7F77DD] hover:text-white transition-all duration-300 font-medium">
            <Share2 size={20} />
            Compartir
          </button>
        </div>

        {/* Recommended Products */}
        <div>
          <h2 className="text-3xl font-bold text-[#1A1A2E] mb-2">Productos Recomendados</h2>
          <p className="text-[#6B6B8A] mb-8">Seleccionados especialmente para tu perfil</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Product Image */}
                <div className="h-40 bg-gradient-to-br from-[#F5F4FB] to-[#EEEDF9] flex items-center justify-center text-6xl">
                  {product.image}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-[#7F77DD] bg-[#F5F4FB] px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1A2E] mb-1">{product.name}</h3>
                  <p className="text-sm text-[#6B6B8A] mb-4">{product.reason}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#7F77DD]">{product.price}</span>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#7F77DD] text-white rounded-lg hover:bg-[#378ADD] transition-colors duration-300">
                      <ShoppingCart size={18} />
                      <span className="text-sm font-medium">Agregar</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#7F77DD] from-10% via-[#378ADD] via-50% to-[#7F77DD] to-90% rounded-2xl p-8 lg:p-12 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">¿Quieres explorar más?</h3>
          <p className="mb-6 opacity-90">Descubre todo nuestro catálogo de productos curados especialmente para tu estilo.</p>
          <button className="px-8 py-3 bg-white text-[#7F77DD] rounded-lg hover:bg-gray-100 transition-all duration-300 font-bold">
            Ir al Catálogo Completo
          </button>
        </div>
      </div>
    </section>
  );
}
