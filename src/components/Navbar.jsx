import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, Search, User, LogOut, Package, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { totalItems } = useCart();
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleLogout = async () => {
        await signOut();
        navigate('/login');
    };

    return (
        <nav className="bg-brand-pink border-b border-brand-dark/10 sticky top-0 z-50 transition-all duration-300 font-sans shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-32 relative">

                    <div className="flex items-center flex-1">
                        <button
                            className="md:hidden p-2 -ml-2 text-white hover:text-brand-light"
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="hidden md:flex items-center text-white/90 hover:text-white transition"
                        >
                            <Search size={24} />
                        </button>
                    </div>

                    <div className="flex-1 flex justify-center py-2 relative z-10">
                        <Link to="/" className="text-center group flex flex-col items-center">
                            <img
                                src="/images/logo-new.png"
                                alt="Isa Crochet"
                                className="h-28 w-auto object-contain transform group-hover:scale-105 transition duration-500"
                            />
                        </Link>
                    </div>

                    <div className="flex items-center justify-end flex-1 space-x-4 md:space-x-6">

                        {user ? (
                            <div className="hidden md:flex items-center gap-4">
                                <Link to="/mis-ordenes" className="text-white hover:text-brand-light transition text-sm font-medium tracking-wide border-r border-white/30 pr-4">
                                    MIS PEDIDOS
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-white hover:text-red-200 transition"
                                    title="Salir"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="hidden md:block text-white hover:text-brand-light transition">
                                <User size={22} />
                            </Link>
                        )}

                        <Link to="/carrito" className="relative text-white hover:text-brand-light transition group">
                            <ShoppingCart size={22} />
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-white text-brand-pink text-[10px] font-serif font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-sm">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>

            <div className="hidden md:block border-t border-white/10 bg-brand-pink">
                <div className="max-w-7xl mx-auto flex justify-center space-x-12 py-3 text-sm font-medium tracking-widest text-white uppercase">
                    <Link to="/" className="hover:text-brand-light transition hover:underline underline-offset-4 decoration-brand-light">Inicio</Link>
                    <Link to="/coleccion" className="hover:text-brand-light transition hover:underline underline-offset-4 decoration-brand-light">Colección</Link>
                    <Link to="/catalogo" className="hover:text-brand-light transition hover:underline underline-offset-4 decoration-brand-light">Tienda</Link>
                    <Link to="/galeria" className="hover:text-brand-light transition hover:underline underline-offset-4 decoration-brand-light">Galería</Link>
                    <Link to="/nosotros" className="hover:text-brand-light transition hover:underline underline-offset-4 decoration-brand-light">Nosotros</Link>
                </div>
            </div>

            <div className={`fixed inset-0 z-50 z-[100] transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
                <div className="absolute inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)}></div>
                <div className="relative bg-white w-[80%] max-w-sm h-full shadow-2xl p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-8">
                        <span className="font-serif text-2xl text-brand-pink">Menú</span>
                        <button onClick={() => setIsMenuOpen(false)} className="text-gray-500">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="space-y-6 flex-1 text-lg font-light text-gray-800">
                        <Link to="/" className="block border-b pb-2" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
                        <Link to="/coleccion" className="block border-b pb-2" onClick={() => setIsMenuOpen(false)}>Colección</Link>
                        <Link to="/catalogo" className="block border-b pb-2" onClick={() => setIsMenuOpen(false)}>Tienda</Link>
                        <Link to="/galeria" className="block border-b pb-2" onClick={() => setIsMenuOpen(false)}>Galería</Link>
                        <Link to="/nosotros" className="block border-b pb-2" onClick={() => setIsMenuOpen(false)}>Nosotros</Link>
                        <Link to="/mis-ordenes" className="block border-b pb-2" onClick={() => setIsMenuOpen(false)}>Mis Pedidos</Link>
                        {user ? (
                            <button onClick={handleLogout} className="text-red-500 text-left w-full pt-4">Cerrar Sesión</button>
                        ) : (
                            <Link to="/login" className="block text-brand-pink font-bold pt-4" onClick={() => setIsMenuOpen(false)}>Iniciar Sesión</Link>
                        )}
                    </div>
                </div>
            </div>

            {/* BARRA DE BÚSQUEDA FLOTANTE - NUEVO */}
            {isSearchOpen && (
                <div className="absolute top-32 left-0 w-full bg-white shadow-md z-40 p-4 animate-in fade-in slide-in-from-top-2">
                    <div className="max-w-3xl mx-auto flex gap-2">
                        <input
                            type="text"
                            placeholder="Buscar en la tienda..."
                            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-brand-pink"
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    navigate(`/catalogo?search=${e.target.value}`);
                                    setIsSearchOpen(false);
                                }
                            }}
                        />
                        <button
                            onClick={() => setIsSearchOpen(false)}
                            className="text-gray-500 hover:text-gray-700 font-bold px-2"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;