import { useState, useRef, useEffect } from 'react';
import { ArrowRight, Upload, Camera, X, Zap, RotateCcw } from 'lucide-react';
import VisualForm from './VisualForm';

interface ImageAnalysisFlowProps {
  initialImage?: string | null;
  onClose?: () => void;
  onComplete?: (characteristics: any) => void;
}

type Gender = 'male' | 'female' | null;
type FlowStep = 'gender-selection' | 'image-capture' | 'analysis-results' | 'form' | 'camera-view';

const colorimetryProfiles = [
  { season: 'Primavera', description: 'Tu paleta ideal incluye tonos pasteles, cálidos y luminosos como melocotón, verde menta y azules claros.', colors: ['#FFDAB9', '#98FF98', '#ADD8E6', '#FFB6C1', '#F0E68C', '#E6E6FA'], metal: 'Dorado', metalColor: '#FFD700' },
  { season: 'Verano', description: 'Tu paleta ideal incluye tonos empolvados y frescos como azul cielo, rosa pastel y lavanda.', colors: ['#87CEEB', '#FFB6C1', '#E6E6FA', '#D8BFD8', '#B0E0E6', '#F5FFFA'], metal: 'Plateado', metalColor: '#C0C0C0' },
  { season: 'Otoño', description: 'Tu paleta ideal incluye colores cálidos y tierra como mostaza, oliva y terracota.', colors: ['#FFDB58', '#808000', '#E2725B', '#DAA520', '#CD853F', '#D2B48C'], metal: 'Dorado', metalColor: '#FFD700' },
  { season: 'Invierno', description: 'Tu paleta ideal incluye colores intensos, oscuros y contrastantes como negro, rojo vino y azul noche.', colors: ['#000000', '#722F37', '#191970', '#8B0000', '#4B0082', '#000080'], metal: 'Plateado', metalColor: '#C0C0C0' }
];

const maleRecommendations = [
  { name: 'Blazer', category: 'Superior' },
  { name: 'Camiseta', category: 'Superior' },
  { name: 'Pantalón', category: 'Inferior' },
  { name: 'Suéter', category: 'Superior' },
  { name: 'Chaqueta', category: 'Abrigo' },
  { name: 'Accesorio', category: 'Accesorio' },
];

const femaleRecommendations = [
  { name: 'Vestido', category: 'Vestido' },
  { name: 'Blusa', category: 'Superior' },
  { name: 'Falda', category: 'Inferior' },
  { name: 'Blusa', category: 'Superior' },
  { name: 'Chaqueta', category: 'Abrigo' },
  { name: 'Accesorio', category: 'Accesorio' },
];

// Color to descriptive name mapping
const colorNameMap: { [key: string]: string } = {
  '#001F3F': 'Azul Marino',
  '#50C878': 'Verde Esmeralda',
  '#2F4F4F': 'Gris Carbón',
  '#4B0082': 'Morado Oscuro',
  '#1C1C1C': 'Negro',
  '#FFD700': 'Dorado',
  '#00008B': 'Azul Profundo',
  '#6A0572': 'Morado',
};

// Function to generate search URL
const generateTiendaUrl = (product: string, color: string): string => {
  const colorName = colorNameMap[color] || color;
  const searchQuery = `${product} ${colorName}`.replace(/\s+/g, '-');
  return `#search-${searchQuery}`;
};

// Product mapping for purchase section
const getShoppingProducts = (gender: Gender) => {
  if (gender === 'male') {
    return [
      { name: 'Chaqueta', colorIndex: 0, icon: '🧥' },
      { name: 'Polera', colorIndex: 1, icon: '👕' },
      { name: 'Pantalón', colorIndex: 2, icon: '👖' },
    ];
  } else {
    return [
      { name: 'Chaqueta', colorIndex: 0, icon: '🧥' },
      { name: 'Polera', colorIndex: 1, icon: '👚' },
      { name: 'Pantalón', colorIndex: 2, icon: '👖' },
    ];
  }
};

