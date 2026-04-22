import { ArrowLeft, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface InstallationGuideProps {
  onBack: () => void;
  planName: string;
}

export default function InstallationGuide({ onBack, planName }: InstallationGuideProps) {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const handleCopy = (step: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const apiKeyExample = `<script>
  window.GLISS_API_KEY = "your-api-key-here";
  window.GLISS_STORE_ID = "your-store-id";
</script>
<script src="https://gliss-platform.com/widget.js"></script>`;

  const xmlExample = `<?xml version="1.0" encoding="UTF-8"?>
<catalog>
  <product>
    <id>PROD-001</id>
    <name>Camiseta Premium Azul</name>
    <color>Azul</color>
    <category>Camisetas</category>
  </product>
</catalog>`;

  const widgetExample = `<!-- Pega esto en tu producto HTML -->
<div class="gliss-widget" data-product-id="PROD-001"></div>`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEEDF9] via-[#F5F4FB] to-white pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#7F77DD] hover:text-[#6B65C9] mb-6 font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            Volver a Precios
          </button>
          <div>
            <p className="text-sm font-medium text-[#7F77DD] uppercase tracking-wide mb-2">
              Plan: {planName}
            </p>
            <h1 className="text-5xl font-bold text-[#1A1A2E] mb-3">Guía de Instalación para Tiendas</h1>
            <p className="text-xl text-[#6B6B8A]">
              Integra GLISS en tu tienda en 3 simples pasos. No requiere programación avanzada.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-12">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-10 shadow-lg border-l-4 border-[#7F77DD]">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-[#7F77DD] to-[#378ADD]">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
              </div>
              <div className="flex-grow">
                <h2 className="text-3xl font-bold text-[#1A1A2E] mb-2">
                  Onboarding Automatizado (Setup Instantáneo)
                </h2>
                <p className="text-lg text-[#6B6B8A] mb-6">
                  Tras realizar el pago, recibirás automáticamente tu API Key y Store ID. Estos son tus credenciales de acceso al sistema GLISS.
                </p>

                <div className="bg-[#F5F4FB] rounded-lg p-6 mb-6">
                  <h3 className="text-sm font-semibold text-[#7F77DD] mb-4">📋 Código a pegar en tu sitio</h3>
                  <div className="bg-[#1A1A2E] text-[#E0E0E0] p-4 rounded-lg font-mono text-sm overflow-x-auto mb-4">
                    <pre>{apiKeyExample}</pre>
                  </div>
                  <button
                    onClick={() => handleCopy(1, apiKeyExample)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#7F77DD] text-white rounded-lg hover:bg-[#6B65C9] transition-colors"
                  >
                    {copiedStep === 1 ? (
                      <>
                        <Check size={18} />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy size={18} />
                        Copiar código
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <strong>💡 Consejo:</strong> Pega este código en la sección <code className="bg-blue-100 px-2 py-1 rounded">&lt;head&gt;</code> de tu sitio web. El sistema iniciará automáticamente.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-10 shadow-lg border-l-4 border-[#378ADD]">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-[#378ADD] to-[#7F77DD]">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
              </div>
              <div className="flex-grow">
                <h2 className="text-3xl font-bold text-[#1A1A2E] mb-2">
                  Conector de Catálogo (Ingesta Automática)
                </h2>
                <p className="text-lg text-[#6B6B8A] mb-6">
                  GLISS se conecta automáticamente a tu base de datos vía XML o JSON. Compatible con Shopify, VTEX, WooCommerce y más.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-[#F5F4FB] rounded-lg p-4">
                    <h3 className="font-semibold text-[#7F77DD] mb-3">📊 Ejemplo XML</h3>
                    <div className="bg-[#1A1A2E] text-[#E0E0E0] p-3 rounded font-mono text-xs overflow-x-auto mb-3">
                      <pre className="whitespace-pre-wrap">{xmlExample}</pre>
                    </div>
                    <button
                      onClick={() => handleCopy(2, xmlExample)}
                      className="text-sm flex items-center gap-1 text-[#7F77DD] hover:text-[#6B65C9]"
                    >
                      <Copy size={16} />
                      Copiar
                    </button>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#7F77DD] mb-3">⚙️ Configuración</h3>
                    <ul className="space-y-2 text-sm text-[#6B6B8A]">
                      <li>✓ Sincronización diaria automática</li>
                      <li>✓ IA etiqueta por colorimetría</li>
                      <li>✓ Integración automática de nuevas prendas</li>
                      <li>✓ Actualización de precios en tiempo real</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-900">
                    <strong>✅ Automático:</strong> Una vez configurado, GLISS analiza automáticamente cada prenda nueva que agregues a tu catálogo.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-10 shadow-lg border-l-4 border-[#AFA9EC]">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-[#AFA9EC] to-[#7F77DD]">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
              </div>
              <div className="flex-grow">
                <h2 className="text-3xl font-bold text-[#1A1A2E] mb-2">
                  Widget "One-Click" (Integración Front-end)
                </h2>
                <h3 className="text-xl font-semibold text-[#7F77DD] mb-4">✨ No requiere programación</h3>
                <p className="text-lg text-[#6B6B8A] mb-6">
                  Al pegar una sola línea de código en tus fichas de producto, el botón "¿Cuál es mi color ideal? con GLISS" aparecerá automáticamente.
                </p>

                <div className="bg-[#F5F4FB] rounded-lg p-6 mb-6">
                  <h3 className="text-sm font-semibold text-[#7F77DD] mb-4">📝 Código para fichas de producto</h3>
                  <div className="bg-[#1A1A2E] text-[#E0E0E0] p-4 rounded-lg font-mono text-sm overflow-x-auto mb-4">
                    <pre>{widgetExample}</pre>
                  </div>
                  <button
                    onClick={() => handleCopy(3, widgetExample)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#7F77DD] text-white rounded-lg hover:bg-[#6B65C9] transition-colors"
                  >
                    {copiedStep === 3 ? (
                      <>
                        <Check size={18} />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy size={18} />
                        Copiar código
                      </>
                    )}
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <p className="text-sm font-semibold text-purple-900 mb-2">📍 Dónde colocarlo</p>
                    <p className="text-sm text-purple-800">En el HTML de cada página de producto, donde sea visible para el usuario.</p>
                  </div>
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <p className="text-sm font-semibold text-indigo-900 mb-2">🎯 Resultado</p>
                    <p className="text-sm text-indigo-800">El botón GLISS aparecerá automáticamente en la posición que indiques.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#7F77DD] to-[#378ADD] rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">¡Listo para integrar?</h2>
          <p className="text-lg mb-6">Si tienes dudas con la integración, nuestro equipo técnico está disponible 24/7</p>
          <a
            href="https://outlook.office.com/book/ReservaunareuninconGliss1@alumnos.uai.cl/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-[#7F77DD] px-8 py-3.5 rounded-full hover:bg-gray-50 transition-all duration-150 font-semibold hover:scale-105"
          >
            Agendar Consulta Técnica
          </a>
        </div>
      </div>
    </div>
  );
}
