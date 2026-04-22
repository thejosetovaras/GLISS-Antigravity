import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ImageAnalysisStart from '../components/ImageAnalysisStart';
import VisualForm from '../components/VisualForm';
import UserProfile from '../components/UserProfile';
import InstallationGuide from '../components/InstallationGuide';
import HowItWorksSection from '../components/HowItWorksSection';
import BenefitsSection from '../components/BenefitsSection';
import SocialProofSection from '../components/SocialProofSection';
import PricingSection from '../components/PricingSection';
import FinalCTASection from '../components/FinalCTASection';

interface HomePageProps {
  onProductoClick?: () => void;
}

type AnalysisStep = 'hero' | 'start' | 'form' | 'profile' | 'installation';

export default function HomePage({ onProductoClick }: HomePageProps) {
  const navigate = useNavigate();
  const [analysisStep, setAnalysisStep] = useState<AnalysisStep>('hero');
  const [userCharacteristics, setUserCharacteristics] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  // Cargar datos guardados al montar
  useEffect(() => {
    const savedCharacteristics = localStorage.getItem('userCharacteristics');
    if (savedCharacteristics) {
      try {
        const parsed = JSON.parse(savedCharacteristics);
        setUserCharacteristics(parsed);
        setAnalysisStep('profile');
      } catch (e) {
        console.error('Error parsing saved characteristics:', e);
      }
    }
  }, []);

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

  const handleStartAnalysis = () => {
    setAnalysisStep('start');
  };

  const handleNavigateToProducto = () => {
    navigate('/producto');
  };

  const handleNavigateToNosotros = () => {
    navigate('/nosotros');
  };

  const handlePhotoPath = () => {
    console.log('Photo path clicked');
    // Por ahora, simular análisis con datos
    const mockCharacteristics = {
      hairColor: 'Castaño oscuro',
      hairTexture: 'Ondulado',
      hairLength: 'Largo',
      eyeColor: 'Marrón claro',
      skinTone: 'Medio',
      skinUndertone: 'Cálido',
      lipColor: '#c78855',
      eyebrowColor: '#6b4423',
      faceShape: 'Ovalado',
      noseType: 'Recta',
      additionalTraits: ['Pecas'],
      gender: 'Mujer'
    };
    setUserCharacteristics(mockCharacteristics);
    localStorage.setItem('userCharacteristics', JSON.stringify(mockCharacteristics));
    setAnalysisStep('profile');
  };

  const handleFormPath = () => {
    console.log('Form path clicked, setting analysisStep to form');
    setAnalysisStep('form');
  };

  const handleFormComplete = (characteristics: any) => {
    console.log('Form complete with characteristics:', characteristics);
    setUserCharacteristics(characteristics);
    localStorage.setItem('userCharacteristics', JSON.stringify(characteristics));
    setAnalysisStep('profile');
  };

  const handleBackToStart = () => {
    console.log('Back to start');
    setAnalysisStep('start');
  };

  const handleBackHome = () => {
    console.log('Back to home');
    setAnalysisStep('hero');
    setUserCharacteristics(null);
    localStorage.removeItem('userCharacteristics');
  };

  const handleSubscribe = (planName: string) => {
    setSelectedPlan(planName);
    setAnalysisStep('installation');
  };

  const handleBackFromInstallation = () => {
    setAnalysisStep('hero');
    setSelectedPlan('');
  };

  const handleHomeClickFromNavbar = () => {
    setAnalysisStep('hero');
    setUserCharacteristics(null);
    localStorage.removeItem('userCharacteristics');
  };

  // Navbar con navegación mejorada
  const navbarWithNavigation = (
    <Navbar 
      onProductoClick={onProductoClick}
      onHomeClick={handleHomeClickFromNavbar}
    />
  );

  // Si estamos en análisis de imagen activo, mostrar solo esa sección
  if (analysisStep === 'start') {
    return (
      <>
        {navbarWithNavigation}
        <main className="pt-16">
          <ImageAnalysisStart onPhotoPath={handlePhotoPath} onFormPath={handleFormPath} />
        </main>
      </>
    );
  }

  if (analysisStep === 'form') {
    return (
      <>
        {navbarWithNavigation}
        <main className="pt-16">
          <VisualForm onComplete={handleFormComplete} onBack={handleBackToStart} />
        </main>
      </>
    );
  }

  if (analysisStep === 'profile' && userCharacteristics) {
    return (
      <>
        {navbarWithNavigation}
        <main className="pt-16">
          <UserProfile characteristics={userCharacteristics} onBack={handleBackHome} />
        </main>
      </>
    );
  }

  if (analysisStep === 'installation') {
    return (
      <>
        {navbarWithNavigation}
        <main>
          <InstallationGuide planName={selectedPlan} onBack={handleBackFromInstallation} />
        </main>
      </>
    );
  }

  // Mostrar homepage normal con llamada a acción para análisis
  return (
    <>
      {navbarWithNavigation}
      <HeroSection onProductoClick={handleStartAnalysis} />
      <HowItWorksSection />
      <BenefitsSection />
      <SocialProofSection />
      <PricingSection onSubscribe={handleSubscribe} onFreeStart={handleStartAnalysis} />
      <FinalCTASection />
    </>
  );
}

