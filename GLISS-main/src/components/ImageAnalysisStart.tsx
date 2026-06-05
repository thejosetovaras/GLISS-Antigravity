import { useState, useRef } from 'react';
import { Camera, Upload, ArrowRight } from 'lucide-react';

interface ImageAnalysisStartProps {
  onPhotoPath: (image?: string) => void;
  onFormPath: () => void;
}

export default function ImageAnalysisStart({ onPhotoPath, onFormPath }: ImageAnalysisStartProps) {
  const [hoveredOption, setHoveredOption] = useState<'photo' | 'form' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onPhotoPath(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#EEEDF9] via-[#F5F4FB] to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1A1A2E] mb-6 leading-tight">
            Descubre tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7F77DD] to-[#378ADD]">estilo perfecto</span>
          </h1>
          <p className="text-xl text-[#6B6B8A] max-w-2xl mx-auto leading-relaxed">
            GLISS analiza tus características únicas y te recomienda productos que realmente te favorecen. 
            Experimenta la asesoría de imagen personalizada.
          </p>
        </div>

        {/* Two Paths */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Path 1: Photo Upload */}
          <div
            onMouseEnter={() => setHoveredOption('photo')}
            onMouseLeave={() => setHoveredOption(null)}
            className={`group relative bg-white rounded-2xl p-8 lg:p-10 cursor-pointer transition-all duration-300 ${
              hoveredOption === 'photo'
                ? 'transform -translate-y-2 shadow-2xl ring-2 ring-[#7F77DD]'
                : 'shadow-lg hover:shadow-2xl'
            }`}
          >
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#7F77DD] to-[#378ADD] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Camera className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A2E] mb-3">Análisis con Foto</h3>
              <p className="text-[#6B6B8A] mb-6">
                Carga una foto de tu rostro y déjanos analizar tus características físicas automáticamente.
              </p>
            </div>

            {/* Instructions */}
            <div className="bg-[#F5F4FB] rounded-lg p-4 mb-6">
              <p className="text-sm font-semibold text-[#7F77DD] mb-3">Para mejores resultados:</p>
              <ul className="text-sm text-[#6B6B8A] space-y-2">
                <li className="flex items-start">
                  <span className="text-[#7F77DD] mr-2">✓</span>
                  <span>Sin maquillaje o con maquillaje mínimo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#7F77DD] mr-2">✓</span>
                  <span>Iluminación natural, sin sombras</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#7F77DD] mr-2">✓</span>
                  <span>Cabello recogido si es posible</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#7F77DD] mr-2">✓</span>
                  <span>Foto de frente, sin filtros</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button 
                onClick={handleUploadClick}
                className="w-full bg-gradient-to-r from-[#7F77DD] to-[#378ADD] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium">
                <Upload size={20} />
                Subir foto
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onPhotoPath('camera');
                }}
                className="w-full border-2 border-[#7F77DD] text-[#7F77DD] px-6 py-3 rounded-lg hover:bg-[#7F77DD] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 font-medium">
                <Camera size={20} />
                Usar cámara
              </button>
            </div>

            <div className="absolute bottom-4 right-4 text-[#7F77DD] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowRight size={24} />
            </div>
          </div>

          {/* Path 2: Manual Form */}
          <div
            onMouseEnter={() => setHoveredOption('form')}
            onMouseLeave={() => setHoveredOption(null)}
            onClick={onFormPath}
            className={`group relative bg-white rounded-2xl p-8 lg:p-10 cursor-pointer transition-all duration-300 ${
              hoveredOption === 'form'
                ? 'transform -translate-y-2 shadow-2xl ring-2 ring-[#378ADD]'
                : 'shadow-lg hover:shadow-2xl'
            }`}
          >
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#378ADD] to-[#7F77DD] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <ArrowRight className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A2E] mb-3">Análisis Manual</h3>
              <p className="text-[#6B6B8A] mb-6">
                Cuéntanos sobre ti completando un formulario visual interactivo con tus características.
              </p>
            </div>

            {/* Benefits */}
            <div className="bg-[#F5F4FB] rounded-lg p-4 mb-6">
              <p className="text-sm font-semibold text-[#378ADD] mb-3">Ventajas:</p>
              <ul className="text-sm text-[#6B6B8A] space-y-2">
                <li className="flex items-start">
                  <span className="text-[#378ADD] mr-2">✓</span>
                  <span>Sin necesidad de foto</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#378ADD] mr-2">✓</span>
                  <span>Interfaz visual e intuitiva</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#378ADD] mr-2">✓</span>
                  <span>Análisis completo en minutos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#378ADD] mr-2">✓</span>
                  <span>Recomendaciones personalizadas</span>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <button 
              onClick={onFormPath}
              className="w-full bg-gradient-to-r from-[#378ADD] to-[#7F77DD] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium">
              Comenzar análisis manual
              <ArrowRight size={20} />
            </button>

            <div className="absolute bottom-4 right-4 text-[#378ADD] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowRight size={24} />
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-r from-[#7F77DD] from-10% via-[#378ADD] via-50% to-[#7F77DD] to-90% rounded-2xl p-8 lg:p-12 text-white">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">3 pasos</div>
              <p className="text-sm opacity-90">Análisis de imagen completo</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">100%</div>
              <p className="text-sm opacity-90">Personalizado para ti</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">+1500</div>
              <p className="text-sm opacity-90">Productos recomendados</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
