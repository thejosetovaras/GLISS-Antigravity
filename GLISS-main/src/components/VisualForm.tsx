import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, HelpCircle } from 'lucide-react';

interface UserCharacteristics {
  gender: string;
  hairColor: string;
  hairTexture: string;
  hairLength: string;
  eyeColor: string;
  skinTone: string;
  skinUndertone: string;
  lipColor: string;
  eyebrowColor: string;
  faceShape: string;
  noseType: string;
  additionalTraits: string[];
}

interface VisualFormProps {
  onComplete: (characteristics: UserCharacteristics) => void;
  onBack: () => void;
}

export default function VisualForm({ onComplete, onBack }: VisualFormProps) {
  const [formStep, setFormStep] = useState<number>(1);
  const [formData, setFormData] = useState<UserCharacteristics>({
    gender: '',
    hairColor: '',
    hairTexture: '',
    hairLength: '',
    eyeColor: '',
    skinTone: '',
    skinUndertone: '',
    lipColor: '',
    eyebrowColor: '',
    faceShape: '',
    noseType: '',
    additionalTraits: [],
  });

  const totalSteps = 4;

  // Color options
  const hairColors = [
    { name: 'Negro', color: '#1C1C1C' },
    { name: 'Castaño Oscuro', color: '#3D2817' },
    { name: 'Castaño Claro', color: '#704214' },
    { name: 'Rubio Oscuro', color: '#8B7355' },
    { name: 'Rubio Claro', color: '#D4AF37' },
    { name: 'Rubio Intenso', color: '#F3C623' },
    { name: 'Pelirrojo', color: '#C04000' },
    { name: 'Gris', color: '#A9A9A9' },
    { name: 'Blanco', color: '#F5F5F5' },
  ];

  const hairTextures = [
    { name: 'Liso', icon: '—' },
    { name: 'Ondulado', icon: '〰️' },
    { name: 'Rizado', icon: '◉' },
    { name: 'Muy Rizado', icon: '◉◉' },
  ];

  const hairLengths = ['Muy Corto', 'Corto', 'Medio', 'Largo', 'Muy Largo'];

  const eyeColors = [
    { name: 'Marrón Oscuro', color: '#3D2817' },
    { name: 'Marrón Claro', color: '#8B7355' },
    { name: 'Verde', color: '#50C878' },
    { name: 'Azul', color: '#378ADD' },
    { name: 'Gris', color: '#A9A9A9' },
    { name: 'Miel', color: '#DAA520' },
  ];

  const skinTones = [
    { name: 'Muy Claro', color: '#F5DEB3' },
    { name: 'Claro', color: '#F0E68C' },
    { name: 'Medio Claro', color: '#D2B48C' },
    { name: 'Medio', color: '#CD853F' },
    { name: 'Medio Oscuro', color: '#8B4513' },
    { name: 'Oscuro', color: '#3D2817' },
    { name: 'Muy Oscuro', color: '#1C1C1C' },
  ];

  const skinUnderTones = [
    { name: 'Frío', description: 'Tonos rosados, azulados o púrpuras' },
    { name: 'Neutro', description: 'Mezcla de frío y cálido, equilibrado' },
    { name: 'Cálido', description: 'Tonos dorados, anaranjados o amarillentos' },
  ];

  const lipColors = [
    { name: 'Rosa Claro', color: '#FFB6C1' },
    { name: 'Rosa Medio', color: '#FF69B4' },
    { name: 'Coral', color: '#FF7F50' },
    { name: 'Rojo Claro', color: '#CD5C5C' },
    { name: 'Rojo Oscuro', color: '#8B0000' },
    { name: 'Marrón Claro', color: '#D2691E' },
    { name: 'Marrón Oscuro', color: '#654321' },
    { name: 'Violeta', color: '#9370DB' },
  ];

  const faceShapes = [
    { name: 'Ovalado', shape: '⭕' },
    { name: 'Redondo', shape: '●' },
    { name: 'Cuadrado', shape: '■' },
    { name: 'Corazón', shape: '❤️' },
    { name: 'Diamante', shape: '◆' },
  ];

  const noseTypes = ['Respingada', 'Recta', 'Ancha', 'Aguileña'];
  const additionalTraitsOptions = ['Pecas', 'Manchas', 'Ojeras Marcadas', 'Arrugas', 'Cicatrices', 'Lunares'];

  const updateFormData = (field: keyof UserCharacteristics, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleTrait = (trait: string) => {
    setFormData(prev => ({
      ...prev,
      additionalTraits: prev.additionalTraits.includes(trait)
        ? prev.additionalTraits.filter(t => t !== trait)
        : [...prev.additionalTraits, trait],
    }));
  };

  const isStepValid = () => {
    switch (formStep) {
      case 1:
        return formData.gender !== '' && formData.hairColor !== '';
      case 2:
        return formData.hairTexture !== '' && formData.hairLength !== '';
      case 3:
        return formData.eyeColor && formData.skinTone && formData.skinUndertone && formData.lipColor && formData.eyebrowColor;
      case 4:
        return formData.faceShape !== '' && formData.noseType !== '';
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isStepValid()) {
      if (formStep < totalSteps) {
        setFormStep(formStep + 1);
      } else {
        onComplete(formData);
      }
    }
  };

  const handlePrev = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEEDF9] via-[#F5F4FB] to-white pt-20 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handlePrev}
            className="flex items-center gap-2 text-[#7F77DD] hover:text-[#6B65C9] mb-6 font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            Atrás
          </button>
          <h1 className="text-4xl font-bold text-[#1A1A2E] mb-2">Descríbete</h1>
          <p className="text-lg text-[#6B6B8A]">Cuéntanos sobre tus características únicas</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex gap-2 mb-3">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  idx < formStep ? 'bg-[#7F77DD]' : idx === formStep - 1 ? 'bg-[#378ADD]' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-[#6B6B8A]">Paso {formStep} de {totalSteps}</p>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          {/* Step 1: Gender & Hair Color */}
          {formStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-[#1A1A2E] mb-8">Género y Cabello</h2>

              {/* Gender */}
              <div className="mb-10">
                <label className="block text-lg font-semibold text-[#1A1A2E] mb-6">¿Cuál es tu género?</label>
                <div className="grid grid-cols-2 gap-4 max-w-md">
                  {['Hombre', 'Mujer'].map(gender => (
                    <button
                      key={gender}
                      type="button"
                      onClick={() => updateFormData('gender', gender)}
                      className={`py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                        formData.gender === gender
                          ? 'bg-gradient-to-r from-[#7F77DD] to-[#378ADD] text-white shadow-lg ring-2 ring-[#7F77DD]'
                          : 'bg-gray-100 text-[#1A1A2E] hover:bg-gray-200'
                      }`}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hair Color */}
              <div>
                <label className="block text-lg font-semibold text-[#1A1A2E] mb-6">Color de Cabello</label>
                <div className="grid grid-cols-4 gap-3">
                  {hairColors.map(color => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => updateFormData('hairColor', color.name)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 ${
                        formData.hairColor === color.name ? 'ring-2 ring-[#7F77DD] scale-105' : ''
                      }`}
                    >
                      <div
                        className="w-12 h-12 rounded-full shadow-md border-2 cursor-pointer"
                        style={{
                          backgroundColor: color.color,
                          borderColor: formData.hairColor === color.name ? '#7F77DD' : '#E5E5E5',
                        }}
                      />
                      <span className="text-xs text-center font-medium text-[#6B6B8A]">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Hair Texture & Length */}
          {formStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-[#1A1A2E] mb-8">Textura y Largo del Cabello</h2>

              {/* Hair Texture */}
              <div className="mb-10">
                <label className="block text-lg font-semibold text-[#1A1A2E] mb-6">Textura del Cabello</label>
                <div className="grid grid-cols-2 gap-4">
                  {hairTextures.map(texture => (
                    <button
                      key={texture.name}
                      type="button"
                      onClick={() => updateFormData('hairTexture', texture.name)}
                      className={`py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                        formData.hairTexture === texture.name
                          ? 'bg-gradient-to-r from-[#7F77DD] to-[#378ADD] text-white shadow-lg'
                          : 'bg-gray-100 text-[#1A1A2E] hover:bg-gray-200'
                      }`}
                    >
                      <span className="text-2xl">{texture.icon}</span>
                      {texture.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hair Length */}
              <div>
                <label className="block text-lg font-semibold text-[#1A1A2E] mb-6">Largo del Cabello</label>
                <div className="grid grid-cols-5 gap-3">
                  {hairLengths.map(length => (
                    <button
                      key={length}
                      type="button"
                      onClick={() => updateFormData('hairLength', length)}
                      className={`py-3 px-3 rounded-lg font-medium transition-all duration-300 text-sm ${
                        formData.hairLength === length
                          ? 'bg-gradient-to-r from-[#7F77DD] to-[#378ADD] text-white shadow-lg'
                          : 'bg-gray-100 text-[#1A1A2E] hover:bg-gray-200'
                      }`}
                    >
                      {length}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Eyes, Skin & Lips */}
          {formStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-[#1A1A2E] mb-8">Ojos, Piel y Labios</h2>

              {/* Eye Color */}
              <div className="mb-10">
                <label className="block text-lg font-semibold text-[#1A1A2E] mb-6">Color de Ojos</label>
                <div className="grid grid-cols-3 gap-3">
                  {eyeColors.map(color => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => updateFormData('eyeColor', color.name)}
                      className={`flex items-center gap-3 p-4 rounded-lg transition-all duration-300 ${
                        formData.eyeColor === color.name
                          ? 'bg-gradient-to-r from-[#7F77DD] to-[#378ADD] text-white shadow-lg ring-2 ring-[#7F77DD]'
                          : 'bg-gray-100 text-[#1A1A2E] hover:bg-gray-200'
                      }`}
                    >
                      <div
                        className="w-6 h-6 rounded-full shadow-sm border-2 flex-shrink-0"
                        style={{
                          backgroundColor: color.color,
                          borderColor: formData.eyeColor === color.name ? 'white' : '#ccc',
                        }}
                      />
                      <span className="text-sm font-medium">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Skin Tone */}
              <div className="mb-10">
                <label className="block text-lg font-semibold text-[#1A1A2E] mb-6">Tono de Piel</label>
                <div className="grid grid-cols-7 gap-2">
                  {skinTones.map(tone => (
                    <button
                      key={tone.name}
                      type="button"
                      onClick={() => updateFormData('skinTone', tone.name)}
                      className={`h-14 rounded-lg shadow-md transition-all duration-300 relative flex items-center justify-center cursor-pointer ${
                        formData.skinTone === tone.name ? 'ring-2 ring-[#7F77DD] scale-105' : ''
                      }`}
                      style={{ backgroundColor: tone.color }}
                      title={tone.name}
                    >
                      {formData.skinTone === tone.name && (
                        <Check size={20} className="text-[#1A1A2E]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skin Undertone */}
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <label className="block text-lg font-semibold text-[#1A1A2E]">Subtono de Piel</label>
                  <div className="group relative">
                    <HelpCircle size={18} className="text-[#7F77DD] cursor-help" />
                    <div className="hidden group-hover:block absolute z-10 bg-[#1A1A2E] text-white text-sm p-3 rounded-lg whitespace-nowrap">
                      Observa las venas: azuladas=frío, verdosas=cálido, ambas=neutro
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[#6B6B8A] mb-6">
                  Consejo: Observa las venas en tu muñeca. Si son azuladas es frío, verdosas es cálido, y si ves ambas es neutro.
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {skinUnderTones.map(tone => (
                    <button
                      key={tone.name}
                      type="button"
                      onClick={() => updateFormData('skinUndertone', tone.name)}
                      className={`p-4 rounded-lg text-left transition-all duration-300 cursor-pointer ${
                        formData.skinUndertone === tone.name
                          ? 'bg-gradient-to-r from-[#7F77DD] to-[#378ADD] text-white shadow-lg'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <div className={`font-semibold ${formData.skinUndertone === tone.name ? 'text-white' : 'text-[#1A1A2E]'}`}>
                        {tone.name}
                      </div>
                      <div className={`text-sm ${formData.skinUndertone === tone.name ? 'text-white/90' : 'text-[#6B6B8A]'}`}>
                        {tone.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Lip Color */}
              <div className="mb-10">
                <label className="block text-lg font-semibold text-[#1A1A2E] mb-6">Color Natural de Labios</label>
                <div className="grid grid-cols-4 gap-3">
                  {lipColors.map(color => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => updateFormData('lipColor', color.name)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-300 ${
                        formData.lipColor === color.name ? 'ring-2 ring-[#7F77DD] scale-105' : ''
                      }`}
                    >
                      <div
                        className="w-14 h-8 rounded-full shadow-md border-2 cursor-pointer"
                        style={{
                          backgroundColor: color.color,
                          borderColor: formData.lipColor === color.name ? '#7F77DD' : '#E5E5E5',
                        }}
                      />
                      <span className="text-xs text-center font-medium text-[#6B6B8A]">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Eyebrow Color */}
              <div>
                <label className="block text-lg font-semibold text-[#1A1A2E] mb-6">Color Natural de Cejas</label>
                <div className="grid grid-cols-4 gap-3">
                  {hairColors.map(color => (
                    <button
                      key={`eyebrow-${color.name}`}
                      type="button"
                      onClick={() => updateFormData('eyebrowColor', color.name)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-300 ${
                        formData.eyebrowColor === color.name ? 'ring-2 ring-[#7F77DD] scale-105' : ''
                      }`}
                    >
                      <div
                        className="w-12 h-6 rounded-lg shadow-md border-2 cursor-pointer"
                        style={{
                          backgroundColor: color.color,
                          borderColor: formData.eyebrowColor === color.name ? '#7F77DD' : '#E5E5E5',
                        }}
                      />
                      <span className="text-xs text-center font-medium text-[#6B6B8A]">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Face Shape, Nose & Traits */}
          {formStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-[#1A1A2E] mb-8">Forma del Rostro y Rasgos</h2>

              {/* Face Shape */}
              <div className="mb-10">
                <label className="block text-lg font-semibold text-[#1A1A2E] mb-6">Forma del Rostro</label>
                <div className="grid grid-cols-5 gap-4">
                  {faceShapes.map(shape => (
                    <button
                      key={shape.name}
                      type="button"
                      onClick={() => updateFormData('faceShape', shape.name)}
                      className={`flex flex-col items-center gap-3 p-4 rounded-lg transition-all duration-300 cursor-pointer ${
                        formData.faceShape === shape.name
                          ? 'bg-gradient-to-r from-[#7F77DD] to-[#378ADD] text-white shadow-lg ring-2 ring-[#7F77DD]'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <span className="text-4xl">{shape.shape}</span>
                      <span className="text-xs font-medium text-center">{shape.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Nose Type */}
              <div className="mb-10">
                <label className="block text-lg font-semibold text-[#1A1A2E] mb-6">Tipo de Nariz</label>
                <div className="grid grid-cols-2 gap-3">
                  {noseTypes.map(nose => (
                    <button
                      key={nose}
                      type="button"
                      onClick={() => updateFormData('noseType', nose)}
                      className={`py-3 px-4 rounded-lg font-medium transition-all duration-300 cursor-pointer ${
                        formData.noseType === nose
                          ? 'bg-gradient-to-r from-[#7F77DD] to-[#378ADD] text-white shadow-lg'
                          : 'bg-gray-100 text-[#1A1A2E] hover:bg-gray-200'
                      }`}
                    >
                      {nose}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Traits */}
              <div>
                <label className="block text-lg font-semibold text-[#1A1A2E] mb-6">Rasgos Adicionales</label>
                <p className="text-sm text-[#6B6B8A] mb-4">Selecciona los que apliquen a ti</p>
                <div className="grid grid-cols-2 gap-3">
                  {additionalTraitsOptions.map(trait => (
                    <button
                      key={trait}
                      type="button"
                      onClick={() => toggleTrait(trait)}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 font-medium cursor-pointer ${
                        formData.additionalTraits.includes(trait)
                          ? 'bg-gradient-to-r from-[#7F77DD] to-[#378ADD] text-white shadow-lg'
                          : 'bg-gray-100 text-[#1A1A2E] hover:bg-gray-200'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                          formData.additionalTraits.includes(trait)
                            ? 'bg-white border-white'
                            : 'border-gray-400'
                        }`}
                      >
                        {formData.additionalTraits.includes(trait) && (
                          <Check size={16} className="text-[#7F77DD]" />
                        )}
                      </div>
                      {trait}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            type="button"
            onClick={handlePrev}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 bg-white border-2 border-[#7F77DD] text-[#7F77DD] hover:bg-[#7F77DD] hover:text-white"
          >
            <ArrowLeft size={20} />
            Atrás
          </button>
          <div className="flex-1" />
          <button
            type="button"
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-medium transition-all duration-300 ${
              isStepValid()
                ? 'bg-gradient-to-r from-[#7F77DD] to-[#378ADD] text-white hover:shadow-lg cursor-pointer'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {formStep === totalSteps ? 'Completar' : 'Siguiente'}
            {formStep < totalSteps && <ArrowRight size={20} />}
            {formStep === totalSteps && <Check size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}