export default function ImageAnalysisFlow({ initialImage, onClose, onComplete }: ImageAnalysisFlowProps) {
  const [currentStep, setCurrentStep] = useState<FlowStep>(
    initialImage === 'camera' ? 'camera-view' : initialImage ? 'image-capture' : 'gender-selection'
  );
  const [selectedGender, setSelectedGender] = useState<Gender>(initialImage ? 'female' : null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(
    initialImage === 'camera' ? null : initialImage || null
  );
  const [isAnalyzing, setIsAnalyzing] = useState(
    initialImage && initialImage !== 'camera' ? true : false
  );
  const [userProfile, setUserProfile] = useState<any>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const baseRecommendations =
    selectedGender === 'male' ? maleRecommendations : femaleRecommendations;
  
  const recommendations = baseRecommendations.map((rec, i) => ({
    ...rec,
    color: userProfile ? userProfile.colors[i % userProfile.colors.length] : '#000000'
  }));

  useEffect(() => {
    if (initialImage === 'camera') {
      handleOpenCamera();
    } else if (initialImage) {
      simulateAnalysis();
    }
  }, [initialImage]);

  // Asegurar que los elementos con fade-in se vuelvan visibles
  useEffect(() => {
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-delay');
    // Pequeño timeout para asegurar que el DOM se haya actualizado
    setTimeout(() => {
      fadeElements.forEach((el) => el.classList.add('visible'));
    }, 50);
  }, [currentStep]);

  // Cleanup camera stream on unmount or step change
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  // Stop camera when leaving camera-view step
  useEffect(() => {
    if (currentStep !== 'camera-view' && cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  }, [currentStep]);

  const handleGenderSelection = (gender: Gender) => {
    setSelectedGender(gender);
    setCurrentStep('image-capture');
  };

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        simulateAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleOpenCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      setCameraStream(stream);
      setCurrentStep('camera-view');
      
      // Set video source after component updates
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 0);
    } catch (err: any) {
      setCameraError(
        err.message === 'Permission denied'
          ? 'Necesitas permitir acceso a la cámara'
          : 'No se pudo acceder a la cámara. Intenta con otro navegador o dispositivo.'
      );
    }
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current && videoRef.current.readyState === videoRef.current.HAVE_FUTURE_DATA) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        const video = videoRef.current;
        canvasRef.current.width = video.videoWidth;
        canvasRef.current.height = video.videoHeight;
        
        // Draw the video frame to canvas
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        
        // Convert to image
        const imageData = canvasRef.current.toDataURL('image/jpeg', 0.9);
        setUploadedImage(imageData);
        
        // Stop camera stream
        if (cameraStream) {
          cameraStream.getTracks().forEach(track => track.stop());
          setCameraStream(null);
        }
        
        // Start analysis
        simulateAnalysis();
      }
    } else {
      alert('La cámara aún no está lista. Intenta de nuevo.');
    }
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setCurrentStep('image-capture');
    
    // Asignar un perfil de colorimetría al azar
    const randomProfile = colorimetryProfiles[Math.floor(Math.random() * colorimetryProfiles.length)];
    setUserProfile(randomProfile);

    setTimeout(() => {
      setIsAnalyzing(false);
      setCurrentStep('analysis-results');
    }, 3000);
  };

  const handleFormPath = () => {
    setCurrentStep('form');
  };

  const handleFormComplete = (characteristics: any) => {
    // Simular análisis con datos del formulario
    setSelectedGender(characteristics.gender === 'Hombre' ? 'male' : 'female');
    setCurrentStep('analysis-results');
  };

  const handleReset = () => {
    setCurrentStep('gender-selection');
    setSelectedGender(null);
    setUploadedImage(null);
    setIsAnalyzing(false);
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  const handleSaveResults = () => {
    const characteristics = {
      gender: selectedGender === 'male' ? 'Hombre' : 'Mujer',
      colorimetryType: userProfile?.season || 'Invierno Cálido',
      recommendedColors: userProfile?.colors.slice(0, 3) || ['#000000'],
      recommendations: recommendations,
      uploadedImage: uploadedImage,
    };
    
    if (onComplete) {
      onComplete(characteristics);
    } else {
      handleReset();
    }
  };

  // Show form when in form step
  if (currentStep === 'form') {
    return (
      <VisualForm
        onComplete={handleFormComplete}
        onBack={() => setCurrentStep('gender-selection')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEEDF9] via-[#F5F4FB] to-white">
      {/* Header con botón cerrar */}
      <div className="pt-6 px-4 flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-[#1A1A2E]">Análisis de Imagen GLISS</h1>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-full transition-all duration-300"
          >
            <X size={24} className="text-[#6B6B8A]" />
          </button>
        )}
      </div>

      <div className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-4xl w-full">
          {/* Step 1: Gender Selection */}
          {currentStep === 'gender-selection' && (
            <div className="fade-in">
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A2E] mb-4">
                  ¿Para quién es el análisis?
                </h2>
                <p className="text-lg text-[#6B6B8A]">
                  Elige tu género para personalizar las recomendaciones de ropa
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Male Option */}
                <button
                  onClick={() => handleGenderSelection('male')}
                  className="group relative bg-white rounded-2xl p-12 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:ring-2 hover:ring-[#7F77DD] hover:-translate-y-2"
                >
                  <div className="text-center">
                    <div className="text-6xl mb-6">👨</div>
                    <h3 className="text-3xl font-bold text-[#1A1A2E] mb-2">Hombre</h3>
                    <p className="text-[#6B6B8A]">
                      Recomendaciones personalizadas para prendas masculinas
                    </p>
                  </div>
                  <div className="absolute bottom-6 right-6 text-[#7F77DD] opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={28} />
                  </div>
                </button>

                {/* Female Option */}
                <button
                  onClick={() => handleGenderSelection('female')}
                  className="group relative bg-white rounded-2xl p-12 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:ring-2 hover:ring-[#378ADD] hover:-translate-y-2"
                >
                  <div className="text-center">
                    <div className="text-6xl mb-6">👩</div>
                    <h3 className="text-3xl font-bold text-[#1A1A2E] mb-2">Mujer</h3>
                    <p className="text-[#6B6B8A]">
                      Recomendaciones personalizadas para prendas femeninas
                    </p>
                  </div>
                  <div className="absolute bottom-6 right-6 text-[#378ADD] opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={28} />
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Image Capture */}
          {currentStep === 'image-capture' && !uploadedImage && (
            <div className="fade-in">
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A2E] mb-4">
                  Elige tu camino
                </h2>
                <p className="text-lg text-[#6B6B8A]">
                  Puedes subir una foto o completar un formulario visual
                </p>
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Upload Button */}
                  <button
                    onClick={handleUploadClick}
                    className="group relative bg-gradient-to-br from-[#7F77DD] to-[#378ADD] rounded-2xl p-12 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 text-white"
                  >
                    <div className="text-center">
                      <Upload size={48} className="mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Subir Foto</h3>
                      <p className="text-white/90">Selecciona una imagen de tu dispositivo</p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
                      className="hidden"
                    />
                  </button>

                  {/* Form Button */}
                  <button
                    onClick={handleFormPath}
                    className="group relative bg-gradient-to-br from-[#378ADD] to-[#7F77DD] rounded-2xl p-12 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 text-white"
                  >
                    <div className="text-center">
                      <ArrowRight size={48} className="mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Formulario Visual</h3>
                      <p className="text-white/90">Completa tus características manualmente</p>
                    </div>
                  </button>
                </div>

                {/* Guidelines */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <p className="text-sm font-semibold text-[#7F77DD] mb-3">
                    Para mejores resultados con foto:
                  </p>
                  <ul className="text-sm text-[#6B6B8A] space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#7F77DD]">✓</span>
                      <span>Iluminación natural, sin sombras en el rostro</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#7F77DD]">✓</span>
                      <span>Foto de frente, directa a la cámara</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#7F77DD]">✓</span>
                      <span>Sin gafas de sol o accesorios que cubran el rostro</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#7F77DD]">✓</span>
                      <span>Cabello recogido si es posible para ver el rostro completo</span>
                    </li>
                  </ul>
                </div>

                {/* Camera Option */}
                <div className="mt-6">
                  <button
                    onClick={handleOpenCamera}
                    className="w-full border-2 border-[#7F77DD] text-[#7F77DD] px-6 py-3 rounded-lg hover:bg-[#7F77DD] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 font-medium"
                  >
                    <Camera size={20} />
                    O usa la cámara de tu dispositivo
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2A: Camera View */}
          {currentStep === 'camera-view' && (
            <div className="fade-in">
              <div className="text-center mb-8">
                <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A2E] mb-4">
                  Cámara Abierta
                </h2>
                <p className="text-lg text-[#6B6B8A]">
                  Posiciónate frente a la cámara y captura tu foto
                </p>
              </div>

              <div className="max-w-2xl mx-auto">
                {cameraError ? (
                  <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-8 text-center mb-6">
                    <p className="text-red-700 font-semibold mb-4">{cameraError}</p>
                    <button
                      onClick={() => setCurrentStep('image-capture')}
                      className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-all duration-300"
                    >
                      Volver
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Video Stream */}
                    <div className="relative rounded-2xl overflow-hidden shadow-xl mb-6">
                      <video
                        ref={videoRef}
                        autoPlay={true}
                        playsInline={true}
                        muted={true}
                        className="w-full h-auto bg-black"
                      />
                      {/* Overlay guide */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-64 h-80 border-4 border-white rounded-3xl opacity-50" />
                      </div>
                    </div>

                    {/* Hidden Canvas for capture */}
                    <canvas ref={canvasRef} className="hidden" />

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <button
                        onClick={handleCapture}
                        className="flex-1 bg-gradient-to-r from-[#7F77DD] to-[#378ADD] text-white px-8 py-4 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-bold text-lg"
                      >
                        <Camera size={24} />
                        Capturar Foto
                      </button>
                      <button
                        onClick={() => setCurrentStep('image-capture')}
                        className="flex-1 border-2 border-[#7F77DD] text-[#7F77DD] px-8 py-4 rounded-lg hover:bg-[#7F77DD] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
                      >
                        <X size={20} />
                        Cancelar
                      </button>
                    </div>

                    {/* Tips */}
                    <div className="bg-blue-50 rounded-xl p-4 mt-6 border border-blue-200">
                      <p className="text-sm text-blue-800">
                        💡 <span className="font-semibold">Consejo:</span> Asegúrate de que el rostro esté completamente visible y bien iluminado
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Step 2B: Analysis Loading */}
          {currentStep === 'image-capture' && uploadedImage && isAnalyzing && (
            <div className="fade-in text-center">
              <div className="mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mb-4">
                  Estamos analizando tus colores con GLISS
                </h2>
                <p className="text-lg text-[#6B6B8A]">
                  Nuestro sistema está procesando tu imagen
                </p>
              </div>

              {uploadedImage && (
                <div className="max-w-md mx-auto mb-12">
                  <img
                    src={uploadedImage}
                    alt="Foto subida"
                    className="rounded-2xl shadow-lg w-full h-auto"
                  />
                </div>
              )}

              {/* Animated Loading */}
              <div className="flex justify-center mb-12">
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2 animate-pulse">
                    <Zap size={24} className="text-[#7F77DD]" />
                    <span className="text-[#6B6B8A]">Detectando características...</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 animate-pulse" style={{ animationDelay: '0.2s' }}>
                    <Zap size={24} className="text-[#378ADD]" />
                    <span className="text-[#6B6B8A]">Analizando tonos de piel...</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 animate-pulse" style={{ animationDelay: '0.4s' }}>
                    <Zap size={24} className="text-[#AFA9EC]" />
                    <span className="text-[#6B6B8A]">Generando paleta de colores...</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="max-w-md mx-auto">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#7F77DD] to-[#378ADD] w-3/4 animate-pulse"></div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Analysis Results */}
          {currentStep === 'analysis-results' && (
            <div className="fade-in">
              {/* Profile Info */}
              <div className="text-center mb-12">
                <div className="inline-block mb-6">
                  {uploadedImage && (
                    <div className="relative">
                      <img
                        src={uploadedImage}
                        alt="Tu foto"
                        className="h-32 w-32 rounded-full shadow-lg object-cover border-4 border-white"
                      />
                      <div className="absolute -bottom-2 right-0 bg-gradient-to-r from-[#7F77DD] to-[#378ADD] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        ✓ Análisis Completado
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Seasonality Result */}
              <div className="bg-gradient-to-r from-[#7F77DD] to-[#378ADD] text-white rounded-2xl p-12 mb-12 text-center shadow-xl">
                <p className="text-sm opacity-90 mb-2">Tu análisis de colorimetría</p>
                <h2 className="text-4xl sm:text-5xl font-bold mb-4">{userProfile?.season}</h2>
                <p className="text-white/90 text-lg mb-4">
                  {userProfile?.description}
                </p>
                <div className="inline-block bg-white/20 px-6 py-2 rounded-full backdrop-blur-sm border border-white/30 font-medium">
                  Metales sugeridos: <span style={{ color: userProfile?.metalColor }} className="font-bold drop-shadow-md">{userProfile?.metal}</span>
                </div>
              </div>

              {/* Color Palette */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-[#1A1A2E] mb-6 text-center">
                  Tu Paleta de Colores
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {(userProfile?.colors || []).map(
                    (color: string, idx: number) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div
                          className="h-20 w-full rounded-lg shadow-md mb-2 hover:shadow-lg transition-shadow border border-gray-100"
                          style={{ backgroundColor: color }}
                        ></div>
                        <span className="text-xs text-[#6B6B8A] text-center font-mono">{color}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Recommendations Grid */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-[#1A1A2E] mb-6 text-center">
                  Prendas Recomendadas para ti
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.map((recommendation, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className="h-20 w-20 rounded-lg shadow-sm flex-shrink-0"
                          style={{ backgroundColor: recommendation.color }}
                        ></div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-[#7F77DD] uppercase tracking-wide">
                            {recommendation.category}
                          </p>
                          <h4 className="text-lg font-bold text-[#1A1A2E]">
                            {recommendation.name}
                          </h4>
                        </div>
                      </div>
                      <button className="w-full border-2 border-[#7F77DD] text-[#7F77DD] py-2 rounded-lg hover:bg-[#7F77DD] hover:text-white transition-all duration-300 font-medium text-sm">
                        Ver similares
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shopping Section - Tienda */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-[#1A1A2E] mb-6 text-center">
                  🛍️ Compra Ahora en Nombre de tu tienda
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {getShoppingProducts(selectedGender).map((product, idx) => {
                    const color = recommendations[idx]?.color || '#000000';
                    const colorName = colorNameMap[color] || color;
                    const mlUrl = generateTiendaUrl(product.name, color);
                    
                    return (
                      <a
                        key={idx}
                        href={mlUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-gradient-to-br from-white to-[#F5F4FB] rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-[#FFB800]"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-4xl">{product.icon}</div>
                          <div
                            className="h-12 w-12 rounded-lg shadow-sm"
                            style={{ backgroundColor: color }}
                          ></div>
                        </div>
                        <h4 className="text-lg font-bold text-[#1A1A2E] mb-2">
                          {product.name} {colorName}
                        </h4>
                        <p className="text-sm text-[#6B6B8A] mb-4">
                          Encuentra las mejores opciones en Nombre de tu tienda
                        </p>
                        <div className="flex items-center gap-2 text-[#FFB800] font-semibold group-hover:gap-3 transition-all">
                          <span>Ver en Nombre de tu tienda</span>
                          <ArrowRight size={18} />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-[#EEEDF9] to-[#F5F4FB] rounded-2xl p-8 text-center border-2 border-[#7F77DD] mb-12">
                <h3 className="text-2xl font-bold text-[#1A1A2E] mb-3">
                  ¿Quieres más análisis y recomendaciones?
                </h3>
                <p className="text-[#6B6B8A] mb-6">
                  Suscríbete a Premium o Luxury para acceso ilimitado a todos nuestros servicios
                </p>
                <button className="bg-gradient-to-r from-[#7F77DD] to-[#378ADD] text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 font-semibold">
                  Explorar Planes
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleReset}
                  className="border-2 border-[#7F77DD] text-[#7F77DD] px-8 py-3 rounded-full hover:bg-[#7F77DD] hover:text-white transition-all duration-300 font-medium flex items-center justify-center gap-2"
                >
                  Nuevo Análisis
                  <ArrowRight size={20} />
                </button>
                {onClose && (
                  <button
                    onClick={handleSaveResults}
                    className="bg-gradient-to-r from-[#7F77DD] to-[#378ADD] text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 font-medium"
                  >
                    Ver Recomendaciones
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
