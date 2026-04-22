import { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import VideoModal from './components/VideoModal';
import HomePage from './pages/HomePage';
import ProductoPage from './pages/ProductoPage';
import NosotrosPage from './pages/NosotrosPage';
import AnalysisPage from './pages/AnalysisPage';

export const ModalContext = createContext<{ setModalOpen: (open: boolean) => void }>({
  setModalOpen: () => {},
});

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Router>
      <ModalContext.Provider value={{ setModalOpen: setIsModalOpen }}>
        <div className="min-h-screen bg-white flex flex-col">
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage onProductoClick={() => setIsModalOpen(true)} />} />
              <Route path="/producto" element={<ProductoPage />} />
              <Route path="/nosotros" element={<NosotrosPage />} />
              <Route path="/analisis" element={<AnalysisPage />} />
            </Routes>
          </main>
          <Footer />
          <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
      </ModalContext.Provider>
    </Router>
  );
}

export const useModal = () => useContext(ModalContext);
export default App;
