import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import OrdersPage from './pages/OrdersPage';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import GalleryPage from './pages/GalleryPage';
import CollectionPage from './pages/CollectionPage';
import AboutPage from './pages/AboutPage'; // Importación
import Footer from './components/Footer';
import { supabase } from './lib/supabase';
import { MessageCircle } from 'lucide-react';

function App() {

  useEffect(() => {
    // Dejamos este log por seguridad, para saber que Supabase sigue vivo
    console.log("Probando conexión con Supabase...", import.meta.env.VITE_SUPABASE_URL);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/coleccion" element={<CollectionPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mis-ordenes" element={<OrdersPage />} />
          <Route path="/update-password" element={<UpdatePasswordPage />} />
          <Route path="/galeria" element={<GalleryPage />} />
          <Route path="/nosotros" element={<AboutPage />} />
        </Routes>
      </main>

      <Footer />

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/524491234567" // Reemplazar con número real
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition-transform hover:scale-110 flex items-center justify-center"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={28} fill="white" className="text-white" />
      </a>
    </div>
  )
}

export default App;