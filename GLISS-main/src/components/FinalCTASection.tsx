export default function FinalCTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#7F77DD] to-[#378ADD]">
      <div className="max-w-4xl mx-auto text-center fade-in">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          Descubre tu verdadera paleta de colores
        </h2>
        <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
          En 3 minutos accede a análisis personalizados y recomendaciones de estilo que 
          te hacen ver y sentir mejor.
        </p>
        <button className="bg-white text-[#7F77DD] px-10 py-4 rounded-full hover:bg-gray-50 transition-all duration-150 font-semibold text-lg shadow-xl hover:scale-105">
          Comenzar análisis
        </button>
      </div>
    </section>
  );
}
